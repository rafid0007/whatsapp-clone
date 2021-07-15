import Image from "next/image";
import {
    Container,
    EndOfMessages,
    Header,
    HeaderIcons,
    HeaderInfo, Img, Input,
    InputContainer,
    MessageContainer
} from "./chatScreen.styles";
import {Avatar, IconButton} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {AttachFile, InsertEmoticon, Mic} from "@material-ui/icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import {useRouter} from "next/router";
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "../Message";
import {useRef, useState} from "react";
import firebase from "firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import bg from "../../public/bg-1.jpg"

const ChatScreen = ({chat, messages}) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const endOfMessagesRef = useRef(null);
    const [input, setInput] = useState("");
    const [messagesSnapshot] = useCollection(
        db.collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", 'asc')
    )

    const scrollToBottom = () => {
        if (endOfMessagesRef) {
            endOfMessagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => <Message key={message.id} user={message.user} message={message} />)
        }
    }

    const sendMessage = e => {
        e.preventDefault();
        // update last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true})

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoUrl: user.photoURL,
        })
        setInput("");
        scrollToBottom();

    }

    const recipientEmail = getRecipientEmail(chat.users, user);
    const recipientRef = db.collection("users").where('email', '==', recipientEmail);
    const [recipientSnapshot] = useCollection(recipientRef);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientName = recipient?.displayName;

    return (
        <Container>
            <Header>
                {
                    recipient?
                        <Avatar src={recipient?.photoUrl} />
                        :
                        <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
                }
                <HeaderInfo>
                    <h3>{recipientName?recipientName:recipientEmail}</h3>
                    {
                        recipient ? <p>Last seen: {" "} {<TimeAgo datetime={recipient.lastSeen.toDate()}/>}</p> : <p>Last seen: unavailable</p>
                    }
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessages ref={endOfMessagesRef}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticon/>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >
                    Send Message
                </button>
                <Mic/>
            </InputContainer>
        </Container>
    );
};

export default ChatScreen;