import React, { useState } from "react";
import Navbar from "../styling/Navbar";
import axios from "axios";
import FormData from "form-data";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [files, setFiles]: any[] = useState([]);
  const navigate = useNavigate();
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  const handleUpload = () => {
    const config = {
      headers: headers,
    };

    const data = new FormData();
    for (const element of files) {
      data.append("files", element);
    }

    axios
      .post(
        "https://nucleibackend.systems/storage/compress/image?ipfs_flag=true",
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        // if response code is 200, redirect to gallery
        if (response.status === 200) {
          navigate("/gallery");
        }
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
        maxFiles={15}
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
