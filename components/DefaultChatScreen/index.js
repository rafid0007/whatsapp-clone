import {Content, DefaultScreen, ImageContainer} from "./DefaultChatScreen.styles";
import Image from "next/image";
import {Typography} from "@material-ui/core";
import Chat from "../../assets/chat.svg";

const DefaultChatScreen = () => {
    return (
        <DefaultScreen>
            <Content>
                <ImageContainer>
                    <Image src={Chat} layout="fill" objectFit="cover" alt="chat logo"/>
                </ImageContainer>
                <Typography variant="body1" align="center" color="textSecondary">
                    Create new chat or select your chat from the left side of the screen.
                </Typography>
            </Content>
        </DefaultScreen>
    );
};

export default DefaultChatScreen;