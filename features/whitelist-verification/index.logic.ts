import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

export function verifyWhitelistAddress(whitelist: string[], address: string) {
  // // Encode address with the keccak256 algorithm
  const leafNodes = whitelist.map((addr) => keccak256(addr));

  // // Generate Merkle tree
  const merkleeTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  // // Get the root hash
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const rootHash = merkleeTree.getHexRoot().toString("hex");

  // // Verifying an address
  const leaf = keccak256(address);
  const proof = merkleeTree.getHexProof(leaf);

  const verify = merkleeTree.verify(proof, leaf, rootHash);

  return verify;
}
