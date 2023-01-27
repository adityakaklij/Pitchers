import React, { useState } from 'react'
import { getHuddleClient, HuddleClientProvider } from '@huddle01/huddle01-client';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../Constants/Constants';


function Pitches() {

    const [pitchEligibility, setPitchEligibility] = useState(false)
    const [account, setAccount] = useState()
    const huddleClient = getHuddleClient('e3dde9b45cf69e4963101c4fbda2c51bbd7849bd47be0813d4081bd40dc256b4');

    const startMeet = async() => {
        huddleClient.join("roomId")
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const StartPitch = async() => {
        const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
        const address = await signer.getAddress()
    
        const getProjectId = await contractInstance.projectUserMap(address)
        const isEligibelForPitch = await contractInstance.isProjectEligibalForPitch(getProjectId.toString());
        setPitchEligibility(isEligibelForPitch)
        startMeet()
    }

  return (
    <>
    <HuddleClientProvider client = {huddleClient}>
        {/* <button onClick={startMeet}>Start</button> */}
    </HuddleClientProvider>

        <h1>Project Pitches</h1>

        <button onClick={StartPitch}>Start Pitch</button>
    </>
  )
}

export default Pitches