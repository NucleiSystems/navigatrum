import { Buffer } from "buffer";
import { Inflate } from "zlibt2";

/**
 * The function decompresses a base64 encoded data using the Inflate algorithm and returns the decoded
 * data.
 * @param {string} base64EncodedData - The `base64EncodedData` parameter is a string that represents
 * data encoded in base64 format. This data needs to be decompressed before it can be used.
 * @returns the decompressed and encoded data as a string.
 */
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

/**
 * The function `extractFiles` takes a JSON file as input, extracts the files and their data from it,
 * decompresses the file data, and returns an array of file objects.
 * @param json_file - The `json_file` parameter is an object that contains a `files` property. The
 * `files` property is an object where the keys are user IDs and the values are arrays of objects. Each
 * object in the array represents a file and has two properties: the file name and the file bytes.
 * @returns an array of objects. Each object in the array represents a file and contains the following
 * properties:
 */
async function extractFiles(json_file: { files: { [x: string]: any } }) {
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
