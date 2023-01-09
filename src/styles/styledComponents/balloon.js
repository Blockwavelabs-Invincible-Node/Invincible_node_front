import styled from "styled-components";

export const Balloon = styled.div`
  position: absolute;
  height: 2vh;
  background: #faf1e4;
  border-radius: 5px;
  color: #1b1b1b;
  text-align: center;
  vertical-align: middle;
  line-height: 2vh;
  &:after {
    border-top: 10px solid #faf1e4;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    /* top: 100%; */
  }
`;
