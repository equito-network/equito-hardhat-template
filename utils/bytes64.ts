import { ethers } from "hardhat";

/**
 * @title Bytes64Struct
 * @notice Represents a structure containing two 32-byte address strings.
 * @dev Used to store 64-byte long values for the sender and receiver addresses in the EquitoMessage struct.
 */
export interface Bytes64Struct {
  /**
   * @notice The lower 32 bytes.
   */
  lower: string;

  /**
   * @notice The upper 32 bytes.
   */
  upper: string;
}

/**
 * @title Utility Functions
 * @notice Provides utility functions for converting and hashing data.
 * @dev Includes functions for address manipulation and message hashing.
 */

/**
 * @notice Converts an Ethereum address to a Bytes64Struct, containing a padded lower part
 * and a zeroed upper part.
 * @dev Ensures the address is padded to 32 bytes and sets the upper 32 bytes to zero.
 * 
 * @param {string} addr - The Ethereum address to convert.
 * @returns {Bytes64Struct} An object with `lower` containing the padded address
 *                          and `upper` set to zero hash.
 */
export function addressToBytes64(addr: string): Bytes64Struct {
  return {
    lower: ethers.zeroPadValue(ethers.getAddress(addr), 32),
    upper: ethers.ZeroHash,
  };
}
