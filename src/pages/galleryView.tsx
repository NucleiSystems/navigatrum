import PullToRefresh from "react-simple-pull-to-refresh";
import { useCallback, useEffect, useState } from "react";

import {
  CardHeader,
  Card,
  CardBody,
  Button,
  Image,
  CardFooter,
  Divider,
} from "@nextui-org/react";

import { getUserDataAmount, requestRedisCache } from "../utils/filesResolver";
import { addFileRecord, getAll } from "../utils/dbHandler";
import extractionOutput from "../interfaces/extractionInterface";

const GalleryView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [images, setImages] = useState<extractionOutput[]>([]);
  refreshing;
  const populateStore = useCallback(async () => {
    try {
      const allItems = await getAll();
      setImages(allItems);
    } catch (error) {
      console.error("Error fetching items from IndexedDB:", error);
    }
  }, []);

  const fetchDataAndPopulateDB = useCallback(async () => {
    try {
      const data = await requestRedisCache();
      const userDataAmount = (await getUserDataAmount()).data.user_data_length;
      const indexedDBItems = await getAll();

      if (
        userDataAmount !== (data?.length ?? 0) ||
        userDataAmount !== indexedDBItems.length
      ) {
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
  }, [populateStore]);

  useEffect(() => {
    const renderSetup = async () => {
      await populateStore();
    };

    renderSetup().catch(console.error);
  }, [populateStore]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchDataAndPopulateDB();
    } finally {
      setRefreshing(false);
    }
  }, [fetchDataAndPopulateDB]);

  function Uint8ToBase64(u8Arr) {
    const CHUNK_SIZE = 0x8000;
    let result = "";
    for (let i = 0; i < u8Arr.length; i += CHUNK_SIZE) {
      const chunk = u8Arr.subarray(i, i + CHUNK_SIZE);
      result += String.fromCharCode.apply(null, chunk);
    }
    return btoa(result);
  }

  return (
    <div className="w-screen">
      <PullToRefresh onRefresh={handleRefresh} className="pull-to-refresh">
        <div>
          <div className="flex flex-row flex-wrap">
            {images.map((image) => (
              <Card key={image.id} className="m-4">
                <CardHeader>
                  <Button
                    type="submit"
                    className="bg-blue"
                    variant="bordered"
                    size="sm"
                    id={`del-button${image.id}`}
                  >
                    {image.file_name}
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody
                  className="p-2 flex  justify-center items-center"
                  key={image.file_name}
                >
                  <Image
                    src={`data:image/jpg;base64,${Uint8ToBase64(
                      image.file_data
                    )}`}
                    alt="Image"
                    radius="sm"
                    className="justify-center items-center w-full h-auto max-w-full max-h-40 object-cover"
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
