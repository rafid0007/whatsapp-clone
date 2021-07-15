import Image from "next/image";
import {Container, LoginContainer, Logo} from "../styles/login.styles";
import Head from "next/head";
import {Box, Button, Typography} from "@material-ui/core";
import {auth, provider} from "../firebase";
import GoogleIcon from "../assets/icons8-google.svg";
import Chat from "../assets/chat.svg"

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Image src={Chat} height="200px" width="200px" alt="whatsapp logo"/>
                <Button
                    variant="contained"
                    style={{marginTop: 50}}

                    onClick={signIn}
                >
                    <Image src={GoogleIcon} alt="google icon" height={25} width={25} />
                    <Box as="Typography" variant="button" ml={1}>
                        Google Sign In
                    </Box>
                </Button>
            </LoginContainer>
        </Container>
    );
};

export default Login;