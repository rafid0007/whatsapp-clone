import styled from "styled-components";

const DefaultScreen = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Content = styled.div`
  width: 200px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin-bottom: 40px;
`;

export { DefaultScreen, ImageContainer, Content};