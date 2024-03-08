import React, { useEffect, useState } from "react";
import Image from "next/image";

function FileInfo({ file }) {
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (file && file.fileType) {
      const fileTypeSplit = file.fileType.split("/")[0];
      setFileType(fileTypeSplit);
    }
  }, [file]);

  return (
    <div className="text-center border flex justify-center m-4 flex-col items-center p-2 border-blue-200 rounded-lg">
      {fileType === "image" && file?.fileUrl ? (
        <Image src={file?.fileUrl} width={200} height={200} alt="File" />
      ) : (
        <img src="/file.png" alt="File" width={200} height={200} />
      )}
      <div className="">
        <h2>{file?.fileName}</h2>
        <h2 className="text-gray-400 text-[14-x]">{file?.fileType}</h2>
      </div>
    </div>
  );
}

export default FileInfo;
