"use client";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../../../../firebaseConfig";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";
function FilePreview({ params }) {
  const db = getFirestore(app);
  const [file, setFile] = useState();
  useEffect(() => {
    if (params?.fileId) {
      getFileInfo();
    }
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Data", docSnap.data());
      setFile(docSnap.data());
    } else {
      console.log("no data");
    }
  };

  const onPasswordSave = async (password) => {
    const docRef = doc(db, "uploadedFile", params?.fileId);

    await updateDoc(docRef, {
      password: password,
    });
  };

  return (
    <div className="py-10 px-20 md:py-14 md:px-18">
      <Link href="/" className="flex gap-3 text-base md:text-lg">
        <ArrowLeftSquare className="h-5 w-5 md:h-6 md:w-6" /> Go Back
      </Link>
      <div className="grid grid-cols-1 mt-5 md:mt-8">
        <FileInfo file={file} />
        <FileShareForm
          file={file}
          onPasswordSave={(password) => onPasswordSave(password)}
        />
      </div>
    </div>
  );
}

export default FilePreview;
