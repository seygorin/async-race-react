import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cat } from "@type/catsTypes";

export interface CatFormState {
  catName: string;
  catColor: string;
  editingCat: Cat | null;
}

const initialState: CatFormState = {
  catName: "",
  catColor: "#000",
  editingCat: null,
};

const catFormSlice = createSlice({
  name: "catForm",
  initialState,
  reducers: {
    setCatName: (state, action: PayloadAction<string>) => {
      return { ...state, catName: action.payload };
    },
    setCatColor: (state, action: PayloadAction<string>) => {
      return { ...state, catColor: action.payload };
    },
    setEditingCat: (
      state,
      action: PayloadAction<{ id: number; name: string; color: string }>,
    ) => {
      return {
        ...state,
        editingCat: action.payload,
        catName: action.payload.name,
        catColor: action.payload.color,
      };
    },
    clearForm: (state) => {
      return {
        ...state,
        catName: "",
        catColor: "#000",
        editingCat: null,
      };
    },
  },
});

export const { setCatName, setCatColor, setEditingCat, clearForm } = catFormSlice.actions;
export default catFormSlice.reducer;
