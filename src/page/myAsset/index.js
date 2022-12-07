import React from "react";
import Header from "../common/header";
import CurrentAssets from "./components/currentAssets";
import QuickSwap from "./components/quickSwap";
import Pool from "../main/components/pool";
import Footer from "../common/footer";

const MyAsset = () => {
    
    return(
        <>
            <Header home={1}></Header>
            <CurrentAssets></CurrentAssets>
            <QuickSwap></QuickSwap>
            <Pool></Pool>
            <Footer></Footer>
        </>
    );
}
export default MyAsset;