import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import extractFiles from "./parser";
import PullToRefresh from "react-simple-pull-to-refresh";

export default function Gallery() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const requestfilesRequest = async () => {
    const response = await axios.get(
      "https://required-elk-gf4bb1.mbxk50ca.traefikhub.io/data/sync/fetch/all",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const fetchRedisCache = async () => {
    const response = await axios.get(
      "https://required-elk-gf4bb1.mbxk50ca.traefikhub.io/data/sync/fetch/redis/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    await requestfilesRequest();
    const data = extractFiles(response.data);
    setImages(data);
    console.log(data);
  };

  const fetchFiles = async () => {
    await fetchRedisCache();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <Navbar />
      <PullToRefresh onRefresh={requestfilesRequest}>
        <button onClick={fetchFiles}>Fetch Files</button>
        <button onClick={requestfilesRequest}>Request Files</button>

        <div style={{ marginTop: 20, minHeight: 700 }}>
          <h1>Gallery</h1>
          <p>Here are your images</p>
          <div className="row">
            {images.map((image) => (
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <div className="d-flex justify-content-center">
                    <img
                      src={`data:image/png;base64,${image.file_data}`}
                      alt="Image"
                      width="640px"
                      height="360px"
                      onClick={(e) => {
                        navigate(
                          `/personal/data_display/image/${image.file_name}`
                        );
                      }}
                    />
                    <div className="card-body">
                      <p className="card-text">{image.file_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
}
