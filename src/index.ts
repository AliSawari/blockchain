import { Chain } from "./chain"
import { Transaction } from "./transaction"


const MyChain = new Chain(3);


function createRandomTxs(total:number): Transaction[] {
  const txs = [];
  for (let x = 0; x < total; x++){
    const tx = new Transaction({
      from: Math.random().toString(16).split('.')[1],
      to: Math.random().toString(16).split('.')[1],
      amount: parseFloat((Math.random() * 1000).toString())
    })
    txs.push(tx);
  }
  return txs;
}


for(let x=0;x<20;x++){
	const randomTxs = createRandomTxs(2);
	MyChain.addBlock(randomTxs);
}



// MyChain.saveLog();

// MyChain.loadFromFile();

MyChain.verifyIntegrity();

MyChain.verifyHashes();
