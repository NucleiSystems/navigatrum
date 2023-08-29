import { Buffer } from "buffer";
import { Deflate, Inflate } from "zlibt2";

async function decompressData(base64EncodedData: string): Promise<string> {
  try {
    const data = Buffer.from(base64EncodedData, "base64");

    const compressedData = data.slice(1); // Remove the compression marker (0x28)

    // Decompress using pako
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
      const id = data.id; // Extract the 'id' property from the 'data' object

      files.push({ file_name, file_bytes, data, file_data, id }); // Include 'id' in the object
    } catch (error) {
      console.error(`Error processing ${file_name}:`, error);
      // You might want to handle the error scenario here as needed
    }
  }

  console.log(files);
  return files;
}

export default extractFiles;
