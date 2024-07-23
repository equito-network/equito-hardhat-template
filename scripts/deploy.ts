import hre from "hardhat";
import Equito from "../ignition/modules/Equito";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

function addressToBytes64(addr: string) {
  return {
    lower: ethers.zeroPadBytes(addr, 32),
    upper: ethers.ZeroHash,
  };
}

async function main() {
  const equitoAddress = process.env.EQUITO_ADDRESS,
    validatorAddress = process.env.VALIDATOR_ADDRESS,
    oraclePrice = process.env.ORACLE_PRICE,
    chainSelector = process.env.CHAIN_SELECTOR;

  if (!equitoAddress || !ethers.isAddress(equitoAddress)) {
    throw new Error("Invalid Equito address provided.");
  }

  if (!validatorAddress || !ethers.isAddress(validatorAddress)) {
    throw new Error("Invalid Validator address provided.");
  }

  if (
    !oraclePrice ||
    (!Number.isInteger(Number(oraclePrice)) && Number(oraclePrice) <= 0)
  ) {
    throw new Error("Invalid or missing Oracle price provided.");
  }

  if (
    !chainSelector ||
    (!Number.isInteger(Number(chainSelector)) && Number(chainSelector) <= 0)
  ) {
    throw new Error("Invalid or missing Chain selector provided.");
  }

  const { oracle, verifier, router } = await hre.ignition.deploy(
    Equito,
    {
      parameters: {
        Equito: {
          price: oraclePrice,
          validator: validatorAddress,
          chainSelector: chainSelector,
          equitoAddress: addressToBytes64(equitoAddress),
        },
      },
    },
  );

  if (await router.getAddress() === ethers.ZeroAddress) {
    await verifier.setRouter(router);
  }

  console.log(`Oracle deployed to: ${await oracle.getAddress()}`);
  console.log(`ECDSAVerifier deployed to: ${await verifier.getAddress()}`);
  console.log(`Router deployed to: ${await router.getAddress()}`);
}

main().catch(console.error);
