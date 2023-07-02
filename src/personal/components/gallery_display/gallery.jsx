import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import extractFiles from "./parser";
import PullToRefresh from "react-simple-pull-to-refresh";
import "./file_gallery.scss";
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [FilesExist, setFilesExist] = useState(false);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const requestFilesRequest = async () => {
    await axios.get("https://nucleibackend.systems/data/sync/fetch/all", {
      headers: headers,
    });
    setFetched(true);
  };

  const fetchRedisCache = async () => {
    const response = await axios.get(
      "https://nucleibackend.systems/data/sync/fetch/redis/all",
      {
        headers: headers,
      }
    );

    const data = await extractFiles(response.data);
    setImages(data);
    console.log(data);

    if (!fetched) {
      await requestFilesRequest();
    }
  };

  const fetchFiles = async () => {
    await fetchRedisCache();
  };
  const checkIfUserHasFiles = async () => {
    const redis_response = await axios.get(
      "https://nucleibackend.systems/data/sync/fetch/redis/all",
      {
        headers: headers,
      }
    );
    if (redis_response.data.length > 0) {
      setFilesExist(true);
    }
    const user_data_response = await axios.get(
      "https://nucleibackend.systems/data/sync/fetch/user_data",
      {
        headers: headers,
      }
    );
    if (user_data_response.data.length > 0) {
      setFilesExist(true);
    } else {
      setFilesExist(false);
    }
  };
  useEffect(() => {
    checkIfUserHasFiles();

    try {
      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <PullToRefresh
        onRefresh={() => {
          console.log("hello");
        }}
      >
        <button onClick={fetchFiles}>Fetch Files</button>
        <button onClick={requestFilesRequest}>Request Files</button>

        <div style={{ marginTop: 20, minHeight: 700 }}>
          <h1>Gallery</h1>
          <p>Here are your images</p>
          {FilesExist ? (
            <p>Files Exist</p>
          ) : (
            <p>
              You have no files, please upload some files to view them here.
            </p>
          )}

          <div className="image-container">
            {images.map((image) => (
              <div className="image-card" key={image.file_name}>
                <img
                  src={`data:image/png;base64,${image.file_data}`}
                  alt="Image"
                  className="image-tag"
                  onTouchStart={(e) => {
                    e.target.style.opacity = 0.5;
                  }}
                />
                <div className="card-body">
                  <p className="card-text" style={{ margin: 0 }}>
                    {image.file_name}
                  </p>
                  <div>
                    <button
                      onClick={() => handleDelete(image.id)}
                      style={{ display: "none" }}
                    >
                      Delete
                    </button>
                    <button
                      className="ellipsis-button"
                      onClick={() => console.log("Ellipsis button clicked")}
                    >
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </button>
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
