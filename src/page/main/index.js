import Footer from "../common/footer";
import Title from "./components/title";
import Header from "../common/header";

function Mainpage() {
  return (
    <div>
      <Header home={0}></Header>
      <Title />
      <Footer />
    </div>
  );
}

export default Mainpage;
