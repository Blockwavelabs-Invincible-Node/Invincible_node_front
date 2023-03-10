import "./App.css";
import MainPage from "./page/main";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MyPage from "./page/myPage";
import StakePage from "./page/stake";
import styled from "styled-components";
import UnstakePage from "./page/unstake";
import ClaimRewardPage from "./page/claimReward";
import TransactionPage from "./page/transactions";
import ContractPage from "./page/contracts";
import ValidatorPage from "./page/validators";
import RiskHedgePage from "./page/riskHedge";
import ValidatorApplicationPage from "./page/validatorApplication";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Background = styled.div`
  background-color: #262626;
  color: white;
  min-height: 100vh;
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: `#FFF`,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Background className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/stake" element={<StakePage />}></Route>
            <Route path="/my-page" element={<MyPage />}></Route>
            <Route path="/unstake" element={<UnstakePage />}></Route>
            <Route path="/claim" element={<ClaimRewardPage />}></Route>
            <Route path="/transactions" element={<TransactionPage />}></Route>
            <Route path="/contracts" element={<ContractPage />}></Route>
            <Route path="/validators" element={<ValidatorPage />}></Route>
            <Route path="/risk-hedge" element={<RiskHedgePage />}></Route>
            <Route
              path="/validator-application"
              element={<ValidatorApplicationPage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Background>
    </ThemeProvider>
  );
}

export default App;
