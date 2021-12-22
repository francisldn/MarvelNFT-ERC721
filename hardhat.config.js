require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('solidity-coverage')

module.exports = {
  networks: {
    hardhat: {
      // forking: {
            //   url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY
            // }
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      timeout: 1000000,
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY,
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      timeout: 1000000,
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY,
      gasPrice: 50e9,
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      timeout: 1000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: './frontend/src/abis',
    sources: './contracts'
  },
}