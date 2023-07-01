import { Buffer } from "buffer";
Buffer.from("anything", "base64");
import { ZstdInit, ZstdDec } from "@oneidentity/zstd-js/decompress";

async function decompressData(base64EncodedData) {
  const { ZstdSimple } = await ZstdInit();
  let data = Buffer.from(base64EncodedData, "base64");
  // check if the data is compressed
  if (data[0] !== 0x28) {
    return data;
  }
  let faf = new Uint8Array(data);
  const uncompressed = ZstdSimple.decompress(faf);
  const encodedData = Buffer.from(uncompressed).toString("base64");
  return encodedData;
}

export default async function extractFiles(json_file) {
  let files = [];
  let user_id = Object.keys(json_file.files)[0];
  for (const obj of json_file.files[user_id]) {
    let file_name = Object.keys(obj)[0];
    let file_bytes = obj[file_name];
    let data = obj.data;
    let file_data = await decompressData(file_bytes);
    let id = data.id; // Extract the 'id' property from the 'data' object
    files.push({ file_name, file_bytes, data, file_data, id }); // Include 'id' in the object
  }
  console.log(files);
  return files;
}
