require('dotenv').config();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const rPcURL = process.env.InfuraKey;
const account1 = "0x2Fb4eEa8519Df251A709d372521d11b11f95B9C5";
const pvtKey_account1 ="ea2fe153d389081aed643eb70524f097a7395f952dcc68e124ddbe139011bf0b";
const account2 = "0x8732363052694415900813bA992DaE365D8017cB";
const pvtKey_account2 =Buffer.from("0b04eccff5d4cbc253def526eaf4eab92787f1e08ed74b1a0fe1489d9c2442a9","hex");

const web3 = new Web3(rPcURL);

const pvtKey_account1_Buffer = Buffer.from(pvtKey_account1,'hex');


const contAddress = '0x18720963813b77E7C9D43639Bfa731cCF832E824';
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]; 

const contract = new web3.eth.Contract(abi,contAddress);


// transfer tokens to account2 

web3.eth.getTransactionCount(account1,(error, txCount)=>{
    console.log(`Transaction Nonce: ${txCount}`);
    if(error){
        console.log(error)
    }else{
    
        const trxObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(1000000),
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
          to: contAddress,
          data: contract.methods.transfer(account2, 1000000000000000000000n).encodeABI(), // it will transfer tokens frm account1 to account2 in wei
        };
// sign the transaction with private key 
        const tx = new Tx.Transaction(trxObject, {chain:'ropsten', Hardfork:'petersberg'});
              tx.sign(pvtKey_account1_Buffer);
        const serialized = tx.serialize();
        const raw = '0x' + serialized.toString('hex');

// execute the transaction
        web3.eth.sendSignedTransaction(raw,(error, txHash)=>{
            if(error){
                console.log(error);     
            }else{
              console.log(`Transaction Hash : ${txHash}`);

              // 0x5f4c59462e39607f60d4cd8f7be17cb21279a3af9a5ca2035fdd29b5c86f4000;
              // this is the hash of transaction on ropsten test network
            }
        })

    }       
})

