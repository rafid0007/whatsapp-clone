import {Container, LoginContainer, Logo} from "../styles/login.styles";
import Head from "next/head";
import {Button} from "@material-ui/core";
import {auth, provider} from "../firebase";

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
                <Logo src="./whatsapp_logo.png"/>
                <Button variant="outlined" onClick={signIn}>Sign in with Google</Button>
            </LoginContainer>
        </Container>
    );
};

export default Login;