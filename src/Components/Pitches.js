import React from 'react'
import { getHuddleClient, HuddleClientProvider } from '@huddle01/huddle01-client';


function Pitches() {

    const huddleClient = getHuddleClient('e3dde9b45cf69e4963101c4fbda2c51bbd7849bd47be0813d4081bd40dc256b4');

    const startMeet = async() => {
        huddleClient.join("roomId")
    }

  return (
    <>
    <HuddleClientProvider client = {huddleClient}>
        <button onClick={startMeet}>Start</button>
    </HuddleClientProvider>

        <h1>Project Pitches</h1>
    </>
  )
}

export default Pitches