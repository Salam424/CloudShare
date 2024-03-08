import React, { useState } from "react";
import { Copy } from "lucide-react";

function FileShareForm({ file, onPasswordSave }) {
  const [password, setPassword] = useState("");

  const handleOpenFile = () => {
    window.location.href = file.shortUrl;
  };

  return (
    file && (
      <div className="flex flex-col gap-2">
        <div>
          <label className="text-[14px] text-gray-500">Short Url</label>
          <div className="flex gap-5 p-2 border rounded-md justify-between">
            <input
              type="text"
              value={file.shortUrl}
              disabled
              className="disabled:text-gray-500 bg-transparent outline-none w-full"
            />
            <Copy
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(file.shortUrl)}
            />
          </div>
        </div>
        <div className="gap-3 flex mt-5 "></div>

        <div className="flex gap-3 items-center">
          <div className="border rounded-md w-full p-2">
            <input
              type="password"
              className=" bg-transparent border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 "
            disabled={password?.length < 3}
            onClick={() => onPasswordSave(password)}
          >
            Save
          </button>
        </div>

        <button
          className="p-2 disabled:bg-gray-300 bg-primary text-white hover:bg-blue-600 w-full mt-2 rounded-md"
          onClick={handleOpenFile}
        >
          Open
        </button>
      </div>
    )
  );
}

export default FileShareForm;
