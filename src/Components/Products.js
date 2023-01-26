import { ethers } from 'ethers';
import React from 'react'
import { contractABI, contractAddress } from '../Constants/Constants';

function Products() {
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();


  const getListedProjects = async() => {

    const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
    const totalProjects = await contractInstance.listedProjects();

    for(let i = 1; i <= totalProjects.toString(); i ++){
      let projects = await contractInstance.currentProjectMapping(i)
      console.log(projects[0].toString());// Project Id
      console.log(projects[1].toString());// Project Details
      console.log(projects[2].toString());// Project Date
      console.log(projects[3].toString());// Public Vote
      console.log(projects[4].toString());// Shark Vote
      console.log(projects[5].toString());// User Address

      
      let ipfsLink = (projects[1].toString()).split("/")  ;// Project Details
      let ipfsCID = ipfsLink[2]

      const projectDesc = await fetch(`https://${ipfsCID}.ipfs.dweb.link/metadata.json`).then(response => response.json());

      // Returns data from the link.
      console.log("Name:- ", projectDesc["name"])
      console.log("Description:- ", projectDesc["description"])
      console.log("ProjectEndDate:- ", projectDesc["ProjectEndDate"])
      console.log("Image Url:- ", projectDesc["image"])
    }
    
  }

  return (
    <div>
        <h1>Listed projects</h1>

        <br /><br />

        <button onClick={getListedProjects}>Get Listed Projects</button>
    </div>
  )
}

export default Products