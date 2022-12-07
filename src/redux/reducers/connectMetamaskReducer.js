import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  connectMetamask: false,
}

export const connectMetamaskReducer = createSlice({
  name: 'connectMetamask',
  initialState,
  reducers: {
    setStatus: (state, action) => {
        state.connectMetamask = action.payload;
    }
  },

});

export const { setStatus } = connectMetamaskReducer.actions;
export const selectConnectMetamask = (state) => state.connectMetamask.connectMetamask;

export default connectMetamaskReducer.reducer;
