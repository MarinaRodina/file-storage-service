import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    uploadedFiles: [],
    uploadedFilesCount: 0,
  },
  reducers: {
    updateFiles(state, action) {
      state.uploadedFilesCount = action.payload.files.length;
      state.uploadedFiles = action.payload.files;
    },
    removeFile(state, action) {
      state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== action.payload);
      state.uploadedFilesCount -=1;
    },
  },
});

export const { actions } = filesSlice;
export default filesSlice.reducer;
