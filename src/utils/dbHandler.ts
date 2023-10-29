import { openDB } from "idb";
import FilesType from "../interfaces/fileInterface";

const DB_NAME = "nuclei_db";
const FILE_TABLE = "nuclei_files";

const dbInstance = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FILE_TABLE)) {
        db.createObjectStore(FILE_TABLE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};

// addFileRecord only stores the data needed for the files that the gallery view uses
const addFileRecord = async (imageObj: FilesType) => {
  // write a schema for the param
  const db = await dbInstance();
  const tx = db.transaction(FILE_TABLE, "readwrite");
  const store = tx.objectStore(FILE_TABLE);
  await store.add(imageObj);
  await tx.done;
};

const getAll = async () => {
  const db = await dbInstance();
  const tx = db.transaction(FILE_TABLE, "readonly");
  const store = tx.objectStore(FILE_TABLE);
  return store.getAll();
};

export { dbInstance, addFileRecord, getAll };
