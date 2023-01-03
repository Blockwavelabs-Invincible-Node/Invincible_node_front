import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  ethHedgeRatio: 0,
}

export const hedgeRatioReducer = createSlice({
  name: 'hedgeRatio',
  initialState,
  reducers: {
    setHedgeRatio: (state, action) => {
        state.ethHedgeRatio = action.payload;
    }
  },

});

export const { setHedgeRatio } = hedgeRatioReducer.actions;
export const selectHedgeRatio = (state) => state.hedgeRatio.ethHedgeRatio;

export default hedgeRatioReducer.reducer;
