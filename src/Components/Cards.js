import { ethers } from 'ethers';
import React, { useState } from 'react'
import { contractABI, contractAddress } from '../Constants/Constants';

function Cards({Name, Desc, Date, Img, projectId, projectVotes}) {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();


    const voteProjectFun = async() => {
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      // console.log("projectId", projectId)

      try {
        
        const voteProjectTx = await contractInstance.voteProject(projectId)
        await voteProjectTx.wait();
        window.alert("Successfully Voted")
      } catch (error) {
          window.alert(error)
      }
    }
  return (
    <>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={Img} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{Name}</h5>
            <p className="card-text">{Desc}</p>
            <p>{Date}</p>
            <p>{`Votes:- ${projectVotes}`}</p>
            <button onClick={voteProjectFun} className="btn btn-primary">Vote Project</button>
          </div>
        </div>
    
    </>
  )
}

export default Cards