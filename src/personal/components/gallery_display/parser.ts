import { Buffer } from "buffer";
Buffer.from("anything", "base64");
import { ZstdInit, ZstdDec } from "@oneidentity/zstd-js/decompress";

async function decompressData(base64EncodedData): Promise<string | Buffer> {
  const { ZstdSimple } = await ZstdInit();
  let data: Buffer = Buffer.from(base64EncodedData, "base64");
  // check if the data is compressed
  if (data[0] !== 0x28) {
    return data;
  }
  let faf: Uint8Array = new Uint8Array(data);
  const uncompressed: Uint8Array = ZstdSimple.decompress(faf);
  const encodedData: string = Buffer.from(uncompressed).toString("base64");
  return encodedData;
}

export default async function extractFiles(json_file) {
  let files: any[] = [];

  let user_id = Object.keys(json_file.files)[0];
  for (const obj of json_file.files[user_id]) {
    let file_name: string = Object.keys(obj)[0];
    let file_bytes: Buffer = obj[file_name];
    let data = obj.data;
    let file_data = await decompressData(file_bytes);
    let id: number = data.id;
    files.push({ file_name, file_bytes, data, file_data, id });
  }
  console.log(files);
  return files;
}
