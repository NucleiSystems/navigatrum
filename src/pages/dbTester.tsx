import { useEffect, useState } from "react";
import { dbInstance, addFileRecord, getAll } from "../utils/dbHandler";

const DbTest = () => {
  useEffect(() => {
    async function fetchItems() {
      try {
        const allItems = await getAll();
      } catch (error) {
        console.error("error fetching items", error);
      }
    }
    fetchItems();
  }, []);

  const handleAllItems = async () => {
    const dummyRecord = {
      file_name: "example.txt",
      file_bytes: "SGVsbG8gd29ybGQ=",
      data: {
        id: "1",
        size: "1024",
      },
      file_data: "Hello world!",
      id: "3",
    };
    try {
      await addFileRecord(dummyRecord);
      const allItems = await getAll();
    } catch (error) {
      console.error("error adding", error);
    }
  };

  return (
    <>
      <h1>indexedDB Example</h1>

      <button onClick={handleAllItems}>Add Item</button>
      <ul></ul>
    </>
  );
};

export default DbTest;
