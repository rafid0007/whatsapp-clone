import Image from "next/image"
import Circle from "better-react-spinkit/dist/Circle";
import whatsappLogo from "../public/whatsapp_logo.png";

const Loading = () => {
    return (
        <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
            <div>
                <Image src={whatsappLogo}
                       alt="whatsapp logo"
                       height={200}
                       width={200}
                       loading="eager"
                />
                <Circle color="#3CBC28" size={60} />
            </div>
        </center>
    );
};

export default Loading;