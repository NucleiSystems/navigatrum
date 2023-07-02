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
  const [redisCacheLoaded, setRedisCacheLoaded] = useState(false);
  const [userFilesFetched, setUserFilesFetched] = useState(false);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchRedisCache = async () => {
    if (redisCacheLoaded) {
      return;
    } else {
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
      setRedisCacheLoaded(true); // Mark Redis cache as loaded
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
    setUserFilesFetched(true); // Mark user files as fetched
  };

  useEffect(() => {
    if (!redisCacheLoaded) {
      fetchRedisCache();
    }

    if (!userFilesFetched) {
      checkIfUserHasFiles();
    }

    try {
      if (!fetched) {
        fetchFiles();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <PullToRefresh
        onRefresh={async () => {
          setRefreshing(true);
          await fetchFiles();
          setRefreshing(false);
        }}
        className="pull-to-refresh"
      >
        <div style={{ marginTop: 20, minHeight: 700 }} className="gallery-div">
          <div className="images-container">
            {images.map((image) => (
              <div className="image-div" key={image.file_name}>
                <img
                  src={`data:image/png;base64,${image.file_data}`}
                  alt="Image"
                  className="image-container"
                  onTouchStart={(e) => {
                    e.target.style.opacity = 0.5;
                  }}
                />
                <div className="image-div-card">
                  <p className="image-div-text" style={{ margin: 0 }}>
                    {image.file_name}
                  </p>
                  <div>
                    <button
                      onClick={() => handleDelete(image.id)}
                      style={{ display: "none" }}
                    >
                      Delete
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
