import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit
);

import axios from "axios";
import endpoints from "../../utils/endpointConfig";
import { Button } from "@nextui-org/button";

const UploadView = () => {
  const [files, setFiles] = useState([]);
  const [imagePreviewHeight, setImagePreviewHeight] = useState(null);

  useEffect(() => {
    updateImagePreviewHeight();
  }, [files]);

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    updateImagePreviewHeight();
  };

  const updateImagePreviewHeight = () => {
    if (files.length === 1) {
      setImagePreviewHeight("256px");
    } else if (files.length === 2) {
      setImagePreviewHeight("200px");
    } else if (files.length === 3) {
      setImagePreviewHeight("190px");
    } else if (files.length >= 3) {
      setImagePreviewHeight("160px");
    }
  };

  const filesHandler = (files: []) => {
    updateImagePreviewHeight();
    console.log("Uploaded files:", files);
    setFiles(files);
  };

  const fileUploadHandler = (files: []) => {
    const fileForm = new FormData();
    files.forEach((file) => {
      fileForm.append("files", file);
    });
    try {
      axios.post(endpoints().endpoints.upload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="m-10 mt-10 ml-10 items-center">
      <div className="items-center">
        <Button
          onClick={() => {
            if (files.length > 0) {
              fileUploadHandler(files as []);
            }
          }}
        ></Button>
        <FilePond
          files={files}
          allowMultiple={true}
          imageEditAllowEdit={true}
          onupdatefiles={filesHandler}
          allowReplace={true}
          maxFiles={10}
          credits={false}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          imagePreviewMaxHeight={imagePreviewHeight}
          imagePreviewMinHeight={44}
        />
      </div>
    </div>
  );
};

export default UploadView;
