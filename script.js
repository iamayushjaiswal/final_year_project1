const contractAddress = '0x9E0b2d2eFa9bE9DC7c95DA4669a15fF74d5Bae3a';
const abi = [ [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
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
				"internalType": "string",
				"name": "party",
				"type": "string"
			}
		],
		"name": "getVotes",
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
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "votes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ];

document.getElementById('vote-button').addEventListener('click', async () => {
  const party = document.getElementById('party-input').value;
  if (!party) return alert('Please enter a party name!');

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.vote(party);
    await tx.wait();

    const voteCount = await contract.getVotes(party);
    alert(`Votes for ${party}: ${voteCount}`);
  } catch (error) {
    console.error('Error voting:', error);
  }
});


contract.on('VoteCast', (party, votes) => {
    console.log(`New vote for ${party}: ${votes}`);
    // Update the UI with new vote counts
  });
  