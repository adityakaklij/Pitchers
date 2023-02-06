import React, { useState } from 'react'
import '../App.css'

function SharkCards({Name, Desc, Img,Address}) {

  return (
 
    <>
        <div className="card my-4" style={{width: "18rem"}}>
 
          <img className="card-img-top" src={Img} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{Name}</h5>
            <p className="card-text">{Desc}</p>
            <p>{Address}</p>
           
          </div>
        </div>
    
    </>
  )
}

export default SharkCards