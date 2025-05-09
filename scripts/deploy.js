const hre = require("hardhat");

async function main() {
  // Deploy DID contract
  const DID = await hre.ethers.getContractFactory("DID");
  const did = await DID.deploy();
  await did.waitForDeployment();
  console.log("DID contract deployed to:", await did.getAddress());

  // Deploy Credential contract
  const Credential = await hre.ethers.getContractFactory("Credential");
  const credential = await Credential.deploy();
  await credential.waitForDeployment();
  console.log("Credential contract deployed to:", await credential.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 