import { ethers } from "ethers";
import React, { useState } from "react";
import { contractABI, contractAddress } from "../Constants/Constants";
import * as PushAPI from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/uiweb";
import '../App.css'



function Cards({ Name, Desc, Date, Img, projectId, projectVotes, _user, _userAddress }) {
  const [chatBtn, setChatBtn] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const voteProjectFun = async () => {
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    // console.log("projectId", projectId)

    try {
      const voteProjectTx = await contractInstance.voteProject(projectId);
      await voteProjectTx.wait();
      window.alert("Successfully Voted");
    } catch (error) {
      window.alert(error);
    }
  };

  return chatBtn?((
    <>
      <div className="card" style={{ width: "20rem" }}>
        <img className="card-img-top" src={Img} style={{ width: "20rem" }} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <p className="card-text">{Desc}</p>
          <p>{Date}</p>
          <p>{`Votes:- ${projectVotes}`}</p>
          <button onClick={voteProjectFun} className=" btn-primary">
            Vote Project
          </button>
          <button  className="btn-primary">
            Chat
          </button>

        </div>
      </div>

    <div className="chatWindow">
      <Chat
        // account={account} //user address
        // account= "0x88Ab2b62ccBD5170AA4D7266C0D5d7D002689fEf" //user address
        account= {_userAddress} //user address
        supportAddress={_user} //support address
        // supportAddress=  "0x88Ab2b62ccBD5170AA4D7266C0D5d7D002689fEf" //support address
        apiKey="vzOQa8Hda3.lD6Yvrij1T4qHrE07Mp7XcE3mRWu8Yl6WAmOzLSfI63xWuGSoNkXsHeBDVvG63Hs"
        env="staging" 
      />
   </div>
    </>
  )):(<>
           <div className="card my-4" style={{ width: "20rem" }}>
        <img className="card-img-top" src={Img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <p className="card-text">{Desc}</p>
          <p>{Date}</p>
          <p>{`Votes:- ${projectVotes}`}</p>
          <button onClick={voteProjectFun} className=" btn-primary">
            Vote Project
          </button>
          <button onClick={()=>setChatBtn(true)} className=" btn-primary">
            Chat
          </button>

        </div>
        
        
      </div>
 
  </>);
 
}

export default Cards;