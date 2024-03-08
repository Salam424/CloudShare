"use client";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebaseConfig";
import FileItem from "./_components/fileItem";
import Image from "next/image";
import Link from "next/link";
function FileView({ params }) {
  const db = getFirestore(app);
  const [file, setFile] = useState();
  useEffect(() => {
    params.fileId && getFileInfo();
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

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      <Link href="/">
        <Image src="/logo.png" width={180} height={130} alt="logo" />
      </Link>
      <FileItem file={file} />
    </div>
  );
}

export default FileView;
