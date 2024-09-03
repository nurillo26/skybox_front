import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FileInitialState, IFile } from '../../interfaces/IFiles';

const calculateTotalFileSize = (files: IFile[]): number => {
  return files.reduce((totalSize, file) => totalSize + file.size, 0);
};

export const fetchUserFiles = createAsyncThunk(
  'files/fetchUserFiles',
  async (fileIds: string[]) => {
    try {
      const response = await axios.get(
        'https://skybox-server-17db72aab202.herokuapp.com/getfiles',
        { params: { fileIds } },
      );
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  },
);

const initialState: FileInitialState = {
  files: [],
  status: 'idle',
  error: undefined,
  uploadProgress: 0,
  totalFileSize: 0,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload);
      state.totalFileSize += action.payload.size;
    },
    deleteFileState: (state, action: PayloadAction<string>) => {
      const deletedFile = state.files.find((file) => file._id === action.payload);
      if (deletedFile) {
        state.files = state.files.filter((file) => file._id !== action.payload);
        state.totalFileSize -= deletedFile.size;
      }
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFiles.pending, (state) => {
      state.status = 'loading';
      state.files = [];
    });
    builder.addCase(fetchUserFiles.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.files = action.payload;
      state.totalFileSize = calculateTotalFileSize(action.payload);
    });
    builder.addCase(fetchUserFiles.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { addFile, setUploadProgress, deleteFileState } = filesSlice.actions;

export default filesSlice.reducer;
