export interface IFile {
  _id: string;
  userId: string;
  originalName: string;
  encoding: string;
  mimetype: string;
  size: number;
  uploadDate: Date;
  __v: number;
}

export interface FileInitialState {
  files: IFile[];
  status: string;
  error: string | undefined;
  uploadProgress: number;
  totalFileSize: number;
}
