import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  position: relative;
`;

const ClaimRewardPage = () => {
  const [showModal, setShowModal] = useState(true);
  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };


  return (
    <PageContainer>
     
        <Modal
          closeModal={() => {
            setShowModal(false);
            routeStake();
          }}
          visible={showModal}
        />
      
      <Header></Header>
    </PageContainer>
  );
};

export default ClaimRewardPage;
