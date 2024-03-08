import React, { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
function fileItem({ file }) {
  const [password, setPassword] = useState("");
  return (
    file && (
      <div>
        <div className="p-5 rounded-md bg-white flex flex-col items-center">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-primary">{file.userName} </strong>
              Share file with you
            </h2>
            <h2 className="text-[10px] text-gray-400">Find File details</h2>
            <Image
              src="/download-file.gif"
              width={150}
              height={150}
              alt="download"
              className="w-[150px] h-[150px] p-5"
            />
            <h2 className="text-gray-500 text-[15px]">
              {file.fileName}⚡ {file.fileType}⚡ {file.fileSize} Bytes
            </h2>
          </div>
          {file.password.length > 3 && (
            <input
              type="password"
              className="p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400"
              placeholder="Enter password to access"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button
            className="flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
            disabled={file.password !== password}
            onClick={() => window.open(file?.fileUrl)}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <h2 className="text-gray-400 text-[12px] mt-3">
            Thanks for using my app
          </h2>
        </div>
      </div>
    )
  );
}

export default fileItem;
