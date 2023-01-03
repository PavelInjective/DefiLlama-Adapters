const { staking } = require('./helper/staking')

const wooPPConfig = {
	fantom: [
		'0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
		'0x74b23882a30290451A17c44f4F05243b6b58C76d', // ETH
		'0x321162Cd933E2Be498Cd2267a90534A804051b11', // BTC
		'0x6626c47c00F1D87902fc13EECfaC3ed06D5E8D8a', // WOO
		'0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
	],
	bsc: [
		'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
		'0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // ETH
		'0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // BTC
		'0x4691937a7508860F876c9c0a2a617E7d9E945D4B', // WOO
		'0x55d398326f99059fF775485246999027B3197955', // USDT
	],
	avax: [
		'0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // WAVAX
		'0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', // WETH.e
		'0x152b9d0FdC40C096757F570A51E494bd4b943E50', // BTC.b
		'0xaBC9547B534519fF73921b1FBA6E672b5f58D083', // WOO.e
		'0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC
	],
	polygon: [
		'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
		'0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
		'0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // WBTC
		'0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603', // WOO
		'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
	],
	arbitrum: [
		'0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
		'0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
		'0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b', // WOO
		'0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC
	],
	optimism: [
		'0x4200000000000000000000000000000000000006', // WETH
		'0x68f180fcCe6836688e9084f035309E29Bf0A2095', // WBTC
		'0x4200000000000000000000000000000000000042', // OP
		'0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC
	],
}

const chainConfig = {
	fantom: {
		wooPPContract: '0x9503E7517D3C5bc4f9E4A1c6AE4f8B33AC2546f2',
		woo: '0x6626c47c00f1d87902fc13eecfac3ed06d5e8d8a',
		stakingContract: '0x2Fe5E5D341cFFa606a5d9DA1B6B646a381B0f7ec',
	},
	bsc: {
		wooPPContract: '0xbf365Ce9cFcb2d5855521985E351bA3bcf77FD3F',
		woo: '0x4691937a7508860f876c9c0a2a617e7d9e945d4b',
		stakingContract: '0x2AEab1a338bCB1758f71BD5aF40637cEE2085076',
	},
	avax: {
		wooPPContract: '0x1df3009c57a8B143c6246149F00B090Bce3b8f88',
		woo: '0xabc9547b534519ff73921b1fba6e672b5f58d083',
		stakingContract: '0xcd1B9810872aeC66d450c761E93638FB9FE09DB0',
	},
	polygon: {
		wooPPContract: '0x7400B665C8f4f3a951a99f1ee9872efb8778723d',
		woo: '0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
		stakingContract: '0x9BCf8b0B62F220f3900e2dc42dEB85C3f79b405B',
	},
	arbitrum: {
		wooPPContract: '0xeFF23B4bE1091b53205E35f3AfCD9C7182bf3062',
		woo: '0xcafcd85d8ca7ad1e1c6f82f651fa15e33aefd07b',
		stakingContract: '0x9321785D257b3f0eF7Ff75436a87141C683DC99d',
	},
	optimism: {
		wooPPContract: '0xd1778F9DF3eee5473A9640f13682e3846f61fEbC',
		woo: '0x871f2f2ff935fd1ed867842ff2a7bfd051a5e527',
		stakingContract: '',
	},
}

Object.keys(chainConfig).forEach(chain => {
	const wooPPTokens = wooPPConfig[chain]
	const { wooPPContract, woo, stakingContract } = chainConfig[chain]
	var stakingAmount = 0
	if (chain != 'optimism') {
		stakingAmount = staking(stakingContract, woo, chain)
	}
	module.exports[chain] = {
		staking: stakingAmount,
		tvl: staking(wooPPContract, wooPPTokens, chain),
	}
})
