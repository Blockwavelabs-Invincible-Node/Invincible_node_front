import React from "react";
import Header from "../common/header";

import Footer from "../common/footer";
import Base from "../common/base";
import Info from "./components/info";


const MyPage = () => {
    
    return(
        <>
            <Header home={0} launchedApp={1}></Header>
            <Base
                component={
                    <Info>

                    </Info>
                }
            ></Base>
            <Footer></Footer>
        </>
    );
}
export default MyPage;