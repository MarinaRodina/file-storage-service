import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    uploadedFiles: [],
    uploadedFilesCount: 0,
  },
  reducers: {
    displayFile(state, { payload }) {
      state.uploadedFiles = payload;
    },
    removeFile(state, action) {
      // Логика удаления файла
      state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== action.payload);
      state.uploadedFilesCount -=1;
    },
    updateFiles(state, action) {
      state.uploadedFilesCount = action.payload.files.length;
      state.uploadedFiles = action.payload.files;
    }
  },
});

export const { actions } = filesSlice;
export default filesSlice.reducer;
