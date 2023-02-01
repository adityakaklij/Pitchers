import React from "react";
import "../CSS/Home.css";

function Home() {
  return (
    <>
      <div className="mainContainer">
        <div className="leftSubpart">
          <div className="headLine">Build Your Dreams..! </div>
          <p>
            This is a Decentralized Shark Tank where anyone can pitch their idea
          </p>
          <div className="description">
            <span>Get an Opportunity to pitch your idea to the world..</span> 
            <br/>
            
            {/* <span>Think you have the best Idea? Let the peaople decide..</span> */}


            <span> Pitch your idea to the world! 
            Let the people decide which is the best idea that can change the world.</span>
          </div>
        </div>
        <div className="rightSubpart">
        <div className="headLine">Get Started</div>
        <div className="description"> Have something to show? <br /> Well don't wait.. Get your project listed on <br /> <strong>Pitchers!</strong> </div>
        <a className="listButton" href="#/SubmitProject">List Your Project</a>
        </div>
      </div>
    </>
  );
}

export default Home;
