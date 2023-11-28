export default interface FilesType {
  file_name: string;
  file_bytes: string | Uint8Array;
  data: {
    id: string;
    size: string;
  };
  file_data: string | Uint8Array;
  id: string;
}

export default interface FilesRecord {}
