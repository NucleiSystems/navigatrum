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
      "https://single-orca-f1izhs.ziska44n.traefikhub.io/data/sync/fetch/all",
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
      "https://single-orca-f1izhs.ziska44n.traefikhub.io/data/sync/fetch/redis/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    await requestfilesRequest();
    const data = await extractFiles(response.data);

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
              <div className="col-md-4" key={image.file_name}>
                <div className="card mb-4 shadow-sm">
                  <img
                    src={`data:image/png;base64,${image.file_data}`}
                    alt="Image"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
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
            ))}
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
}