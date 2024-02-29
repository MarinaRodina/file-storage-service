import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    uploadedFiles: [],
    uploadedFilesCount: 0,
  },
  reducers: {
    addFile(state, action) {
      state.uploadedFiles.push(action.payload);
      state.uploadedFilesCount +=1;
    },
    removeFile(state, action) {
      // Логика удаления файла
      state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== action.payload.id);
      state.uploadedFilesCount -=1;
    },
  },
});

export const { actions } = filesSlice.actions;
export default filesSlice.reducer;
