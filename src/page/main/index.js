import Footer from "../common/footer";
import Title from "./components/title";
import Header from "../common/header";
import Modal from "./Modal";
import { useState } from "react";

function Mainpage() {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("Evmos");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [getAmount, setGetAmount] = useState(0);

  return (
    <div>
      <Header home={0} launchedApp={false}></Header>
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
      <Title
        openModal={() => {
          setShowModal(true);
        }}
      />
      <Footer />
    </div>
  );
}

export default Mainpage;
