import { ethers } from "ethers";
import React, { useState,useRef } from "react";
import { NFTStorage } from "nft.storage";
import { contractABI, contractAddress } from "../Constants/Constants";
import "../CSS/SubmitProject.css";
import '../App.css'
import * as PushAPI from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/uiweb";
function SubmitProject() {
  var uploadFile;
 
  const [metaDataURL, setMetaDataURl] = useState();
 

  // For taking inputs
  var ProjectName; 
  var ProjectDesc;
  var ProjectDate;
  // const [ProjectPrizePool, setProjectPrizePool] = useState()

  const projectNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const displayImageRef = useRef(null);
  const projectEndDateRef = useRef(null);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const submitProjectFun = async() => {

    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    
 
     await uploadDetailsToIPFS();
    // const submitProjectTx = await contractInstance.submitProject(metaDataURL, String(ProjectDate))
    const submitProjectTx = await contractInstance.submitProject(metaDataURL, "1676529381")
    // const submitProjectTx = await contractInstance.submitProject("ipfs://bafyreid6znnfuubpgma6kk4t2pke4ajr435kw2o45inrd3o2yzd4zfpumi/metadata.json", '16754170445464561')
    // const submitProjectTx = await contractInstance.submitProject(metaDataURL, "1486612932" )
    
    // const submitProjectTx = await contractInstance.submitProject("metaDataURL", 0)
    console.log("here");
 
    await submitProjectTx.wait();
    window.alert("Project submitted successfully!");
  };

  const uploadDetailsToIPFS = async (inputFile) => {
    // uploadFile should be passed here.
    const nftStorage = new NFTStorage({ token: API_KEY });

    try {
      const metaData = await nftStorage.store({
        name: ProjectName,
        description: ProjectDesc,
        ProjectEndDate: ProjectDate, // In unix
        image: uploadFile, // Banner image for the Project
      });

      // setMetaDataURl(getIPFSGatewayURL(metaData.url));
      MetaDataURL = metaData.url;
      console.log(metaData.url);
      console.log(metaData);
      return metaData;
    } catch (error) {
      alert(error);
    }
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };
  // function getDataTestFun() {
  //   console.log("metaDataURL:- ",metaDataURL)
  // }
  // Helper functions
  // const handleFileUpload = async (event) => {
  //   event.preventDefault();
  //   setUploadFile(event.target.files[0]);
  // };

  // const handelProjectName = async (e) => {
  //   setProjectName(e.target.value);
  //   console.log(e.target.value);
  // };

  // const handelProjectDesc = async (e) => {
  //   setProjectDesc(e.target.value);
  //   console.log(e.target.value);
  // };
  // const handelProjectDate = async (e) => {
  //   console.log(e.target.value);
  //   const epochDate = Date.parse(e.target.value); // Converting normal date into epoch/ unix formate
  //   setProjectDate(epochDate);
  //   console.log(epochDate);
  // };

  const handleSubmit = async() => {
    ProjectName =  projectNameRef.current.value;
    ProjectDesc = descriptionRef.current.value;
    uploadFile = displayImageRef.current.files[0];
 
    const epochDate = Date.parse(projectEndDateRef.current.value);
    ProjectDate = epochDate;

 
    await submitProjectFun();
  }
  // const handelProjectPrizePool = async (e) => {
  //   setProjectPrizePool(e.target.value);
  //   console.log(e.target.value)
  // }
  return (
    <div className="bodyDiv">
      {/* <label htmlFor=""> Project Name:- 
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
            <br /> <br /> */}
      {/* <form>
          <div className="formAligner">
          <span>Project Name</span>
          <div className="aligner">
            <input
              type="text"
              onChange={handelProjectName}
              placeholder="Project Name"
            />
          </div>
          <span>Project Description</span>
          <div className="aligner">
            <textarea
              onChange={handelProjectDesc}
              placeholder="Project Description"
            />
          </div>
          <span>Date</span>
          <div className="aligner">
            <input
              type="date"
              onChange={handelProjectDate}
              placeholder="End Date"
            />
          </div>
          </div>
        </form>
        */}

      <form className="decor">
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          <h1>Submit you project</h1>
          <input type="text" placeholder="Project Name" ref={projectNameRef}/>
          <textarea placeholder="Project Description" rows="5" ref = {descriptionRef}></textarea>
        
          <label className="custom-file-upload">
            <input type="file" ref = {displayImageRef}/>
            Click to add Display Image
          </label>
          <label className="custom-date">
            <input type="date" ref = {projectEndDateRef} />
             Select project end date
          </label>
          <button type="submit" href="/" onClick={handleSubmit}>
            Submit
          </button>
          {/* <button  onClick={submitProjectFun}>
          submitProjectFun
          </button> */}
        </div>
      </form>

       

      {/* <button onClick={uploadDetailsToIPFS}>Upload data</button> */}
      <br />
      <br />

      {/* <button className="btn btn-primary" onClick={}>
        Submit project
      </button> */}

      {/* <button onClick={createProjectFun}>createProjectFun</button> */}

      <br />
      <br />
     
    </div>
  );
}

export default SubmitProject;