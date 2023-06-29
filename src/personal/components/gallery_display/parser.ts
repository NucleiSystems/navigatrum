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
  let files: any[] = [];
  let user_id = Object.keys(json_file.files)[0];
  for (const key of Object.keys(json_file.files[user_id])) {
    let base64_string = json_file.files[user_id][key];

    let new_base64_string =
      json_file.files[user_id][key][Object.keys(base64_string).toString()];
    let file_data = await decompressData(new_base64_string);
    let file_name = Object.keys(base64_string).toString();
    files.push({ file_name, file_data });
  }
  console.log(files);
  return files;
}
