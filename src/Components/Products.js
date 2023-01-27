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
      
      var date = new Date(projectDesc["ProjectEndDate"] * 1000);
      console.log("date:- ", date.toLocaleDateString("default"))
      let testImgURL = (projectDesc["image"].toString()).split("//");
                                                                                                                                               // Project ID               Project Votes
      dataArray.push([projectDesc["name"], projectDesc["description"], date.toLocaleDateString("default"),`https://ipfs.io/ipfs/${testImgURL[1]}`,projects[0].toString() , projects[3].toString()])

    }

    setDetails(dataArray);
    console.log("dataArray:- ", dataArray)
    console.log("setDetails", details)
    
  }

  return (
    <div>
        <h1>Listed projects</h1>

        <br /><br />
        
        {details.map(details => (


        <Cards Name = {details[0]} Desc = {details[1]} Date = {details[2]} Img = {details[3]} projectId = {details[4]} projectVotes = {details[5]} />
        // <Cards Name = {details[0]} Desc = {details[1]} Date = {details[2]} Img = {"https://bafybeihngwk3dggkoqmxcjlpoqabmli6sofx6f2iv6hnd5y4s4hzn4xtje.ipfs.dweb.link/The-Web3-Project-Makes-A-Move-Into-The-Metaverse.jpg"} />
        ))}
        <hr/>
        
        {/* <br /><br /> */}
        <hr />

        <button onClick={getListedProjects}>Get Listed Projects</button>
    </div>
  )
}

export default Products