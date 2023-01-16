import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import extractFiles from "./parser";

export default function Gallery() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const fetchImageBase64Data = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/data/sync/fetch/redis/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = extractFiles(response.data);
    setImages(data);
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 20, minHeight: 700 }}>
        <h1>Gallery</h1>
        <p>Here are your images</p>
        <div className="row">
          <button onClick={fetchImageBase64Data}>Fetch Images</button>
        </div>
        <div className="row">
          {images.map((image) => (
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={`data:image/png;base64,${image.file_data}`}
                  alt="Image"
                  width="100%"
                  height="100%"
                />
                <div className="card-body">
                  <p className="card-text">{image.file_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
