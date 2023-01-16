const user_id = "1";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");

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
