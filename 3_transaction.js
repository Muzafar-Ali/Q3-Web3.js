require('dotenv').config();
const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require('web3');

const rPc = process.env.InfuraKey; 
const account1 = "0x2Fb4eEa8519Df251A709d372521d11b11f95B9C5";
const pvtKey_account1 =Buffer.from("ea2fe153d389081aed643eb70524f097a7395f952dcc68e124ddbe139011bf0b","hex");
const account2 = "0x8732363052694415900813bA992DaE365D8017cB";

const web3 = new Web3(rPc);

web3.eth.getTransactionCount(account1, (err, nonceCount ) => {
  //Build a transaction object
  console.log("Transaction Nonnce:", nonceCount);

  if(err){
    console.log(err)
  }else{
    const txObject = {
      nonce: web3.utils.toHex(nonceCount),
      to: account2,
      value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };

    //Sign the transaction
    const tx = new Tx(txObject, { "chain": "ropsten"}); // creating insatnce of transaction lib
    tx.sign(pvtKey_account1); //  signing the transaction with private key of account

    const serialized = tx.serialize();
    const txHex = "0x" + serialized.toString("hex");

    //Broadcast the transaction to the network
    web3.eth.sendSignedTransaction(txHex, (err, txHash) => {
      if (!err) {
        console.log("Transaction Hash", txHash);
        //  0xf31bb4f0dcfbf967057a44e3ea3b45f631e4299ed5223436906aa619cc0be76a  
        // this is the hash of transaction on ropsten test network 

      } else {
        console.log(err);
      }
    });
  }

})

