# Equito Hardhat Template

Welcome to the Equito Hardhat Template! This project is pre-configured for Equito EVM smart contract development and deployment using Hardhat. It also includes contracts from the [equito-evm-contracts](https://github.com/equito-network/equito-evm-contracts) repository. If you're looking to use Hardhat as a framework to build and deploy your smart contracts, this template repository offers a robust foundation to get started quickly. Fork this template, create new files in the `contracts/` folder, and start building your smart contracts right away!

### Project structure
- **contracts/**: Contains Solidity smart contracts.
- **test/**: Contains test scripts for contracts.
- **artifacts/**: Contains compiled contract artifacts.
- **cache/**: Used by Hardhat for caching.
- **scripts/**: Contains deployment scripts.
- **lib/**: Additional libraries or dependencies.

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en) (version 18.15.0 or higher)
- [npm](https://www.npmjs.com) (Node Package Manager)
- [Hardhat](https://hardhat.org) (globally or locally installed)

### Installation
#### Create a new repository
1. In the current repository, click the `Use this template` button.
2. In the dropdown list, choose `Create a new repository`.
3. Choose a new repository name, for example, `equito-ping-pong-hardhat`.
4. Click `Create repository from template`.

#### Install dependencies

Navigate to your project directory and run the following command:

```bash
npm install
```

#### Set environment variables

Create a `.env` file in the root directory and add the following variables:

```makefile
# Accounts
# PRIVATE_KEY is used as the contract deployer key.
PRIVATE_KEY=<your_private_key>

# Addresses
# EQUITO_ADDRESS is the main Equito SUDO address.
EQUITO_ADDRESS=<equito_contract_address>
# VALIDATOR_ADDRESS is the initial validator's address.
VALIDATOR_ADDRESS=<validator_contract_address>

# RPC
# BSC_TESTNET_RPC_URL is the RPC URL for the Binance Smart Chain Testnet network.
BSC_TESTNET_RPC_URL=<your_bsc_testnet_url>

# Common
# ORACLE_PRICE determines the cost of the native token in USD.
ORACLE_PRICE=<oracle_price>
# CHAIN_SELECTOR is used in the Router contract constructor and should match the network identifier where the contract is deployed.
CHAIN_SELECTOR=<chain_selector>
```

### Usage
This Hardhat project provides essential commands to streamline and enhance your development workflow.

#### Compile contracts

Compile your smart contracts with the following command:

```bash
npm run hardhat:compile
```

#### Deploy contracts using Hardhat Ignition

Deploy your contracts using Hardhat Ignition:

```bash
npm run hardhat:ignition -- --network localhost
```

#### Deploy contracts using prepared scripts

Use the deployment scripts that include additional smart contract API calls:

```bash
npm run hardhat:deploy -- --network localhost
```

After deploying the contracts, it is crucial to finalize the setup by calling the `setRouter` function in the `ECDSAVerifier` contract. This step establishes the address of the newly deployed `Router` contract as the primary one.

#### Run unit tests

This template includes a predefined command for running unit tests, even though it does not contain any unit tests by default.

To run the unit tests, use the following command:

```bash
npm run hardhat:test
```
