import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectModalPageNumber } from "../../../redux/reducers/modalPageNumberReducer";
import { Button } from "../../../styles/styledComponents/button";

const Wrapper = styled.div` 

`;
const ConfirmButton = styled(Button)` 

`;
const ModalComponent = () => {
    const modalPageNumberRedux = useSelector(selectModalPageNumber);
    
    function Component() {
        if (modalPageNumberRedux == 0) {
            return (
                <>
                    <h2>Verifying Validator Address...</h2>
                </>
            )
        }
        else if (modalPageNumberRedux == 1) {
            return (
                <>
                    <h2>Sending Stable Coin to the Contract..</h2>
                </>
            )
        }
        else if (modalPageNumberRedux == 2) {
            return (
                <>
                    <h2>Sending Stable Coin to the Contract..</h2>
                    <h2>Approving...</h2>
                </>
            )
        }
        else if (modalPageNumberRedux == 3) {
            return (
                <>
                    <h2>Sending Stable Coin to the Contract..</h2>
                    <h2>Approving... Complete</h2>
                    <h2>Sending...</h2>
                </>
            )
        }
        else if (modalPageNumberRedux == 4) {
            return (
                <>
                    <h2>Sending Stable Coin to the Contract..</h2>
                    <h2>Approving... Complete</h2>
                    <h2>Sending... Complete</h2>
                </>
            )
        }
        else if (modalPageNumberRedux == 5) {
            return (
                <>
                    <h2>Successfully Added Validator!</h2>
                    <ConfirmButton>Confirm</ConfirmButton>
                </>
            )
        }
    }
    console.log("modal page: ", modalPageNumberRedux);
    return(
        <Wrapper>
            <Component></Component>
        </Wrapper>
    )
}

export default ModalComponent;