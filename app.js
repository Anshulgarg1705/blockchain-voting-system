// ====== CONFIG ======
const contractAddress = "0x0d892144dea0e8f013e5aa6c08a37701ab0258b6";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "CandidateDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deleteCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveCandidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winnerId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "winnerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// ====== GLOBALS ======
let web3;
let contract;
let accounts;
let adminAddress;

// DOM
const connectWalletBtn = document.getElementById("connectWallet");
const walletAddressP = document.getElementById("walletAddress");
const statusDiv = document.getElementById("status");
const addCandidateBtn = document.getElementById("addCandidateBtn");
const candidateNameInput = document.getElementById("candidateName");
const candidatesListDiv = document.getElementById("candidatesList");
const voteBtn = document.getElementById("voteBtn");
const voteCandidateIdInput = document.getElementById("voteCandidateId");

// NEW DOM
const deleteCandidateBtn = document.getElementById("deleteCandidateBtn");
const deleteCandidateIdInput = document.getElementById("deleteCandidateId");
const getWinnerBtn = document.getElementById("getWinnerBtn");
const winnerResult = document.getElementById("winnerResult");

// ====== CONNECT WALLET ======
connectWalletBtn.onclick = async () => {
    if(window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        accounts = await web3.eth.getAccounts();

        walletAddressP.innerText = `Connected: ${accounts[0]}`;

        contract = new web3.eth.Contract(abi, contractAddress);

        adminAddress = await contract.methods.admin().call();

        // Hide admin panel if not admin
        if(accounts[0].toLowerCase() !== adminAddress.toLowerCase()){
            document.getElementById("adminSection").style.display = "none";
        }

        loadCandidates();
    } else {
        alert("MetaMask not found");
    }
};

// ====== LOAD CANDIDATES ======
async function loadCandidates() {
    candidatesListDiv.innerHTML = "";

    const count = await contract.methods.candidatesCount().call();

    for(let i = 1; i <= count; i++){
        const candidate = await contract.methods.getCandidate(i).call();

        const id = candidate[0];
        const name = candidate[1];
        const votes = candidate[2];
        const isActive = candidate[3];

        // ❗ Skip deleted candidates
        if(!isActive) continue;

        const card = document.createElement("div");
        card.className = "candidateCard";

        card.innerHTML = `
            <strong>ID:</strong> ${id} <br>
            <strong>Name:</strong> ${name} <br>
            <strong>Votes:</strong> ${votes}
        `;

        candidatesListDiv.appendChild(card);
    }
}

// ====== ADD CANDIDATE ======
addCandidateBtn.onclick = async () => {
    const name = candidateNameInput.value.trim();
    if(!name) return alert("Enter candidate name");

    try {
        await contract.methods.addCandidate(name).send({from: accounts[0]});
        statusDiv.innerText = `Candidate "${name}" added`;
        candidateNameInput.value = "";
        loadCandidates();
    } catch(err) {
        console.error(err);
        alert("Error adding candidate");
    }
};

// ====== DELETE CANDIDATE ======
deleteCandidateBtn.onclick = async () => {
    const id = deleteCandidateIdInput.value.trim();
    if(!id) return alert("Enter candidate ID");

    try {
        await contract.methods.deleteCandidate(id).send({from: accounts[0]});
        statusDiv.innerText = `Candidate ID ${id} deleted`;
        deleteCandidateIdInput.value = "";
        loadCandidates();
    } catch(err) {
        console.error(err);
        alert("Error deleting candidate");
    }
};

// ====== VOTE ======
voteBtn.onclick = async () => {
    const id = voteCandidateIdInput.value.trim();
    if(!id) return alert("Enter candidate ID");

    try {
        const alreadyVoted = await contract.methods.hasVoted(accounts[0]).call();
        if(alreadyVoted){
            return alert("You already voted!");
        }

        await contract.methods.vote(id).send({from: accounts[0]});
        statusDiv.innerText = `Vote casted for ID ${id}`;
        voteCandidateIdInput.value = "";
        loadCandidates();
    } catch(err) {
        console.error(err);
        alert("Voting failed");
    }
};

// ====== GET WINNER ======
getWinnerBtn.onclick = async () => {
    try {
        const winner = await contract.methods.getWinner().call();

        winnerResult.innerText = `
            Winner: ${winner[1]} 
            (ID: ${winner[0]}, Votes: ${winner[2]})
        `;
    } catch(err) {
        console.error(err);
        alert("Error fetching winner");
    }
};

// ====== ACCOUNT CHANGE ======
if(window.ethereum){
    window.ethereum.on('accountsChanged', function(acc){
        walletAddressP.innerText = `Connected: ${acc[0]}`;
        location.reload();
    });
}