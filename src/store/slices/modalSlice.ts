import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isModalVisible: boolean;
}

const initialState: ModalState = {
  isModalVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      return { ...state, isModalVisible: true };
    },
    closeModal: (state) => {
      return { ...state, isModalVisible: false };
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
