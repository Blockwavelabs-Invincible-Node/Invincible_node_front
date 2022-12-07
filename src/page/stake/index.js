import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Stake from "./components/stake";
import Header from "../common/header";
import Base from "../common/base";

const PageContainer = styled.div`
  position: relative;
`;

const StakePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("Evmos");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [getAmount, setGetAmount] = useState(0);

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
        />
      )}
      <Header></Header>
      <Base
        component={
          <Stake
            openModal={() => {
              setShowModal(true);
            }}
            setToken={setToken}
            setStakeAmountGlobal={setStakeAmount}
            setGetAmountGlobal={setGetAmount}
          ></Stake>
        }
      ></Base>
      {/* <button onClick={()=>{setShowModal(true)}}>모달 열기</button> */}
    </PageContainer>
  );
};

export default StakePage;
