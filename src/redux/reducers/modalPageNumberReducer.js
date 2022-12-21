import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  pageNumber: 0
}

export const modalPageNumberReducer = createSlice({
  name: 'modalPageNumber',
  initialState,
  reducers: {
    increasePageNumber: (state) => {
        state.pageNumber++;
    },
    decreasePageNumber: (state) => {
        state.pageNumber--;
    },
    resetPageNumber: (state) => {
        state.pageNumber = 0;
    }
  },
});

export const { increasePageNumber, decreasePageNumber, resetPageNumber } = modalPageNumberReducer.actions;
export const selectModalPageNumber = (state) => state.modalPageNumber.pageNumber;


export default modalPageNumberReducer.reducer;
