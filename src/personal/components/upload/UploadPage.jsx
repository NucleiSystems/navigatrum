import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../styling/Navbar";
import axios from "axios";
import FormData from "form-data";
import {DropzoneArea} from 'material-ui-dropzone'
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
        "https://nucleibackend.systems/storage/compress/image?ipfs_flag=true",
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

        <p>Drop your files here</p>
        <DropzoneArea
          onChange={(files) => setFiles(files)}
          acceptedFiles={["image/jpeg", "image/png"]}
          maxFileSize={5000000}
          filesLimit={15}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}