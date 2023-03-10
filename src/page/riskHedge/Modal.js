import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Confirm from "./components/confirm";
import Success from "./components/success";

const ModalBackground = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  //   width: 90vw;
  //   height: 90vh;
  width: 100%;
  height: 100%;
  position: fixed;
  //   left: 5vw;
  //   top: 5vh;
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
  width: 35vw;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  padding: min(43px, 5vh) min(1vw) min(43px, 5vh) min(88px, 1vw);
  /* padding */
  max-width: 100%;
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

function Modal({
  closeModal,
  visible,
  token,
  stakeAmount,
  getAmount,
  hedgeAmount,
}) {
  const [component, setComponent] = useState(0);
  const modalRef = useRef();

  const clickModalOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
      console.log("모달 닫았음");
    }
  };

  // const ModalComponent = () => {
  //   if (component == 0) {
  //     <Confirm
  //       pressStake={() => {
  //         setComponent(true);
  //       }}
  //       token={token}
  //       stakeAmount={stakeAmount}
  //       getAmount={getAmount}
  //       hedgeAmount={hedgeAmount}
  //     />;
  //   } else if (component == 1) {
  //     <Success token={token} stakeAmount={stakeAmount} getAmount={getAmount} />;
  //   } else if (component == 2) {

  //   }
  // };

  useEffect(() => {
    document.addEventListener("click", clickModalOutside);
    return () => document.removeEventListener("click", clickModalOutside);
  }, []);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
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
          {!component ? (
            <Confirm
              pressStake={() => {
                setComponent(true);
              }}
              token={token}
              stakeAmount={stakeAmount}
              getAmount={getAmount}
              hedgeAmount={hedgeAmount}
            />
          ) : (
            <Success
              token={token}
              stakeAmount={stakeAmount}
              getAmount={getAmount}
            />
          )}
        </ModalWrapper>
      </ModalBackground>
    </>
  );
}
export default Modal;
