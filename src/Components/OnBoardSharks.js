import { ethers } from 'ethers'
import React, { useState } from 'react'
import { NFTStorage } from 'nft.storage'
import { contractABI, contractAddress } from '../Constants/Constants'
import '../App.css'


function OnBoardSharks() {

    const [isOwner, setIsOwner] = useState(false)
  const [uploadFile, setUploadFile] = useState()
  const [metaDataURL, setMetaDataURl] = useState()

  // For taking inputs
  const [SharkName, setSharkName] = useState()
  const [SharkDesc, setSharkDesc] = useState()
  const [SharkAddress, setSharkAddress] = useState()
  // const [SharkPrizePool, setSharkPrizePool] = useState()

  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const submitSharkFun = async() => {
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    // await uploadDetailsToIPFS();
    
    // const submitSharkTx = await contractInstance.onboardShark(metaDataURL, SharkAddress)
    const submitSharkTx = await contractInstance.onboardShark(metaDataURL, SharkAddress.toString())
    await submitSharkTx.wait()
    window.alert("Shark Addedd successfully!")

  }
  
  const uploadDetailsToIPFS = async (inputFile) => { // uploadFile should be passed here.
    const nftStorage = new NFTStorage({token: API_KEY,})

    try {
        const metaData = await nftStorage.store({
            name:SharkName,
            description: SharkDesc,
            address : SharkAddress,
            // SharkEndDate: SharkDate, // In unix
            image: uploadFile // Banner image for the Shark

        });

        // setMetaDataURl(getIPFSGatewayURL(metaData.url));
        setMetaDataURl(metaData.url);
        console.log("metadata:- ",metaData)
        return metaData
    } catch (error) {
        alert(error)
    }
  }


  // Helper functions
  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const handelSharkName = async (e) => {
    setSharkName(e.target.value)
    console.log(e.target.value)
  }

  const handelSharkDesc = async (e) => {
    setSharkDesc(e.target.value);
    console.log(e.target.value)
  }
  const handelSharkAddress = async (e) => {
    console.log(e.target.value)
    setSharkAddress(e.target.value);
    
  }

  if(!isOwner) {
    const checkTheUser = async() => {
        if (await signer.getAddress() === "0x88Ab2b62ccBD5170AA4D7266C0D5d7D002689fEf"){
            // console.log(signer.getAddress)
            setIsOwner(true)
        }
    }
    return(
        <>
            <button className='btn btn-primary' onClick={checkTheUser}>Owner Only</button>
        </>
    )
  }

  else{

  

  return (
    <div>
        <h1>Submit Sharks</h1>

        <br /><br />

         <form action="">

            <label htmlFor=""> Shark Name:- 
              <input type="text" onChange={handelSharkName} placeholder='Shark Name' />
            </label>
            <br /> <br />

            <label htmlFor=""> Shark Description:- 
              <textarea type="text" onChange={handelSharkDesc} placeholder='Shark Description' />
            </label>
            <br /> <br />

            <br /> <br />

            <label htmlFor=""> Shark Address :- 
              <input type="text" onChange={handelSharkAddress} placeholder='Enter Shark Adderss' />
            </label>
            <br /> <br />

        </form>

          <label  htmlFor=""> Upload Banner Img
              <input type="file" id='ChooseBannerImg' onChange={handleFileUpload}/>
          </label>

          {/* <button onClick={uploadDetailsToIPFS}>Upload data</button> */}
          <br /> <br />
          <button onClick={submitSharkFun}>Submit Shark</button>

          {/* <button onClick={createSharkFun}>createSharkFun</button> */}

          <br /><br />

    </div>
  )
}
}

export default OnBoardSharks