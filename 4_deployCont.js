require('dotenv').config();

var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

var rPcURL = process.env.InfuraKey;
var account = "0x2Fb4eEa8519Df251A709d372521d11b11f95B9C5";
var pvtKey = "ea2fe153d389081aed643eb70524f097a7395f952dcc68e124ddbe139011bf0b";
var byteCode =
  "608060405234801561001057600080fd5b5060d38061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80630664809f14603757806312065fe014603f575b600080fd5b603d6059565b005b60456064565b60405160509190607a565b60405180910390f35b6101f4600081905550565b60008054905090565b6074816093565b82525050565b6000602082019050608d6000830184606d565b92915050565b600081905091905056fea2646970667358221220359d14652c3003aefe15231bd12d62d7efbb1cd13bf4c59af376a614a0a71b0164736f6c63430008070033";

var web3 = new Web3(rPcURL);

var bytesCodeBuffer = Buffer.from(byteCode, "hex");
var pvtKeyBuffer = Buffer.from(pvtKey, "hex");

web3.eth.getTransactionCount(account, (err, count) => {
  // build transaction
  console.log("Nonce:", count);

  if (err) {
    console.log(err);
  } else {
    var txObject = {
      nonce: web3.utils.toHex(count),
      data: bytesCodeBuffer,
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };
    // sign Transaction
    var tx = new Tx.Transaction(txObject, {
      chain: "ropsten",
      Hardfork: "petersberg",
    });
    tx.sign(pvtKeyBuffer);
    var serialzed = tx.serialize();
    var raw = "0x" + serialzed.toString("hex");

    // depolyment of contract
    web3.eth
      .sendSignedTransaction(raw, (err, txhash) => {
        if (err) {
          console.log(err);
        } else {
          console.log("trx Hash :", txhash);

          //0xc24e666225b1533fa2e9c6bb88ea85c4157ca8327b534125dc6250fdf79f49ec
          // this is the hash of transaction on ropsten test network
        }
      }).then((receipt) => {
        // this will return receipt of transaction
        console.log(receipt);
      });
  }
});
