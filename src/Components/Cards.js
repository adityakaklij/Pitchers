import React, { useState } from 'react'

function Cards({Name, Desc, Date, Img}) {

    const voteProjectFun = async() => {
      console.log("Btn 1 is clicked")
    }
  return (
    <>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={Img} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{Name}</h5>
            <p className="card-text">{Desc}</p>
            <p>{Date}</p>
            {/* <a href="#" className="btn btn-primary">Vote Project</a> */}
            <button onClick={voteProjectFun} className="btn btn-primary">Vote Project</button>
          </div>
        </div>
    
    </>
  )
}

export default Cards