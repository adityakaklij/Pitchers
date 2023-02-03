import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../Constants/Constants'
import Cards from './Cards'
import SharkCards from './SharkCards';
import '../App.css'
import "../CSS/Products.css"

function AboutShark() {


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const [details, setDetails] = useState([]);
    // Will containg all the available Sharks, fetched from SC
    let dataArray = [];

    useEffect(() => {
      getSharkDetails()
    },[])

    const getSharkDetails = async() => {
      console.log("Inside the fun")
        const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
        const totalSharks = await contractInstance.totalSharks();

        for(let i = 1; i <= totalSharks.toString(); i ++){
            let projects = await contractInstance.sharkMapping(i)
      
            console.log(projects[0].toString());// Shark Id
            console.log(projects[1].toString());// Shark Details
            console.log(projects[2].toString());// Shark Address
            
            
            let ipfsLink = (projects[1].toString()).split("/")  ;// Project Details
            let ipfsCID = ipfsLink[2]
      
            const projectDesc = await fetch(`https://${ipfsCID}.ipfs.dweb.link/metadata.json`).then(response => response.json());
      
            // // Returns data from the link.
            console.log("Name:- ", projectDesc["name"])
            console.log("Description:- ", projectDesc["description"])
            console.log("Image Url:- ", projectDesc["image"])
            
            
            let testImgURL = (projectDesc["image"].toString()).split(":");
            let testImgURL2 = (testImgURL.toString()).split("/");
            // console.log("testImgURL2",testImgURL2)
            let testImgURL3 = (testImgURL2[3]).trimStart()
            // console.log("testImgURL3",testImgURL3)

            // console.log("testImgURL",testImgURL)
            let sharkAddressIs = `${(projects[2].toString()).slice(0,3)}...${(projects[2].toString()).slice(-3)}`
            dataArray.push([projectDesc["name"], projectDesc["description"],`https://ipfs.io/ipfs/${testImgURL2[2]}/${testImgURL3}`,sharkAddressIs])
      
          }
      
          setDetails(dataArray);
          console.log("dataArray:- ", dataArray)
          console.log("setDetails", details)
          
        
    }


  return (
    <>
      <div className="my-5 alignCards" >

        
        {/* <h1>About Sharks</h1> */}
        {details.map(details => (
          <SharkCards Name = {details[0]} Desc = {details[1]}  Img = {details[2]} Address = {details[3]} />
          ))}
          </div>
        {/* <button onClick={getSharkDetails} className="btn btn-primary">getSharkDetails</button> */}
    </>
  )
}

// Vote for sharks will be here
export default AboutShark