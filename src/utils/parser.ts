import { Buffer } from "buffer";
import { Inflate } from "zlibt2";
import FilesType from "../interfaces/fileInterface";

interface extractionOutput {
  file_name: string;
  file_bytes: string;
  data: FilesType["data"];
  file_data: string;
  id: string;
}

async function decompressData(base64EncodedData: string) {
  const data = Buffer.from(base64EncodedData, "base64");

  const uncompressedBytes = new Inflate(data);
  const encodedData: string = Buffer.from(
    uncompressedBytes.decompress()
  ).toString("base64");
  return encodedData;
}

const extractFiles: (json_file: any) => Promise<FilesType[]> = async (
  json_file: any
) => {
  const files = <extractionOutput[]>[];
  const user_id = Object.keys(json_file.files)[0];

  for (const obj of json_file.files[user_id]) {
    const file_name = Object.keys(obj)[0];
    const file_bytes = obj[file_name];
    const data = obj.data;

    const file_data = await decompressData(file_bytes);
    const id = data.id;

    files.push({ file_name, file_bytes, data, file_data, id });
  }

  return files;
};

export default extractFiles;
