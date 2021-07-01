import React from 'react';
import {Container, Sender, Receiver, Timestamp} from "./message.styles";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import moment from "moment";

const Message = ({user, message}) => {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfUser = user === userLoggedIn.email ? Sender : Receiver;
    return (
        <Container>
            <TypeOfUser>{message.message}
                <Timestamp>
                    {message.timestamp ?
                        moment(message.timestamp).format('LT')
                    :
                        "..."
                    }
                </Timestamp>
            </TypeOfUser>
        </Container>
    );
};

export default Message;