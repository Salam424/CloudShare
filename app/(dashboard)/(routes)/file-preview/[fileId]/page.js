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
    <div className="py-10 px-20">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare /> Go to Upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
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
