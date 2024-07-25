import hre from "hardhat";
import { ethers } from "hardhat";
import UserContract from "../ignition/modules/UserContract";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import getRouter from "../config/getRouter";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

/**
 * Deploys the user contract specified in the .env file as `CONTRACT_NAME` and stores
 * the user contract address in the equito.json config file after deployment.
 */
async function main() {
  // Read router address from the equito.json file
  const configPath = path.join(__dirname, "../config/equito.json");
  const rawData = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(rawData);

  // Fetch router address from the equito network
  const routerAddress = await getRouter(hre.network.name);

  if (!routerAddress) {
    throw new Error(`Invalid chain: ${hre.network.name}.`);
  } else if (!ethers.isAddress(routerAddress)) {
    throw new Error(
      `Invalid Equito Router Address: ${routerAddress} for chain: ${hre.network.name}. Contact support!`,
    );
  }

  // Read contract name from .env file
  const contractName = process.env.CONTRACT_NAME;
  if (!contractName) {
    throw new Error("Please set CONTRACT_NAME in your .env file");
  }
  console.log(`deploying contract : ${contractName}`);
  // Deploy the contract using the generic Ignition module
  const { contract } = await hre.ignition.deploy(UserContract, {
    parameters: {
      UserContract: {
        routerAddress: routerAddress,
      },
    },
  });

  const contractAddress = await contract.getAddress();
  console.log(`${contractName} deployed to: ${contractAddress}`);

  // Update equito.json with the new contract address
  config.user_contract_address = contractAddress;

  // Write the updated config back to the file
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(
    `Updated equito.json with new contract address: ${contractAddress}`,
  );
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
