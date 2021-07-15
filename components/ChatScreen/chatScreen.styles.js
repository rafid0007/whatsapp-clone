import styled from "styled-components";
import bg from "../../public/bg-1.jpg"

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  z-index: 100;
  top: 0;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 11px;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  
  > h3 {
    margin-bottom: 3px;
  }
  
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const EndOfMessages = styled.div`
  margin-bottom: 50px;
`;

export {Container, Header, HeaderIcons, HeaderInfo, MessageContainer, EndOfMessages, InputContainer, Input};