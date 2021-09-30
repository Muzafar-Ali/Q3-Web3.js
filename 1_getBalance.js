require('dotenv').config();
let Web3 = require("web3");

let rPcURL = process.env.InfuraKey;
let account = "0x2Fb4eEa8519Df251A709d372521d11b11f95B9C5";

let web3 = new Web3(rPcURL);

web3.eth.getBalance(account,(err, amount) =>{
    let balance = web3.utils.fromWei(amount, 'ether')
    console.log('Account Balance : ',balance);
});