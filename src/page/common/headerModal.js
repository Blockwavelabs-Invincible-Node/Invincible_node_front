import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SelectNetworkPopup from "../common/components/selectNetworkPopup";
import SwitchNetworkPopup from "./components/switchNetworkPopup";
import WalletInfoPopup from "./components/walletInfoPopup";

const ModalBackground = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  //   width: 90vw;
  //   height: 90vh;
  width: 100%;
  height: 100%;
  position: absolute;
  //   left: 5vw;
  top: 0vh;
  background: rgba(46, 46, 46, 0.92);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  //   display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ModalWrapper = styled.div`
  background: #333333;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  /* padding: min(40px, 5vh) min(88px, 5vw) min(40px, 5vh) min(88px, 5vw); */
  padding: 30px 40px 30px 40px;
  max-width: 90%;
  position: absolute;
  top: 20vh;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

function HeaderModal({ closeModal, visible, modalType }) {
  const modalRef = useRef();

  const clickModalOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
      console.log("모달 닫았음");
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickModalOutside);
    return () => document.removeEventListener("click", clickModalOutside);
  }, []);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };

  const ModalComponent = () => {
    if (modalType === 0) {
      return (
        <SwitchNetworkPopup
          routePage={routeStake}
          closeModal={closeModal}
        ></SwitchNetworkPopup>
      );
    } else if (modalType === 1) {
      return <WalletInfoPopup></WalletInfoPopup>;
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalBackground
        onClick={visible ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalWrapper>
          {/* <SwitchNetworkPopup
            routePage={routeStake}
            closeModal={closeModal}
          ></SwitchNetworkPopup> */}
          {ModalComponent()}
        </ModalWrapper>
      </ModalBackground>
    </>
  );
}
export default HeaderModal;
