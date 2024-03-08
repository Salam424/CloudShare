"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "../../../../firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import AlertUploadedDone from "./_components/AlertUploadedDone";

function Upload() {
  const { user } = useUser();
  const [progress, setProgress] = useState();
  const router = useRouter();
  const storage = getStorage(app);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const db = getFirestore(app);
  const [fileDocId, setFileDocId] = useState();

  const uploadFile = (file) => {
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress);
      if (progress === 100) {
        setTimeout(() => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              saveInfo(file, downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }, 2000);
      }
    });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = uuidv4();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + "file/" + docId,
    });
    setUploadCompleted(true); // Mark upload as completed
    setFileDocId(docId);
  };

  useEffect(() => {
    console.log("Trigger");

    if (progress === 100) {
      setTimeout(() => {
        setUploadCompleted(true);
      }, 2000);
    }
  }, [progress]);

  useEffect(() => {
    if (uploadCompleted) {
      setTimeout(() => {
        setUploadCompleted(false);
        console.log("fileDOcId", fileDocId);
        router.push("file-preview/" + fileDocId);
      }, 2000);
    }
  }, [uploadCompleted]);

  return (
    <div className="p-5 px-8 md:px-28">
      {uploadCompleted && <AlertUploadedDone />}{" "}
      {/* Show AlertUploadedDone when uploadCompleted is true */}
      <h2 className="text-[20px] text-center m-5">
        Start
        <strong className="text-primary"> Uploading </strong> File and{" "}
        <strong className="text-primary"> Share </strong> it
      </h2>
      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
}

export default Upload;
