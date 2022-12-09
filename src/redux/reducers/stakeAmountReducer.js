import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  ethStakeAmount: 0,
}

export const stakeAmountReducer = createSlice({
  name: 'stakeAmount',
  initialState,
  reducers: {
    setStakeAmount: (state, action) => {
        state.ethStakeAmount = action.payload;
    }
  },

});

export const { setStakeAmount } = stakeAmountReducer.actions;
export const selectStakeAmount = (state) => state.stakeAmount.ethStakeAmount;

export default stakeAmountReducer.reducer;
