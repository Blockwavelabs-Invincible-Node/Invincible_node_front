import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  networkId: 0,
  networkName: "Evmos",
  tokenName: ""
}

export const networkReducer = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkId: (state, action) => {
        state.networkId = action.payload;
    },
    setNetworkName: (state, action) => {
        state.networkName = action.payload;
    },
    setTokenName: (state, action) => {
        state.tokenName = action.payload;
    }
  },

});

export const { setNetworkId, setNetworkName, setTokenName } = networkReducer.actions;
export const selectNetworkId = (state) => state.network.networkId;
export const selectNetworkName = (state) => state.network.networkName;
export const selectTokenName = (state) => state.network.tokenName;

export default networkReducer.reducer;
