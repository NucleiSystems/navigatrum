import pako from "pako";
import { Buffer } from "buffer";
import extractionOutput from "../interfaces/extractionInterface";

function stringToUint8Array(str: string): Uint8Array {
  const utf8 = unescape(encodeURIComponent(str));
  const arr = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) {
    arr[i] = utf8.charCodeAt(i);
  }
  return arr;
}

async function decompressData(base64EncodedData: string): Promise<Uint8Array> {
  try {
    const compressedData = window.atob(base64EncodedData);
    const compressedArray = new Uint8Array(
      Array.from(compressedData, (c) => c.charCodeAt(0))
    );

    const inflate = new pako.Inflate();

    // Process the data in chunks
    for (let i = 0; i < compressedArray.length; i += 1024) {
      const chunk = compressedArray.slice(i, i + 1024);
      inflate.push(chunk, i + 1024 === compressedArray.length);
    }

    // Handle both string and Uint8Array results
    const result = inflate.result;
    return typeof result === "string" ? stringToUint8Array(result) : result;
  } catch (error) {
    console.error("Error during decompression:", error);
    throw error;
  }
}

const extractFiles: (json_file: any) => Promise<extractionOutput[]> = async (
  json_file: any
) => {
  const files = <extractionOutput[]>[];
  const user_id = Object.keys(json_file.files)[0];

  for (const obj of json_file.files[user_id]) {
    const file_name = Object.keys(obj)[0];
    const file_bytes = Buffer.from(obj[file_name], "base64");
    const data = obj.data;

    const file_data = await decompressData(obj[file_name]);

    files.push({
      file_name,
      file_bytes,
      data,
      file_data,
      id: data.id,
    });
  }

  return files;
};

export default extractFiles;
