import { AbiCoder, keccak256 } from "ethers";
export * from "./bytes64";
/**
 * @title Hex
 * @notice Represents a hexadecimal string prefixed with '0x'.
 * @dev This type is used to denote values that are expected to be hexadecimal strings, such as addresses and hashes.
 */
export type Hex = `0x${string}`;

/**
 * @title EquitoAddress
 * @notice Represents an address in the Equito protocol, consisting of two 32-byte hexadecimal components.
 * @dev The `lower` field definitely contains the address, while the `upper` field can set to zero if not provided.
 */
export type EquitoAddress = {
  lower: Hex;
  upper: Hex;
};

/**
 * @title EquitoMessage
 * @notice The message structure used in the Equito protocol for cross-chain communication.
 * @dev This structure includes metadata such as the block number and chain selectors, as well as the sender, receiver, and payload hash.
 */
export type EquitoMessage = {
  /**
   * @notice Block number at which the message was emitted.
   */
  blockNumber: bigint;

  /**
   * @notice Selector for the source chain, acting as an identifier.
   */
  sourceChainSelector: bigint;

  /**
   * @notice Address of the sender.
   */
  sender: EquitoAddress;

  /**
   * @notice Selector for the destination chain, acting as an identifier.
   */
  destinationChainSelector: bigint;

  /**
   * @notice Address of the receiver.
   */
  receiver: EquitoAddress;

  /**
   * @notice Hash of the payload of the message to be delivered.
   */
  hashedData: Hex;
};

/**
 * @title generateHash
 * @notice Generates a Keccak256 hash of an EquitoMessage object.
 * @dev This function encodes the EquitoMessage structure in `EquitoMessage` specific format and then hashes it.
 * 
 * @param {EquitoMessage} message - The message object containing the details to hash.
 * @returns {Hex} The Keccak256 hash of the encoded message, represented as a hexadecimal string.
 */
export const generateHash = (message: EquitoMessage): Hex =>
  keccak256(
    AbiCoder.defaultAbiCoder().encode(
      [
        "tuple(uint256,uint256,tuple(bytes32 lower,bytes32 upper),uint256,tuple(bytes32 lower,bytes32 upper),bytes32)",
      ],
      [message],
    ),
  ) as Hex;

/**
 * @title Peer
 * @notice Represents a peer in the Equito network, including the chain ID and the peer's address.
 * @dev Used for identifying and interacting with peers across different blockchain networks.
 */
export interface Peer {
  /**
   * @notice The ID of the blockchain network the peer is on.
   */
  chainId: number;

  /**
   * @notice The Ethereum address of the peer.
   */
  address: string;
}
