import {Container, Header, UserAvatar, Search, SearchInput, SidebarButton} from './sidebar.styles';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";


function Sidebar() {
    const [user] = useAuthState(auth);
    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');

        if (!input) return null;
        if (EmailValidator.validate(input) && user.email === input) {
            if (user) {
                db.collection("chats").add(
                    {
                        users: [user.email, input],
                    }
                )
            }
        }
    };

    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()}/>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="search for chat"/>
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>


        {/*    list of chat     */}
        </Container>
    )
}

export default Sidebar;