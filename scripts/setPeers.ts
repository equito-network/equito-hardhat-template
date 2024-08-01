import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import hre from "hardhat";
import { Peer, addressToBytes64 } from "../utils";
// Load env
dotenv.config({ path: path.join(__dirname, "../.env") });

/**
 * Sets the peers specified in the config file, equito.json, at the contract address
 * specified as `user_contract_address` in the config file.
 */
async function main() {
  // Read configuration from the equito.json file
  const configPath = path.join(__dirname, "../config/equito.json");
  const rawData = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(rawData);
  // Retrieve peer address for the current chain ID
  const chainId = hre.network.config.chainId;
  if (!chainId) {
    throw new Error(`Failed to fetch chainId!`);
  } else {
    console.log(`Received chainid: ${chainId}`);
  }

  // Get the contract address for the chain
  const peer = config.peers.find((peer: Peer) => peer.chainId === chainId);
  if (!peer) {
    throw new Error(`No peer found for chainId: ${chainId}`);
  }

  if (!peer.address || !ethers.isAddress(peer.address)) {
    throw new Error(
      `Invalid peer address found in equito.json: ${peer.address}`,
    );
  } else {
    console.log(`Peer address at chainid: ${chainId} is ${peer.address}`);
  }

  // Get the contract name from the environment variable
  const contractName = process.env.CONTRACT_NAME;
  if (!contractName) {
    throw new Error("Please set CONTRACT_NAME in your .env file");
  }

  // Dynamically import the contract type
  const { [contractName]: ContractType } = await import(`../typechain`);

  // Get the deployed contract instance
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = ContractFactory.attach(peer.address) as InstanceType<
    typeof ContractType
  >;

  // prepare chainIds and peers arguments for the contract call
  const chainIds = config.peers.map((peer: Peer) => peer.chainId);
  const peerAddresses = config.peers.map((peer: Peer) => {
    if (!peer.address || !ethers.isAddress(peer.address)) {
      throw new Error(`Invalid peer address: ${peer.address}.`);
    }
    return addressToBytes64(peer.address);
  });

  console.log("setting peers:", config.peers);

  // Ensure the lengths of chainIds and peerAddresses match
  if (chainIds.length !== peerAddresses.length) {
    throw new Error("The lengths of chainIds and peerAddresses do not match");
  }
  // Call contract to set peers
  await contract.setPeers(chainIds, peerAddresses);

  console.log("Peers set successfully");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
