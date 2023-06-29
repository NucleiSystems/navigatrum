import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../styling/Navbar";
import axios from "axios";
import FormData from "form-data";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

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
      <FilePond
        files={files}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem.file));
        }} /* sets the file state */
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
