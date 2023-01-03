const sdk = require("@defillama/sdk");

const LIQUID_STAKING_CONTRACT = "0x70d264472327B67898c919809A9dc4759B6c0f27";

const abi = {
     inputs: [],
     name: "totalBalance",
     outputs: [
      {
       internalType: "uint256",
       name: "",
       type: "uint256"
      }
     ],
     stateMutability: "view",
     type: "function"
    };

async function tvl(timestamp, block, chainBlocks) {
    const balance = (await sdk.api.abi.call({
        abi: abi,
        chain: "astar",
        target: LIQUID_STAKING_CONTRACT})).output;
    const balances = { 'astar': balance / 10e17 };
    return balances;
}

module.exports = {
    timetravel: true,
    misrepresentedTokens: false,
    methodology: 'counts the number of ASTR tokens locked in Liquid Staking contract',
    start: 1502025,
    astar: {
      tvl,
    }
  }; 
