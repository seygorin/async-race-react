import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catName: "",
  catColor: "#000",
  editingCat: null,
};

const catFormSlice = createSlice({
  name: "catForm",
  initialState,
  reducers: {
    setCatName: (state, action) => {
      state.catName = action.payload;
    },
    setCatColor: (state, action) => {
      state.catColor = action.payload;
    },
    setEditingCat: (state, action) => {
      state.editingCat = action.payload.id;
      state.catName = action.payload.name;
      state.catColor = action.payload.color;
    },
    clearForm: (state) => {
      state.catName = "";
      state.catColor = "#000";
      state.editingCat = null;
    },
  },
});

export const {
  setCatName,
  setCatColor,

  setEditingCat,
  clearForm,
} = catFormSlice.actions;
export default catFormSlice.reducer;
