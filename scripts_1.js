const { ethers } = require("ethers");
const MyContractArtifact = require('./build/contracts/MyContract.json');
/*
* For Frontend
* import { ethers } from 'ethers';
* import MyContractArtifact from './build/contracts/MyContract'
*/

const CONTRACT_ADDRESS = MyContractArtifact.networks['5777'].address;

const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
/*
* For Metamask
* const provider = new ethers.providers.Web3Provider(window.ethereum);
*
* For connection to Mainnet
* const provider = new ethers.providers.getDefaultProvider(); // Oftentimes this will use a public provider used by everyone and can reach the rate limit
* const provider = new ethers.providers.getDefaultProvider({ infura: INFURA_KEY, alchemy: ALCHEMY_KEY });
* 
* For connection to a Public Testnet
* const provider = new ethers.getDefaultProvider('goerli');
*
* With specific API
* const provider = new ethers.providers.InfuraProvider('goerli', API_KEY);
* const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY);
*/

/*
* If you want to add custom accounts
* const wallet = new ethers.Wallet.fromMnemonic('mnemonic here', provider);
* const signer = wallet.getSigner();
*/

async function main() {
    const ABI = [
        'function data() view returns(uint)',
        'function setData(uint _data) external'
    ];

    const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const value = await readOnlyContract.data();
    console.log(value.toString());

    const signer = provider.getSigner();
    await signer.sendTransaction({
        to: 0x68dFD7511cCDDEbB1DF49A72DE59b0D21Bc8deA0,
        value: 1000
    });
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const txResponse = await contract.setData(2);
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);

    console.log(ethers.utils.formatEther(1000));
    console.log(ethers.utils.parseEther('1.2'));
    console.log(ethers.utils.formatUnits('1000', 18));
    console.log(ethers.utils.parseUnits('2.3', 18));
}