import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../styling/Navbar";
import axios from "axios";
import FormData from "form-data";

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  const handleUpload = () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    axios
      .post(
        "https://single-orca-f1izhs.ziska44n.traefikhub.io/storage/compress/image?ipfs_flag=true",
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ height: "50vh", backgroundColor: "#C0C0C0" }}
      >
        <p>Drop your files here</p>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// const config = {
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmcifQ.Vwku97X8LtMNavRKHP4iUdCs6JZJ8jl5Ps4H0smh4_0",
//     "Content-Type": "multipart/form-data",
//   },
// };

// const data = new FormData();
// data.append("files", file, file.name);

// axios
//   .post(
//     "http://localhost:8000/storage/compress/image?ipfs_flag=true",
//     data,
//     config
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// export default function UploadPage() {
//   const [files, setFiles] = useState([]);
//   const onDrop = useCallback((acceptedFiles) => {
//     // post the files
//     console.log(acceptedFiles);
//     setFiles(acceptedFiles);
//   }, []);
//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div>
//       <h1>Drag 'n' drop some files here, or click to select files</h1>
//       <div
//         {...getRootProps()}
//         style={{ height: "50vh", backgroundColor: "#C0C0C0" }}
//       >
//         <input {...getInputProps()} />
//       </div>
//       <button
//         onClick={() => {
//           commitUpload(files);
//         }}
//       >
//         upload your files
//       </button>
//     </div>
//   );
// }

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
