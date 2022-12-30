import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  validatorAddress: "",
  stableCoinAmount: 0,
};

export const validatorApplicationReducer = createSlice({
  name: "validatorApplication",
  initialState,
  reducers: {
    setValidatorAddress: (state, action) => {
      state.validatorAddress = action.payload;
    },
    setStableCoinAmount: (state, action) => {
      state.stableCoinAmount = action.payload;
    },
  },
});

export const { setValidatorAddress, setStableCoinAmount } =
  validatorApplicationReducer.actions;
export const selectValidatorAddress = (state) =>
  state.validatorApplication.validatorAddress;
export const selectStableCoinAmount = (state) =>
  state.validatorApplication.stableCoinAmount;

export default validatorApplicationReducer.reducer;
