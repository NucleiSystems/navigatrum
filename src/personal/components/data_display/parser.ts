const user_id = "1";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
import { decompress, decompressSync } from "zstd.ts";

async function decompressFileData(fileData: string): Promise<Buffer> {
  // Convert the file data string to a Buffer
  const compressedData = Buffer.from(fileData, "base64");

  // Decompress the data using the zstd.ts library
  const decompressedData = await decompressSync({ input: compressedData });

  // Return the decompressed data as a Buffer
  return decompressedData;
}

// @ts-ignore
export default function extractFiles(json_file): any {
  let files: any = [];

  Object.keys(json_file.files[user_id]).forEach((key) => {
    let base64_string = json_file.files[user_id][key];
    let new_base64_string =
      json_file.files[user_id][key][Object.keys(base64_string).toString()];
    let file_data = new_base64_string;
    let file_name = Object.keys(base64_string).toString();
    files.push({ file_name, file_data });
  });
  console.log(files);
  return files;
}
