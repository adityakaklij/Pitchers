import { ethers } from 'ethers'
import React, { useState } from 'react'
import { NFTStorage } from 'nft.storage'
import { contractABI, contractAddress } from '../Constants/Constants'


function SubmitProject() {

  const [uploadFile, setUploadFile] = useState()
  const [metaDataURL, setMetaDataURl] = useState()

  // For taking inputs
  const [ProjectName, setProjectName] = useState()
  const [ProjectDesc, setProjectDesc] = useState()
  const [ProjectDate, setProjectDate] = useState()
  // const [ProjectPrizePool, setProjectPrizePool] = useState()

  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const submitProjectFun = async() => {
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    await uploadDetailsToIPFS();
    
    const submitProjectTx = await contractInstance.submitProject(metaDataURL, ProjectDate)
    await submitProjectTx.wait()
    window.alert("Project submitted successfully!")

  }
  
  const uploadDetailsToIPFS = async (inputFile) => { // uploadFile should be passed here.
    const nftStorage = new NFTStorage({token: API_KEY,})

    try {
        const metaData = await nftStorage.store({
            name:ProjectName,
            description: ProjectDesc,
            ProjectEndDate: ProjectDate, // In unix
            image: uploadFile // Banner image for the Project

        });

        // setMetaDataURl(getIPFSGatewayURL(metaData.url));
        setMetaDataURl(metaData.url);
        console.log("metadata:- ",metaData)
        return metaData
    } catch (error) {
        alert(error)
    }
  }

  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  }
  
  // Helper functions
  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const handelProjectName = async (e) => {
    setProjectName(e.target.value)
    console.log(e.target.value)
  }

  const handelProjectDesc = async (e) => {
    setProjectDesc(e.target.value);
    console.log(e.target.value)
  }
  const handelProjectDate = async (e) => {
    console.log(e.target.value)
    const epochDate = Date.parse(e.target.value)// Converting normal date into epoch/ unix formate
    setProjectDate(epochDate);
    console.log(epochDate);
    
  }
  // const handelProjectPrizePool = async (e) => {
  //   setProjectPrizePool(e.target.value);
  //   console.log(e.target.value)
  // }
  return (
    <div>
        <h1>Submit projects</h1>

        <br /><br />

         <form action="">

            <label htmlFor=""> Project Name:- 
              <input type="text" onChange={handelProjectName} placeholder='Project Name' />
            </label>
            <br /> <br />

            <label htmlFor=""> Project Description:- 
              <textarea type="text" onChange={handelProjectDesc} placeholder='Project Description' />
            </label>
            <br /> <br />

            <br /> <br />

            <label htmlFor=""> End date :- 
              <input type="date" onChange={handelProjectDate} placeholder='End Date' />
            </label>
            <br /> <br />

        </form>

          <label  htmlFor=""> Upload Banner Img
              <input type="file" id='ChooseBannerImg' onChange={handleFileUpload}/>
          </label>

          {/* <button onClick={uploadDetailsToIPFS}>Upload data</button> */}
          <button onClick={submitProjectFun}>Submit project</button>

          {/* <button onClick={createProjectFun}>createProjectFun</button> */}

          <br /><br />

          {/* <button onClick={getDataTestFun}>getDataTestFun</button> */}
    </div>
  )
}

export default SubmitProject