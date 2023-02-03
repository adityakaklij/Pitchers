import React, { useState , useEffect} from 'react'
import { ethers } from 'ethers';
import "../App.css"
import '../CSS/Navbar.css'


export default function Navbar() {

    const [connectIs, setConnectIs] = useState("Connect")

    useEffect(() => {
    //   Connect()
    })
    
    async function Connect() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        // setMainAddress(myAddress)
        setConnectIs("Connected")
    }
    
  return (

    <div>

        <nav className="navbar navbar-expand-lg  ">
            <span className="logo">Pitcher</span>
            <div className="container-fluid">


                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/#/">Home</a>    
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#/Products">Projects</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#/SubmitProject">SubmitProject</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#/Pitches">Pitches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/AboutShark">AboutShark</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#/OnBoardSharks">OnBoardSharks</a>
                    </li>

                    {/* <li className="nav-item">
                        <a className="nav-link" href="#/PushChatTest">PushChatTest</a>
                    </li> */}

                </ul>

                        
                </div>
            </div>
        </nav>  
    </div>
  )
}