// SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

contract dSharkTank is Ownable {

    struct currentProjects {
        uint projectId;
        string projectDetails;
        uint date; // date will be choosen by the project, date shoul not be more than 2 weeks from the submission.
        uint publicVotes;
        uint sharkVotes;
        address _user;
    }

    struct sharks {
        uint sharkId;
        string sharkDetails;
        address _sharkAddress;
    }
    
    uint public listedProjects;
    uint public totalSharks;
    
    mapping (uint => currentProjects) public currentProjectMapping;
    mapping (address => bool) public isProjectRegisterByUser;
    mapping (address =>  mapping(uint => bool) ) public isVoted; // Mapping will keep track for the user that is voted or not

    mapping (address => uint) public sharkVotes;
    mapping (uint => sharks) public sharkMapping;
    mapping (address => bool) public isShark;
    mapping (address => mapping( uint => bool)) public  isSharkVoted;


    modifier onlySharks() {
        require(isShark[msg.sender] == true , "You are not a shark!");
        _;
    }

    function submitProject(string memory _projDetails, uint _date ) public {

        require(isProjectRegisterByUser[msg.sender] == false, "User can submit only one project");
        require(_date <= block.timestamp + 1209600, "Maximum allowed duration in 2 Weeks!");
        isProjectRegisterByUser[msg.sender] = true;
        currentProjectMapping[listedProjects + 1] =  currentProjects(listedProjects + 1, _projDetails, 0, 0, _date, msg.sender);
        listedProjects += 1;
    }

    function voteProject(uint _projectId) public {
        // Not on priority // deadline must match.

        require(isVoted[msg.sender][_projectId] == false, "You already vodetd!"); // One vote per user per project
        isVoted[msg.sender][_projectId] = true;
        currentProjectMapping[_projectId].publicVotes += 1;

    }

    function sharkVoting(uint _projectId) public onlySharks{

        require(isProjectEligibalForPitch(_projectId) == true, "Unable to vote");
        require(isSharkVoted[msg.sender][_projectId] == false, "You can only vote once!");
        isSharkVoted[msg.sender][_projectId] == true;
        currentProjectMapping[_projectId].sharkVotes += 1;
    }

    function isProjectEligibalForPitch (uint _projectId) public view returns(bool) {

        require(currentProjectMapping[_projectId].date <=  1209600, "Allowed duration is ended!");
        require(currentProjectMapping[_projectId].publicVotes >= 10, "Atleast 10 votes are required!");
        return true;

    }

    function onboardShark(string memory _sharkDetails, address _sharkAddress) public onlyOwner {

        sharkMapping[totalSharks + 1] = sharks(totalSharks + 1, _sharkDetails, _sharkAddress);
        totalSharks+= 1;
        isShark[_sharkAddress] = true;

    }

    // Will remove the unwanted projects.
    function removeProjects(uint _projectId) public onlyOwner {
        currentProjectMapping[_projectId] = currentProjects(0,"", 0, 0, 0, address(0));
    }

    // This function will be based on public voting
    function removeShark(address _address) public onlyOwner {
        isShark[_address] = false;
    }

    // By the users
    // Public bests shark
    function sharkRating(address _sharkAddress) public {

    }

    function startPitch() public {

    }
 
    //Done  // Create Projects
    //          Name, Desc, Date for Pitch, Rating By Sharks
    //Done  // Upvote the project
    //Done    // Onboard As Shark (onlyOwner)
        //      Name, desc, Experiance, PublicLikeing
    // Vote Shark


    //Done  // Only upvoted projects will be able to pitch on the every weekEnd

    // Projects of the week
    // Comment on project, upcomming feature.

    // deleted projected will be assign project Id 0, and project Id 0 will not be calculated anywhere. 
    // Also deleted project still be there in count of total project.


/*
    Create a project
    apply for a pitch
    pitch with the VCs

    Explore the projects
    Vote the projects

    Attend the pitch
    Vote the project by VCs

*/ 
}