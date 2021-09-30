require("dotenv").config();
const Web3 = require('web3');
const _ = require('underscore'); 
/*  
** we can ipmort underscore library as follow:
  const _ = require('underscore-node'); 
*/

const rPcURL = process.env.InfuraKey;
const web3 = new Web3(rPcURL);

// this will give average price in wei from last few blocks
web3.eth.getGasPrice().then((result) => {
  console.log('Estimated Gas Price : ',web3.utils.fromWei(result, 'ether'))
})

// will convert string to hash  
console.log(web3.utils.keccak256(' this is Assignment 5'));

// will provide random Hex 
console.log(web3.utils.randomHex(32));
console.log(web3.utils.randomHex(1));

//using undescore library 
_.each({ key1: "value1", key2: "value2" }, (value, key) => {
  console.log(key);
});