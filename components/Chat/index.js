import {Container, UserAvatar} from "./chat.styles";
import getRecipientEmail from "../../utils/getRecipientEmail";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";

const Chat = ({id, users}) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const recipientRef = db.collection("users").where('email', '==', recipientEmail);
    const [recipientSnapshot] = useCollection(recipientRef);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientName = recipient?.displayName;
    return (
        <Container onClick={() => router.push(`/chat/${id}`)}>
            {
                recipient?
                    <UserAvatar src={recipient?.photoUrl}/>:
                    <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
            }
            {recipientName? recipientName: recipientEmail}
        </Container>
    );
};

export default Chat;