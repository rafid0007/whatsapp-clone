import Image from "next/image"
import Circle from "better-react-spinkit/dist/Circle";
import Chat from "../assets/chat.svg";

const Loading = () => {
    return (
        <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
            <div>
                <Image src={Chat}
                       alt="Chat logo"
                       height={200}
                       width={200}
                       loading="eager"
                />
                <Circle color="dodgerblue" size={60} />
            </div>
        </center>
    );
};

export default Loading;