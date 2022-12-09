import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Header from "../common/header";
import Base from "../common/base";
import RiskHedge from "./components/ristkHedge";


const PageContainer = styled.div`
  position: relative;
`;

const RiskHedgePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("Evmos");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [getAmount, setGetAmount] = useState(0);
  const [hedgeAmount, setHedgeAmount] = useState(0);

  return (
    <PageContainer>
        {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
          visible={showModal}
          token={token}
          stakeAmount={stakeAmount}
          getAmount={getAmount}
          hedgeAmount={hedgeAmount}
        />
      )}
      <Header></Header>
      <Base
        component={
          <RiskHedge
            openModal={() => {
              setShowModal(true);
            }}
            setToken={setToken}
            setStakeAmountGlobal={setStakeAmount}
            setGetAmountGlobal={setGetAmount}
            setHedgeAmountGlobal={setHedgeAmount}
          ></RiskHedge>
        }
      ></Base>
      {/* <button onClick={()=>{setShowModal(true)}}>모달 열기</button> */}
    </PageContainer>
  );
};

export default RiskHedgePage;
