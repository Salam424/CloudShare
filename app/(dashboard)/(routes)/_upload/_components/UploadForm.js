import { useState } from "react";
import AlertMsg from "./AlertMsg";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

function UploadForm({ uploadBtnClick, progress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 2000000) {
      setErrorMsg("You can only store a file that has size less than 2MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  return (
    <div className="text-center">
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <input
          id="select-file"
          type="file"
          className="hidden"
          onChange={(event) => onFileSelect(event.target.files[0])}
        />
        <button
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring sm:w-auto"
          onClick={() => document.getElementById("select-file").click()}
        >
          Select File
        </button>
        <button
          disabled={!file}
          className={`block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-blue-700 focus:outline-none focus:ring sm:w-auto ${
            !file &&
            "bg-gray-300 cursor-not-allowed opacity-50 hover:bg-gray-300 hover:text-primary"
          }`}
          onClick={() => uploadBtnClick(file)}
        >
          Upload
        </button>
      </div>
      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}

      {progress > 0 ? <ProgressBar progress={progress} /> : null}
    </div>
  );
}

export default UploadForm;
