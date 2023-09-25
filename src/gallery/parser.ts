import { Buffer } from "buffer";
import { Inflate } from "zlibt2";

async function decompressData(base64EncodedData: string) {
  try {
    const data = Buffer.from(base64EncodedData, "base64");

    const uncompressedBytes = new Inflate(data);
    const encodedData: string = Buffer.from(
      uncompressedBytes.decompress()
    ).toString("base64");

    return encodedData;
  } catch (error) {
    console.error(error);
  }
}

async function extractFiles(json_file) {
  const files = [];
  const user_id = Object.keys(json_file.files)[0];

  for (const obj of json_file.files[user_id]) {
    const file_name = Object.keys(obj)[0];
    const file_bytes = obj[file_name];
    const data = obj.data;

    try {
      const file_data = await decompressData(file_bytes);
      const id = data.id;

      files.push({ file_name, file_bytes, data, file_data, id });
    } catch (error) {
      console.error(`Error processing ${file_name}:`, error);
    }
  }

  console.log(files);
  return files;
}

export default extractFiles;
