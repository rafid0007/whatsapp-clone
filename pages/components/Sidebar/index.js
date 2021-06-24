import {Container, Header, UserAvatar} from './sidebar.styles';
import { ChatIcon, MoreVertIcon } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';

// import ChatIcon from '@material-ui/icons/Chat';


function Sidebar() {
    return (
        <Container>
            <Header>
                <UserAvatar/>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Header>
        </Container>
    )
}

export default Sidebar;