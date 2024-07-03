import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Equito = buildModule("Equito", (m) => {
  const price = m.getParameter("price", 0);
  const oracle = m.contract("MockOracle", [price]);

  const validator = m.getParameter("validator");
  const verifier = m.contract("ECDSAVerifier", [[validator], 1, oracle]);
  
  const chainSelector = m.getParameter("chainSelector", 1337);
  const equitoAddress = m.getParameter("equitoAddress");

  const router = m.contract("Router", [chainSelector, verifier, verifier, equitoAddress]);

  return { oracle, verifier, router };
});

export default Equito;