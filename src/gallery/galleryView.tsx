/* eslint-disable @typescript-eslint/no-unused-vars */
import NavBar from "./navbar";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useCallback, useEffect, useState } from "react";

import {
  CardHeader,
  Card,
  CardBody,
  Button,
  Image,
  CardFooter,
} from "@nextui-org/react";

import { getUserDataAmount, requestRedisCache } from "./filesResolver";
import { store } from "../store";
import { useDispatch } from "react-redux";
import { setFileCount, setFetched, setFiles } from "../slices/fileStore";
import "./styles.scss";
import filesType from "../interfaces/fileInterface";

const GalleryView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [images, setImages] = useState<filesType[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const dispatch = useDispatch();
  const state = store.getState();

  const populateStore = useCallback(async () => {
    const fileCount: number = (await getUserDataAmount()).data.user_data_length;

    if (state.files.fileCount === 0) {
      dispatch(setFileCount(fileCount));
    }

    const formattedFiles = await requestRedisCache();

    if (formattedFiles === null) {
      setDataFetched(true);
      dispatch(setFetched(true));
    } else {
      dispatch(setFiles(formattedFiles));
      setDataFetched(true);
      dispatch(setFetched(true));
    }
  }, [dispatch, state.files.fileCount]);

  useEffect(() => {
    const renderSetup = async () => {
      if (!dataFetched) {
        await populateStore();
      }
      setImages(state.files.files as unknown as filesType[]);
    };

    renderSetup().catch(console.error);
  }, [state.files.files, dataFetched, populateStore]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await populateStore();
    setRefreshing(false);
  };

  return (
    <div>
      <NavBar />
      <PullToRefresh onRefresh={handleRefresh} className="pull-to-refresh">
        <div style={{ marginTop: 20, minHeight: 700 }} className="gallery-div">
          <div className="columns">
            {images.map((image) => (
              <Card
                key={image.id}
                className="images-container-card max-w-[400px]"
              >
                <CardHeader>
                  {
                    <Button
                      type="submit"
                      color="danger"
                      variant="bordered"
                      size="sm"
                      id="del-button"
                      onMouseEnter={() => {
                        const delButton = document.getElementById("del-button");
                        if (delButton) {
                          delButton.innerHTML = `
                              ❌  ${image.file_name}
                            `;
                        }
                      }}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          const delButton =
                            document.getElementById("del-button");
                          if (delButton) {
                            delButton.textContent = "❌";
                          }
                        }, 100);
                      }}
                    >
                      ❌
                    </Button>
                  }
                </CardHeader>
                <CardBody className="image-div" key={image.file_name}>
                  <Image
                    src={`data:image/jpg;base64,${image.file_data}`}
                    alt="Image"
                    radius="sm"
                    className="image-container"
                  />
                  <CardFooter className="image-div-card"></CardFooter>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default GalleryView;
