import FilesType from "./fileInterface";

export default interface extractionOutput {
  file_name: string;
  file_bytes: Uint8Array;
  data: FilesType["data"];
  file_data: Uint8Array;
  id: string;
}
