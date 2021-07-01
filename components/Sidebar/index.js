import {Container, Header, UserAvatar, Search, SearchInput, SidebarButton, IconsContainer} from './sidebar.styles';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from "../Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const ChatsRef = db.collection("chats").where('users', 'array-contains', user.email);
    const [ChatsSnapshot] = useCollection(ChatsRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');

        if (!input) return null;

        if (EmailValidator.validate(input) && !ChatAlreadyExists(input) && user.email !== input) {
                db.collection("chats").add({
                        users: [user.email, input],
                    })
        }
        if (ChatAlreadyExists(input)) {
            alert("chat exists")
        }
    };

    const ChatAlreadyExists = recipientEmail =>
        ChatsSnapshot?.docs.some(
            chat => chat.data().users?.includes(recipientEmail)
        )

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="search for chat"/>
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>


        {/*    list of chat     */}
            {
                ChatsSnapshot?.docs.map(chat => <Chat key={chat.id} id={chat.id} users={chat.data().users}/>)
            }
        </Container>
    )
}

export default Sidebar;