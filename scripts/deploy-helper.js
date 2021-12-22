const fs = require('fs');
const path = require('path');

async function saveFrontendFiles(networkName, contractAddress, contractAbi) {
    const contractDir= path.join(process.cwd(),'./frontend/src/abis/contracts');
    
    if(!fs.existsSync(contractDir)) {
        fs.mkdirSync(contractDir);
    }

    let json = JSON.stringify({
        "network_name": "",
        "contract_name": "",
        "contract_address": ""
    })

    let contractfile = JSON.parse(json);
    contractfile.network_name = networkName;
    contractfile.contract_address = contractAddress;
    contractfile.contract_interface = contractAbi;

    const filename = `${contractDir}/contract-address.json`;

    try {
        await fs.promises.writeFile(filename, JSON.stringify(contractfile));
    } catch (err) {
        console.log('Error occurred while storing data to file', err)
    }
}

module.exports = {
    saveFrontendFiles: saveFrontendFiles
};
