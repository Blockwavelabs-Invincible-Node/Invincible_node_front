import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  ethStakeAmount: 0,
}

export const hedgeAmountReducer = createSlice({
  name: 'hedgeAmount',
  initialState,
  reducers: {
    setHedgeAmount: (state, action) => {
        state.ethHedgeAmount = action.payload;
    }
  },

});

export const { setHedgeAmount } = hedgeAmountReducer.actions;
export const selectHedgeAmount = (state) => state.hedgeAmount.ethHedgeAmount;

export default hedgeAmountReducer.reducer;
