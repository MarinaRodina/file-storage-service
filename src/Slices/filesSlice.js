import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    uploadedFiles: [], // массив загруженных файлов
    uploadedFilesCount: 0, // счётчик количества загруженных файлов
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
