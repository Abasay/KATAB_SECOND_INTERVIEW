import Webcam from "react-webcam-v2";

export default function WebCamComPonent({ref }){
 return <Webcam screenshotFormat="image/jpeg" ref={ref}/>
}