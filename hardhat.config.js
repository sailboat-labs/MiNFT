require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const testPrivateKey = process.env.TEST_PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
            accounts: [`${testPrivateKey}`],
        },
        localhost: {
            url: `HTTP://127.0.0.1:7545`,
            accounts: [`342e1458b3f368b71c5d363fdf9cf99084d348280a890fd819faeb2b81b6e73a`],
        },
    },
    etherscan: {
        apiKey: {
            rinkeby: etherscanApiKey,
        },
    },
};