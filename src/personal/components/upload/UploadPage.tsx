import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import PullToRefresh from "react-simple-pull-to-refresh";
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";
import FormData from "form-data";

async function commitUpload(files) {
  axios.post("http://127.0.0.1:8000/storage/compress/image", {
    params: {
      ipfs_flag: "true",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: files,
  });
}
export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // post the files
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Drag 'n' drop some files here, or click to select files</h1>
      <div
        {...getRootProps()}
        style={{ height: "50vh", backgroundColor: "#C0C0C0" }}
      >
        <input {...getInputProps()} />
      </div>
      <button
        onClick={() => {
          commitUpload(files);
        }}
      >
        upload your files
      </button>
    </div>
  );
}

// let files: any = [];
// export default function UploadPage() {
//   const fileTypes = ["JPG", "PNG", "GIF"];
//   const [file, setFile] = useState();
//   const handleChange = (file) => {
//     setFile(file);
//     files.push(file);
//   };
//   console.log(files);
//   return (
//     <div>
//       <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
//       {/* display the files inside of files array */}
//       {files.map((file) => (
//         <div key={file.name}>
//           <p>{file.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
