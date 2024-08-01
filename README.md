# Equito Hardhat Template

Welcome to the Equito Hardhat Template! This project is pre-configured for Equito EVM smart contract development and deployment using Hardhat. It also includes contracts from the [equito-evm-contracts](https://github.com/equito-network/equito-evm-contracts) repository. If you're looking to use Hardhat as a framework to build and deploy your smart contracts, this template repository offers a robust foundation to get started quickly. Fork this template, create new files in the `contracts/` folder, and start building your smart contracts right away!

### Project structure

- **contracts/**: Contains your Solidity smart contracts.
- **test/**: Contains test scripts for contracts.
- **artifacts/**: Contains compiled contract artifacts.
- **cache/**: Used by Hardhat for caching.
- **typechain/**: Contains the generated TypeScript typings for the smart contracts.
- **typechain-types/**: Contains the common generated TypeScript typings for the smart contracts.
- **scripts/**: Contains deployment scripts.
- **lib/**: Additional libraries or dependencies.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (version 18.15.0 or higher)
- [npm](https://www.npmjs.com) (Node Package Manager)
- [Hardhat](https://hardhat.org) (globally or locally installed)
- [TypeScript](https://www.typescriptlang.org/) (globally or locally installed)

### Installation

#### Create a new repository

1. In the current repository, click the `Use this template` button.
2. In the dropdown list, choose `Create a new repository`.
3. Choose a new repository name, for example, `equito-ping-pong-hardhat`.
4. Click `Create repository from template`.

#### Clone preject repo

Replace your github user id in the following command and run it to clone the newly created repo

```bash
git clone https://github.com/<github-user-id>/equito-ping-pong-hardhat.git
```

Clone the equito contract dependencies:

```bash
git submodule update --init --recursive
```

#### Install dependencies

Navigate to your project directory and install the depedencies:

```bash
cd equito-ping-pong-hardhat
npm install
```

#### Set environment variables

Create a `.env` file in the root directory and add the following variables:

```makefile
# Equito RPC
EQUITO_RPC_URL=wss://testnet.testequito.live

# Addresses: Addresses are case sensitive and use proper checksum encoded addresses.
# PRIVATE_KEY is used as the contract deployer key.
PRIVATE_KEY=<your_private_key>

# RPC
# BSC_TESTNET_RPC_URL is the RPC URL for the Binance Smart Chain Testnet network.
BSC_TESTNET_RPC_URL=<your_bsc_testnet_url>

# Specify your contract name
CONTRACT_NAME=<your_contract_name>
```

Set `CONTRACT_NAME` to `PingPong` for example.

**Update the configuration file:**
Update the configuration file `equito.json` in the `config` directory with the proper chainIds and corresponding peer addresses. For example:

```json
{
  "peers": [
    {
      "chainId": 1001,
      "address": "0x<your-contract-address-here>"
    },
    {
      "chainId": 1002,
      "address": "0x<your-contract-address-here>"
    }
  ]
}
```

### Usage

This Hardhat project provides essential commands to streamline and enhance your development workflow. Write your contract inheriting `EquitoApp.sol` and place it in the contracts directory. The name of the contract should be the same as the name `CONTRACT_NAME` specified in the `.env` file.

#### Compile contracts

Compile your smart contracts with the following command:

```bash
npm run hardhat:compile
```

#### Generate TypeChain files

```bash
npm run hardhat:typechain
```

#### Deploy contract

Following command will deploy the contract with the router address correspondingg to the chain. Router address will be fetched from the Equito Network.

```bash
npm run hardhat:deploy -- --network localhost
```

#### Set peers in contracts

It is crucial to set the peers after deployment of your contract. The following command will set the peers of your Dapp deployed on different chains. Before running this command, make sure that the configuration file `equito.json` is updated with the correct peer addresses.

```bash
npm run hardhat:setpeers -- --network localhost
```

#### Run unit tests

This template includes a predefined command for running unit tests, even though it does not contain any unit tests by default.

To run the unit tests, use the following command:

```bash
npm run hardhat:test
```
