import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  position: relative;
`;

const UnstakePage = () => {
  const [showModal, setShowModal] = useState(true);
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };


  return (
    <PageContainer>
     
        <Modal
          closeModal={() => {
            setShowModal(false);
            routeMain();
          }}
          visible={showModal}
        />
      
      <Header></Header>
    </PageContainer>
  );
};

export default UnstakePage;
