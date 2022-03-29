var CONTRACT_ADDRESS = "0xaF67F73a5fB317c9C9ca9E5e934dE1cCa81c6687";
// var tokenAddr = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; // live busd
var tokenAddr = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; // test busd
var referrer = '0x290684f703b3e8555864035852a7D2Ee7e08FA30';
var upline = '0x290684f703b3e8555864035852a7D2Ee7e08FA30';

const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Approve'
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Invest'
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Stake'
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Unstake'
const SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Sell'
const CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Claim'
const CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Harvest'
const CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Claim'
const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Withdraw'

var ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimAirdrop",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimAirdropM",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimToken_M",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimToken_T",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "sellToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "referrer",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "stakeBUSD",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "stakeToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "txType",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "trxAmount",
				"type": "uint256"
			}
		],
		"name": "TokenOperation",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unStakeToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawRef",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "availableSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "BUSDAmount",
				"type": "uint256"
			}
		],
		"name": "BUSDToToken",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAPY_M",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAPY_T",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAvailableAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBUSDBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractLaunchTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractTokenBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentDay",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getCurrentUserBonAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeToNextDay",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenSoldToday",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserAirdropReqInv",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserBonAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserBUSDBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserBUSDStaked",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserCountAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserDownlineCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferralBonus",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferralTotalBonus",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferralWithdrawn",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserTimeToNextAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserTimeToUnstake",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserTokenBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserTokenStaked",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserUnclaimedTokens_M",
		"outputs": [
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUserUnclaimedTokens_T",
		"outputs": [
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "limitSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ownerManualAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ownerManualAirdropCheckpoint",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sentAirdrop",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "tokenToBUSD",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalBUSDStaked",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalTokenStaked",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalUsers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var tokenAbi = [
	{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
					{
							"name": "",
							"type": "string"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"constant": false,
			"inputs": [
					{
							"name": "_spender",
							"type": "address"
					},
					{
							"name": "_value",
							"type": "uint256"
					}
			],
			"name": "approve",
			"outputs": [
					{
							"name": "",
							"type": "bool"
					}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
	},
	{
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
					{
							"name": "",
							"type": "uint256"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"constant": false,
			"inputs": [
					{
							"name": "_from",
							"type": "address"
					},
					{
							"name": "_to",
							"type": "address"
					},
					{
							"name": "_value",
							"type": "uint256"
					}
			],
			"name": "transferFrom",
			"outputs": [
					{
							"name": "",
							"type": "bool"
					}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
	},
	{
			"constant": true,
			"inputs": [],
			"name": "decimals",
			"outputs": [
					{
							"name": "",
							"type": "uint8"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"constant": true,
			"inputs": [
					{
							"name": "_owner",
							"type": "address"
					}
			],
			"name": "balanceOf",
			"outputs": [
					{
							"name": "balance",
							"type": "uint256"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
					{
							"name": "",
							"type": "string"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"constant": false,
			"inputs": [
					{
							"name": "_to",
							"type": "address"
					},
					{
							"name": "_value",
							"type": "uint256"
					}
			],
			"name": "transfer",
			"outputs": [
					{
							"name": "",
							"type": "bool"
					}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
	},
	{
			"constant": true,
			"inputs": [
					{
							"name": "_owner",
							"type": "address"
					},
					{
							"name": "_spender",
							"type": "address"
					}
			],
			"name": "allowance",
			"outputs": [
					{
							"name": "",
							"type": "uint256"
					}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
	},
	{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
	},
	{
			"anonymous": false,
			"inputs": [
					{
							"indexed": true,
							"name": "owner",
							"type": "address"
					},
					{
							"indexed": true,
							"name": "spender",
							"type": "address"
					},
					{
							"indexed": false,
							"name": "value",
							"type": "uint256"
					}
			],
			"name": "Approval",
			"type": "event"
	},
	{
			"anonymous": false,
			"inputs": [
					{
							"indexed": true,
							"name": "from",
							"type": "address"
					},
					{
							"indexed": true,
							"name": "to",
							"type": "address"
					},
					{
							"indexed": false,
							"name": "value",
							"type": "uint256"
					}
			],
			"name": "Transfer",
			"type": "event"
	}
]

var tokenContract;

var currentAddr;
var contract = null;
var gasPrice = '10000000000'
var percent1,percent2,percent3,percent4,percent5,percent6;
var startD, startH, startM, startS;

var BUSDPrice = 0;
var TokenPrice = 0;
var userBUSDStaked = 0;
var userReqAirdropInv = 0;

window.addEventListener('load', Connect)

async function Connect() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
			await window.ethereum.request({ method: 'eth_requestAccounts' });
            let accounts = await web3.eth.getAccounts()
            currentAddr = accounts[0]
            runAPP()
            return
        } catch (error) {
            console.error(error)
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.ethereum)
        let accounts = await web3.eth.getAccounts()
        currentAddr = accounts[0]
        runAPP()
        return
    }
    setTimeout(checkForBinanceChain, 1500)
}

async function checkForBinanceChain() {
    try {
        await window.BinanceChain.enable()
        console.log(typeof(window.BinanceChain))
        if (window.BinanceChain) {
            console.log('BinanceChain')
            await BinanceChain.enable()
            window.web3 = new Web3(window.BinanceChain)
            let accounts = await web3.eth.getAccounts()
            currentAddr = accounts[0]
            console.log(contract)
            runAPP()
            return
        }
    } catch (e) {}
}

async function runAPP(){
    let networkID = await web3.eth.net.getId()
    if (networkID == 97) { // 56 - BSC Live. 97 -- BSC Test
		contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
		tokenContract = await new web3.eth.Contract(tokenAbi, tokenAddr)
        console.log(tokenContract)
	}
}

setInterval(() => {				
	if(contract){
		contract.methods.getContractLaunchTime().call().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)		
		})
		
		contract.methods.getTimeToNextDay().call().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)				
		
			$("#time-tonextday").html(`<span><b>${startD}D : ${startH}H : ${startM}M</b></span>`)	
		})	
		
		contract.methods.getUserTimeToUnstake(currentAddr).call().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)
			
			if (res == 0) {
				$("#time-tounstake").html(`<p><span>There is no minimum to stake</b></span></p>`)
			} else {
				$("#time-tounstake").html(`Unstake available in: ${startD}D : ${startH}H : ${startM}M`)													   
			}
		})	
		
		contract.methods.getUserTimeToNextAirdrop(currentAddr).call().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)				
			
			if (res == 0) {
				$("#airdrop-c-2").html(`7 days since the last claim<span><br>✅</span>`)
			} else {
				$("#airdrop-c-2").html(`7 days since the last claim<span><br>${startD}D : ${startH}H : ${startM}M❌</span>`)														   
			}
		})				
		
	} 
}, 3000);
	
setInterval(() => {
	if(contract){
		web3.eth.getAccounts().then(res=>{
			currentAddr = res[0]
		})

		var connectedAddr = currentAddr[0] + 
							currentAddr[1] + 
							currentAddr[2] + 
							currentAddr[3] + 
							currentAddr[4] + '...' +
							currentAddr[currentAddr.length-5] + 
							currentAddr[currentAddr.length-4] + 
							currentAddr[currentAddr.length-3] + 
							currentAddr[currentAddr.length-2] + 
							currentAddr[currentAddr.length-1]

		$("#connect-btn").text(connectedAddr)
		contract.methods.getTokenPrice().call().then(res=>{ 
			TokenPrice = (res/1e18).toFixed(6)
			$("#token-priceM").html(`<b>${TokenPrice}</b>`)
			$("#token-price").html(`<b>${TokenPrice}</b>`)
		})	
		
		contract.methods.totalSupply().call().then(res=>{
			$("#total-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)		
		})	
		
		contract.methods.limitSupply().call().then(res=>{
			$("#limit-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)			
		})	
		
		contract.methods.availableSupply().call().then(res=>{
			$("#available-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)				
		})	
		
		contract.methods.totalUsers().call().then(res=>{
			$("#total-users").text(res)			
		})	
		
		contract.methods.getAPY_M().call().then(res=>{                	
			$("#APY_M").html(`<span><b>${res}%</b></span>`)
		})	
		
		contract.methods.getAPY_T().call().then(res=>{                	
			$("#APY_T").html(`<span><b>${res}%</b></span>`)
		})				
		
		contract.methods.totalBUSDStaked().call().then(res=>{                	
			$("#total-BUSD-staked").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})	

		contract.methods.totalUsers().call().then(res=>{                	
			$("#totalUsers").html(`<h7><span><b>${(res)}</b></span></h7>`)
		})				
		
		contract.methods.totalTokenStaked().call().then(res=>{                	
			$("#total-token-staked").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})	
		
	
		// todo, change hardcoded address for variable
		//tokenContract.methods.balanceOf('0xab08906867fcA09e9E39819411Df1355C918Da05').call().then(res => {
		tokenContract.methods.balanceOf(CONTRACT_ADDRESS).call().then(res => {	
			$("#contract-BUSD-balance").text((res/1e18).toFixed(2))
		})

		tokenContract.methods.balanceOf(currentAddr).call().then(res => {
			$("#user-BUSD-balance-1").html(`<b>${(res/1e18).toFixed(4)}</b>`)

		})

		//contract.methods.getUserBUSDBalance(currentAddr).call().then(res=>{
		//    $("#user-BUSD-balance-1").text((res/1e18).toFixed(6))			
		//})			
		
		contract.methods.getContractTokenBalance().call().then(res=>{
			$("#contract-token-balance").text((res/1e18).toFixed(2))
		})
		
		contract.methods.getAvailableAirdrop().call().then(res=>{
			$("#available-airdrop").html(`<b>${(res/1e18).toFixed(0)}</b>`)
		})	
		
		contract.methods.getUserTokenBalance(currentAddr).call().then(res=>{
			$("#user-token-balance-1").html(`<b>${(res/1e18).toFixed(4)}</b>`)
			$("#user-token-balance-2").html(`<b>${(res/1e18).toFixed(4)}</b>`)
		})
		
		contract.methods.getUserBUSDStaked(currentAddr).call().then(res=>{	
			userBUSDStaked = (res/1e18).toFixed(2)
			// console.log(userBUSDStaked)
			$("#user-BUSD-staked").html(`<span><b><h7>${userBUSDStaked}</h7></b></span>`)
		})
		
		contract.methods.getUserAirdropReqInv(currentAddr).call().then(res=>{	
			userReqAirdropInv = (res/1e18).toFixed(2)
			//console.log(parseInt(userReqAirdropInv))
			//console.log(parseInt(userBUSDStaked))
			if ( parseInt(userReqAirdropInv) > parseInt(userBUSDStaked)) {
					///console.log("in here")
				$("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>❌</span>`)						
			} else {
					//console.log("in here too")
				$("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>✅</span>`)	
			}
		})				
		
		contract.methods.getUserBonAirdrop(currentAddr).call().then(res=>{                	
			if (res >= 5) {
				$("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})✅</span>`)	
			} else {
				$("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})❌</span>`)	
			}
		})			
		
		contract.methods.getUserTokenStaked(currentAddr).call().then(res=>{                	
			$("#user-token-staked").html(`<span><b>${(res/1e18).toFixed(2)} </b></span>`)
		})				
		
		contract.methods.getUserUnclaimedTokens_M(currentAddr).call().then(res=>{		
			$("#user-unClaimed-M").html(`<b>${(res/1e18).toFixed(4)} </b>`)
		})				
		
		contract.methods.getUserUnclaimedTokens_T(currentAddr).call().then(res=>{
			$("#user-unClaimed-T").html(`<b>${(res/1e18).toFixed(4)} </b>`)	
		})
		
		contract.methods.getTokenSoldToday().call().then(res=>{                	
			$("#total-sold-today").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})
		
		// put this back in as it was removed from the contract
		// contract.methods.getTokenAvailableToSell().call().then(res=>{                	
		// 	$("#available-to-sell").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		// })

		$("#ref-link").val('https://' + window.location.host  + '/?ref=' + currentAddr)

		contract.methods.getUserReferralBonus(currentAddr).call().then(res=>{
			$("#referral-available").text((res/1e18).toFixed(2))
		})           
		
		contract.methods.getUserReferralTotalBonus(currentAddr).call().then(res=>{
			$("#referral-earned").text((res/1e18).toFixed(2))
		})

		contract.methods.getUserReferralWithdrawn(currentAddr).call().then(res=>{
			$("#referral-withdrawn").text((res/1e18).toFixed(2))
		})

		contract.methods.getUserDownlineCount(currentAddr).call().then(res=>{                
			var sum = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2])                
			$("#total-referrals").text(sum.toFixed(0))
		}) 
	
	}
	
	// fetch('https://api.cryptonator.com/api/ticker/BUSD-usd').then(resp=>{
	// 	var response = resp.json().then(r=>{
	// 		var usd = r.ticker.price
	// 		BUSDPrice = r.ticker.price
	// 		$("#BUSD-price").text("$"+ parseFloat(usd).toFixed(3))
	// 	})
	// })
}, 3000);

function transactionObservableFactory (tx) {
    return new Observable(subscriber => {
        tx.wait().then(() => {
            subscriber.next()
            subscriber.complete()
        })
    })
}

function approveBUSD(trx) {
	const approveButton = $('#approveButton');
	var trxspenddoc = document.getElementById('input-approve')
	const buttonStateObserver = {
        next: () => approveButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => approveButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
	console.log("approve: " + web3.utils.toWei(trxspenddoc.value));
	approveButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
	tokenContract.methods.approve(CONTRACT_ADDRESS, web3.utils.toWei(trxspenddoc.value)).send({ from: currentAddr }).then(tx => {
		const transactionObservable = transactionObservableFactory(tx)
        transactionObservable.subscribe(buttonStateObserver)
	}).catch(() => approveButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
}

function spendLimit(callback) {
	tokenContract.methods.allowance(currentAddr,contract).call().then(result => {
		callback(web3.utils.fromWei(result));
	}).catch((err) => {
		console.log(err)
	});
}

function userBalance(callback){
	tokenContract.methods.balanceOf(currentAddr).call().then(result => {
				var amt = web3.utils.fromWei(result)
				// console.log("balance" + amt)
		callback(amt);
				usrBal=amt;
	}).catch((err) => {
		console.log(err)
	});
}
	
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
	const copiedSuccessfully = $('#copiedSuccessfully')
	copiedSuccessfully.show()
	setTimeout(function(){
		copiedSuccessfully.hide()
	},3000);
	// timer(5000).pipe().subscribe({
	// 	next: () => copiedSuccessfully.hide(),
	// 	complete: () => copiedSuccessfully.hide()
	// })
    $temp.remove();
}

function toHexString(number){return '0x'+number.toString(16)}


function SetMaxBUSD() {
	var inputF = document.getElementById("input-busd");
	tokenContract.methods.balanceOf(currentAddr).call().then(res => {
		inputF.value = web3.utils.fromWei(res);	
	})	
}

function SetMaxBUSD1() {
	var inputF = document.getElementById("input-approve");
	tokenContract.methods.balanceOf(currentAddr).call().then(res => {
		inputF.value = web3.utils.fromWei(res);	
	})	
}

function SetMaxBUSDToken() {
	var inputF = document.getElementById("input-2");
	contract.methods.getUserTokenBalance(currentAddr).call().then(res=>{
		
		amt = web3.utils.fromWei(res);	
		inputF.value = parseFloat(amt).toFixed(3) - 0.001;
	})	
}

function SetMaxBUSDTokenToSell() {
	var inputF = document.getElementById("input-3");
	contract.methods.getUserTokenBalance(currentAddr).call().then(res=>{
		
		amt = web3.utils.fromWei(res);	
		inputF.value = parseFloat(amt).toFixed(3) - 0.001;
	})	
}

function stakeM() {
	var today = new Date();
	var date = today.getUTCFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCDate();
	var time = today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
	var CurrentDateTime = date + ' ' + time;
	// console.log(CurrentDateTime);

	var busdlaunch = new Date("Sat Dec 18 2021 13:00:00 GMT-0000");
	var date = busdlaunch.getUTCFullYear() + '-' + (busdlaunch.getUTCMonth() + 1) + '-' + busdlaunch.getUTCDate();
	var time = busdlaunch.getUTCHours() + ":" + busdlaunch.getUTCMinutes() + ":" + busdlaunch.getUTCSeconds();
	var BUSDLaunchDateTime = date + ' ' + time;
	const investButton = $('#investButton');
	const buttonStateObserver = {
        next: () => investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
	// console.log(BUSDLaunchDateTime);

	if (CurrentDateTime > BUSDLaunchDateTime) {	// launched
		if (contract) {
			var trxspenddoc = document.getElementById('input-busd')
			console.log("stake busd: " + web3.utils.toWei(trxspenddoc.value))
			investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
			contract.methods.stakeBUSD(upline, web3.utils.toWei(trxspenddoc.value))
				.send({
					// value: amount,
					from: currentAddr,
					gasPrice: gasPrice,
				}).then(tx => {
					const transactionObservable = transactionObservableFactory(tx)
					transactionObservable.subscribe(buttonStateObserver)
				}).catch(() => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE))
		}
	} else {
		window.alert("Staking BUSD available from : Sat Dec 18 2021 13:00:00 GMT-0000");
	}
}

function stakeT(input) {
	const stakeButton = $('#stakeButton');
	const buttonStateObserver = {
        next: () => stakeButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => stakeButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
	if (contract) {
		var amount = toHexString($(input).val() * 1e18)
		console.log(amount)
		stakeButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
		contract.methods.stakeToken(amount).send({
			// value: 0,
			from: currentAddr,
			gasPrice: gasPrice,
		}).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => stakeButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
	}
}

function sell(input) {
	const sellButton = $('#sellButton');
	const buttonStateObserver = {
        next: () => sellButton.empty().append(SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => sellButton.text(SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
	if (contract) {
		var amount = toHexString($(input).val() * 1e18)
		console.log(amount)
		sellButton.empty().append(SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING);
		contract.methods.sellToken(amount).send({
			// value: 0,
			from: currentAddr,
			gasPrice: gasPrice,
		}).then(tx => {

		}).catch(() => sellButton.text(SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE))
	}
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var refurl = getUrlParameter('ref');

if(refurl){
    localStorage.setItem('ref', refurl);
}

upline = localStorage.getItem('ref') ?   localStorage.getItem('ref') : referrer;

$("#unstakeButton").click(()=>{
	const unstakeButton = $('#unstakeButton');
	const buttonStateObserver = {
        next: () => unstakeButton.empty().append(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => unstakeButton.text(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
    if(contract){
		unstakeButton.empty().append(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contract.methods.unStakeToken().send({
            value: 0,
            from: currentAddr,
            gasPrice: gasPrice,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => unstakeButton.text(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
    }
})

$("#claimMButton").click(()=>{
	const claimMButton = $('#claimMButton');
	const buttonStateObserver = {
        next: () => claimMButton.empty().append(CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => claimMButton.text(CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
    if(contract){
		claimMButton.empty().append(CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contract.methods.claimToken_M().send({
            value: 0,
            from: currentAddr,
            gasPrice: gasPrice,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => claimMButton.text(CLAIM_M_BUTTON_CONTENT_ON_TRANSACTION_DONE))
    }
})

$("#claimTButton").click(()=>{
	const claimTButton = $('#claimTButton');
	const buttonStateObserver = {
        next: () => claimTButton.empty().append(CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => claimTButton.text(CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
    if(contract){
		claimTButton.empty().append(CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contract.methods.claimToken_T().send({
            value: 0,
            from: currentAddr,
            gasPrice: gasPrice,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => claimTButton.text(CLAIM_T_BUTTON_CONTENT_ON_TRANSACTION_DONE))
    }
})

$("#claimAButton").click(()=>{
	const claimAButton = $('#claimAButton');
	const buttonStateObserver = {
        next: () => claimAButton.empty().append(CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => claimAButton.text(CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
    if(contract){
		claimAButton.empty().append(CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contract.methods.claimAirdrop().send({
            value: 0,
            from: currentAddr,
            gasPrice: gasPrice,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => claimAButton.text(CLAIM_A_BUTTON_CONTENT_ON_TRANSACTION_DONE))
    }
})

$("#withdraw-referral-btn").click(()=>{
	const withdrawReferralBtn = $('#withdraw-referral-btn');
	const buttonStateObserver = {
        next: () => withdrawReferralBtn.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => withdrawReferralBtn.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
    if(contract){
		withdrawReferralBtn.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contract.methods.withdrawRef().send({
            value: 0,
            from: currentAddr,
            gasPrice: gasPrice ,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => withdrawReferralBtn.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE))
    }
})

$("#input-3").on('input',()=>{
    var amount = $("#input-3").val();
	
    if(contract){
        var profit = (amount * TokenPrice)
		$("#sell-calc").html(`<b>${profit.toFixed(2)}</b>`)
    }
})
