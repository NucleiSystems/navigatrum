import NavBar from "./navbar";
import extractFiles from "./parser";
import PullToRefresh from "react-simple-pull-to-refresh";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  CardHeader,
  Card,
  CardBody,
  Button,
  Input,
  CardFooter,
} from "@nextui-org/react";

import {
  getUserDataAmount,
  requestFilesRequest,
  requestRedisCache,
} from "./filesResolver";
import store from "../store";
import { useDispatch } from "react-redux";
import { setFileCount, setFetched, setFiles } from "../slices/fileStore";
import { useNavigate } from "react-router-dom";

const GalleryView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const state = store.getState();
  const navigate = useNavigate();

  const populateStore = async () => {
    const fileCount: number = (await getUserDataAmount()).data.user_data_length;

    if (state.files.fileCount === 0) {
      dispatch(setFileCount(fileCount));
    }

    const formattedFiles = await requestRedisCache();

    if ((await formattedFiles).length < fileCount) {
      requestFilesRequest();
      dispatch(setFetched(true));
    } else {
      dispatch(setFiles(formattedFiles));
      dispatch(setFetched(true));
    }
  };

  useEffect(() => {
    populateStore();
    setImages(state.files.files);
  }, []);

  return (
    <div>
      <NavBar />
      <Button onClick={async () => populateStore()}>State</Button>
      <PullToRefresh
        onRefresh={async () => {
          setRefreshing(true);
          populateStore();
          setRefreshing(false);
        }}
        className="pull-to-refresh"
      >
        <div style={{ marginTop: 20, minHeight: 700 }} className="gallery-div">
          <Card className="images-container">
            {images.map((image) => (
              <CardBody className="image-div" key={image.file_name}>
                <img
                  src={`data:image/jpg;base64,${image.file_data}`}
                  alt="Image"
                  className="image-container"
                />
                <CardFooter className="image-div-card">
                  <p className="image-div-text" style={{ margin: 0 }}>
                    {image.file_name}
                  </p>
                  <div>
                    <button
                      // onClick={() => handleDelete(image.id)}
                      style={{ display: "none" }}
                    >
                      Delete
                    </button>
                  </div>
                </CardFooter>
              </CardBody>
            ))}
          </Card>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default GalleryView;
