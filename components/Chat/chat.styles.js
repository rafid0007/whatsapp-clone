import styled from "styled-components";
import {Avatar} from "@material-ui/core";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  word-break: break-word;
  
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;

export {Container, UserAvatar};