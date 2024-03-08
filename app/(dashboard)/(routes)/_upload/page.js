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

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function Upload() {
  const [progress, setProgress] = useState();
  const router = useRouter();
  const storage = getStorage(app);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const db = getFirestore(app);

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
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + "file/" + docId,
    });
    setUploadCompleted(true); // Mark upload as completed
    router.push("file-preview/" + docId); // Navigate to the preview page
  };

  return (
    <div>
      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
}

export default Upload;
