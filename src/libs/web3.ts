import Web3 from "web3";

// Used Infura as provider
const API_KEY = process.env.INFURA_API_KEY!;

const web3 = new Web3(`https://mainnet.infura.io/v3/${API_KEY}`);

export default web3;
