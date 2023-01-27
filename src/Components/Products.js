import { ethers } from 'ethers';
import React, { useState } from 'react'
import { contractABI, contractAddress } from '../Constants/Constants';
import Cards from './Cards';

function Products() {
  
  const [imgTest, setImgTest] = useState("https://bafybeifwmvex2sqtjej66g7nsgaoiqjeixeaklkahfqeun354dnhbibgea/testProject.jpeg")

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const [details, setDetails] = useState([]);
  // Will containg all the available products, fetched from SC
  let dataArray = [];

  const getListedProjects = async() => {


    const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
    const totalProjects = await contractInstance.listedProjects();

    for(let i = 1; i <= totalProjects.toString(); i ++){
      let projects = await contractInstance.currentProjectMapping(i)

      // console.log(projects[0].toString());// Project Id
      // console.log(projects[1].toString());// Project Details
      // console.log(projects[2].toString());// Project Date
      // console.log(projects[3].toString());// Public Vote
      // console.log(projects[4].toString());// Shark Vote
      // console.log(projects[5].toString());// User Address

      
      let ipfsLink = (projects[1].toString()).split("/")  ;// Project Details
      let ipfsCID = ipfsLink[2]

      const projectDesc = await fetch(`https://${ipfsCID}.ipfs.dweb.link/metadata.json`).then(response => response.json());

      // Returns data from the link.
      console.log("Name:- ", projectDesc["name"])
      console.log("Description:- ", projectDesc["description"])
      console.log("ProjectEndDate:- ", projectDesc["ProjectEndDate"])
      console.log("Image Url:- ", projectDesc["image"])
      
      dataArray.push([projectDesc["name"], projectDesc["description"],projectDesc["ProjectEndDate"],projectDesc["image"] ])


      
      // Image Handling, not working.
      // let testImgURL = (projectDesc["image"].toString()).split("/");
      // let imgIPFSCID = testImgURL[2,testImgURL.length]
      // // let imgURL = await fetch(`https://${imgIPFSCID}.ipfs.dweb.link/metadata.json`).then(response => response.json());
      // let imgUrl = await (`https://${imgIPFSCID}.ipfs.dweb.link/metadata.json`);
      // // setImgTest(imgUrl);
      // setImgTest(`https://${imgIPFSCID}`);
      // // console.log("testImgURL", imgIPFSCID) // printing CID hash of IPFS Image
      // console.log("imgURL", imgTest)
    }

    setDetails(dataArray);
    console.log("dataArray:- ", dataArray)
    console.log("setDetails", details)
    
  }

  const getValidURL = async(ipfsFromSC) => {
    // let ipfsLink = 
  }

  const voteProjectFun = async(project_Id) => {
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    const voteTx = await contractInstance.voteProject(project_Id);
    await voteTx.wait();
    window.alert("Projected Voted successfully!")
  }

  return (
    <div>
        <h1>Listed projects</h1>

        <br /><br />
        
        {details.map(details => (

        // <Cards Name = {"Adi"} Desc = {"This is the Description"} Date = {"somethin"} Img = {"Img_link"} />
        // <Cards Name = {details[0]} Desc = {details[1]} Date = {details[2]} Img = {details[3]} />
        <Cards Name = {details[0]} Desc = {details[1]} Date = {details[2]} Img = {"https://bafybeihngwk3dggkoqmxcjlpoqabmli6sofx6f2iv6hnd5y4s4hzn4xtje.ipfs.dweb.link/The-Web3-Project-Makes-A-Move-Into-The-Metaverse.jpg"} />
        ))}
        
        {/* <br /><br /> */}
        <hr />

        <button onClick={getListedProjects}>Get Listed Projects</button>
    </div>
  )
}

export default Products