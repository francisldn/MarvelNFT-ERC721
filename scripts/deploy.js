
const { run, ethers } = require('hardhat');
const {saveFrontendFiles} = require('./deploy-helper');

async function main() {
  await run('compile');
  
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);
  
  console.log(`Deploying on ${network.name.toUpperCase()}`);
  
  const MarvelNFTFactory = await ethers.getContractFactory('MarvelNFT');
  const MarvelNFT = await MarvelNFTFactory.deploy();
  await MarvelNFT.deployed();
  console.log(`MarvelNFT deployed to ${MarvelNFT.address}`);

  await saveFrontendFiles(network.name,MarvelNFT.address,MarvelNFT.interface);


  // if (network.name !== 'localhost') {
  // // verify contract
  // console.log('Waiting to verify...')
  // await new Promise((r) => setTimeout(r, 60000))

  // console.log('Verifying...')
  // await run('verify:verify', {
  //   address: MarvelNFT.address,
  //   constructorArguments: [],
  // })
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
