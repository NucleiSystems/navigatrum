import { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadView = () => {
  const [files, setFiles] = useState([]);

  const fileUploads = (files: File[]) => {};

  return (
    <div
      className="App"
      style={{
        margin: "10%",
        marginTop: "10%",
        marginLeft: "10%",
        alignItems: "center",
      }}
    >
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={10}
        name="files"
        labelIdle=""
      />
    </div>
  );
};

export default UploadView;
