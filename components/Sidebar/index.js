import React from "react";
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
import DialogForm from "../DialogForm";
import useInputState from "../../hooks/useInputState";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ResponsiveDialog from "../DialogForm";

function Sidebar() {
    const [user] = useAuthState(auth);
    const ChatsRef = db.collection("chats").where('users', 'array-contains', user.email);
    const [ChatsSnapshot] = useCollection(ChatsRef);
    const [open, setOpen] = React.useState(false);
    const [input, handleChange, reset] = useInputState();
    const ExistingChatContext = React.createContext(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        reset();
      }

    const createChat = () => {
        handleClose();

        if (!input) return null;

        if (EmailValidator.validate(input) && !ChatAlreadyExists(input) && user.email !== input) {
                db.collection("chats").add({
                        users: [user.email, input],
                    })
        }
        if (ChatAlreadyExists(input)) {
            setDoesChatExists(true);
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
            <SidebarButton onClick={handleOpen}>create a new chat</SidebarButton>

            {/*    list of chat     */}
            {
                ChatsSnapshot?.docs.map(chat => <Chat key={chat.id} id={chat.id} users={chat.data().users}/>)
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create new chat</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                      Enter the email of the user you want to chat with
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={createChat} color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Dialog>

        </Container>
    )
}

export default Sidebar;