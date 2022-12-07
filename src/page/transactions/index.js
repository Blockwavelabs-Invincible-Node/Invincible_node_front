import { useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Transaction from "./components/transactions";

const PageContainer = styled.div`
  position: relative;
`;

const TransactionPage = () => {
  const [showModal, setShowModal] = useState(true);
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };


  return (
    <PageContainer>
      <Header></Header>
      <Transaction></Transaction>
    </PageContainer>
  );
};

export default TransactionPage;
