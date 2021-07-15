import React from 'react';
import Head from "next/head";
import {ChatContainer, Container} from "../../styles/chat.styles";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";


export const getServerSideProps = async context => {
    const ref = db.collection("chats").doc(context.query.id);
    const messagesRef = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();
    const messages = messagesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(message => ({
        ...message,
        timestamp: message.timestamp.toDate().getTime()
    }))

    const chatRef = await ref.get();
    const chat = {
        id: chatRef.id,
        ...chatRef.data()
    }
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
};

const Chat = ({chat, messages}) => {
    const [user] = useAuthState(auth);
    return (
        <>
            <Head>
                <title>
                    Chat
                </title>
            </Head>

            <Container>
                <Sidebar/>
                <ChatContainer>
                    <ChatScreen chat={chat} messages={messages}/>
                </ChatContainer>
            </Container>
        </>
    );
};

export default Chat;