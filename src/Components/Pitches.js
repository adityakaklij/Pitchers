import React, { useState, useRef, useEffect } from "react";
import {
  getHuddleClient,
  HuddleClientProvider,
} from "@huddle01/huddle01-client";
import { ethers } from "ethers";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { contractABI, contractAddress } from "../Constants/Constants";
import "../CSS/Pitches.css";

function Pitches() {
  const stream = useHuddleStore((state) => state.stream);
  const isCamPaused = useHuddleStore((state) => state.isCamPaused);
  const [pitchEligibility, setPitchEligibility] = useState(false);
  const [account, setAccount] = useState();
  const [btnVisible, setBtnVisible] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [CamState, setCamState] = useState("On");
  const [MicState, setMicState] = useState("On");
  
  const huddleClient = getHuddleClient(
    "e3dde9b45cf69e4963101c4fbda2c51bbd7849bd47be0813d4081bd40dc256b4"
  );

  const startMeet = async () => {
    huddleClient.join("roomId");
    btnVisible ? setBtnVisible(false) : setBtnVisible(true);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log({ stream });
  }, [stream]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // const StartPitch = async() => {
  //     const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
  //     const address = await signer.getAddress()

  //     const getProjectId = await contractInstance.projectUserMap(address)
  //     console.log("Ran");
  //     const isEligibelForPitch = await contractInstance.isProjectEligibalForPitch(getProjectId.toString());
  //     setPitchEligibility(isEligibelForPitch)

  //     startMeet()
  // }

  const toggleCam = () => {
    if(isCamOn){
        setCamState("Off");
        huddleClient.disableWebcam()
        setIsCamOn(false);
    }
    else{
        setCamState("On");
        huddleClient.enableWebcam()
        setIsCamOn(true);
    }
  } 
    return btnVisible ? (
    <>
      <HuddleClientProvider client={huddleClient}>
        {/* <button onClick={startMeet}>Start</button> */}
        <h1>Project Pitches</h1>
        <button className="btn btn-primary" onClick={startMeet}>
          {" "}
          Pitch
        </button>
      </HuddleClientProvider>
    </>
  ) : (
    <>
       <div className="alignVideo">
      <video
        style={{ width: "55%" }}
        ref={videoRef}
        autoPlay
        muted
        playsInline
      ></video>
      <div className="alignControllers">
      <i class = "fa fa-microphone white-color " ></i>
      <i class="fa fa-video-camera white-color " onClick={toggleCam}></i>
      </div>
      <div className="alignControllers">
        <span>{MicState}</span>
        <span>{CamState}</span>
      </div>
      </div>
    </>
  );
}

export default Pitches;
