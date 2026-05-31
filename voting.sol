// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    address public admin;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        bool isActive;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint public candidatesCount;

    // EVENTS
    event Voted(address voter, uint candidateId);
    event CandidateAdded(uint id, string name);
    event CandidateDeleted(uint id);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    // ✅ Add Candidate
    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0,
            true
        );

        emit CandidateAdded(candidatesCount, _name);
    }

    // ✅ Vote
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You already voted!");
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate"
        );
        require(candidates[_candidateId].isActive, "Candidate not active");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    // ✅ Soft Delete Candidate
    function deleteCandidate(uint _id) public onlyAdmin {
        require(_id > 0 && _id <= candidatesCount, "Invalid candidate");
        require(candidates[_id].isActive, "Already deleted");

        candidates[_id].isActive = false;

        emit CandidateDeleted(_id);
    }

    // ✅ Check if user voted
    function hasVoted(address _user) public view returns (bool) {
        return voters[_user];
    }

    // ✅ Get Candidate Details
    function getCandidate(uint _id)
        public
        view
        returns (uint, string memory, uint, bool)
    {
        Candidate memory c = candidates[_id];
        return (c.id, c.name, c.voteCount, c.isActive);
    }

    // ✅ Get total active candidates (optional helper)
    function getActiveCandidatesCount() public view returns (uint count) {
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].isActive) {
                count++;
            }
        }
    }

    // ✅ Get Winner (basic logic)
    function getWinner()
        public
        view
        returns (uint winnerId, string memory winnerName, uint voteCount)
    {
        uint maxVotes = 0;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (
                candidates[i].isActive &&
                candidates[i].voteCount > maxVotes
            ) {
                maxVotes = candidates[i].voteCount;
                winnerId = candidates[i].id;
                winnerName = candidates[i].name;
                voteCount = candidates[i].voteCount;
            }
        }
    }
}