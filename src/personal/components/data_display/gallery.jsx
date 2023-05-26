import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../styling/Navbar";
import axios from "axios";
import extractFiles from "./parser";
import PullToRefresh from "react-simple-pull-to-refresh";

export default function Gallery() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const fetchData = async () => {
    const cachedResponse = localStorage.getItem("cachedResponse");
    if (cachedResponse) {
      const data = await extractFiles(JSON.parse(cachedResponse));
      setImages(data);
    }
    
    try {
      const response = await axios.get(
        "https://single-orca-f1izhs.ziska44n.traefikhub.io/data/sync/fetch/all",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("cachedResponse", JSON.stringify(response.data));
      const data = await extractFiles(response.data);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    localStorage.removeItem("cachedResponse");
    await fetchData();
  };

  return (
    <div>
      <Navbar />
      <PullToRefresh onRefresh={handleRefresh}>
        <button onClick={fetchData}>Fetch Files</button>
        <div style={{ marginTop: 20, minHeight: 700 }}>
          <h1>Gallery</h1>
          <p>Here are your images</p>
          {images.length === 0 ? (
            <p>Loading...</p>
          ) : (
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
          )}
        </div>
      </PullToRefresh>
    </div>
  );
}
