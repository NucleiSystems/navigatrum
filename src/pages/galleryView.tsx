import NavBar from "../components/navbar";
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

import { getUserDataAmount, requestRedisCache } from "../utils/filesResolver";
import "./scss/gallery_styles.scss";
import filesType from "../interfaces/fileInterface";
import { dbInstance, addFileRecord, getAll } from "../utils/dbHandler"; // Import IndexedDB functions

const GalleryView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [images, setImages] = useState<filesType[]>([]);

  const populateStore = useCallback(async () => {
    try {
      const allItems = await getAll();
      setImages(allItems);
    } catch (error) {
      console.error("Error fetching items from IndexedDB:", error);
    }
  }, []);

  const fetchDataAndPopulateDB = async () => {
    try {
      const data = await requestRedisCache(); // Fetch data from your API or source
      const userDataAmount = (await getUserDataAmount()).data.user_data_length;
      const indexedDBItems = await getAll();

      if (
        userDataAmount !== (data?.length ?? 0) ||
        userDataAmount !== indexedDBItems.length
      ) {
        console.log(userDataAmount !== data?.length);
        const indexedDBItemMap = new Map(
          indexedDBItems.map((item) => [item.id, item])
        );

        const newItems =
          data?.filter((item) => !indexedDBItemMap.has(item.id)) ?? [];
        for (const newItem of newItems) {
          await addFileRecord(newItem);
        }
      }

      await populateStore();
    } catch (error) {
      console.error("Error fetching and populating data:", error);
    }
  };

  useEffect(() => {
    const renderSetup = async () => {
      await populateStore();
    };

    renderSetup().catch(console.error);
  }, [populateStore]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDataAndPopulateDB(); // Fetch and populate data on refresh
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
