import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import PullToRefresh from "react-simple-pull-to-refresh";
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";
export default function UploadPage() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      // get the file name
      console.log(file.name);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
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
