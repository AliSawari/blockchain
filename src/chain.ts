import { writeFileSync } from "fs";
import { Block } from "./block";
import { sha256hash } from "./sha256";
import { Transaction } from "./transaction";
const chainFilePath = `${__dirname}/chain.json`;

export class Chain {
  public blocks: Block[] = [];
  constructor(public dificulty: number) {
    const genesisTx = new Transaction({
      from: '',
      to: 'Ali',
      amount: 1000000
    })
    const genesisBlock = new Block([genesisTx], '', 0);
    genesisBlock.hash = sha256hash({
      txs: genesisBlock.txs,
      parentHash: genesisBlock.parentHash,
      height: genesisBlock.height,
      nonce: 0
    })
    this.blocks.push(genesisBlock);
  }

  addBlock(txs: Transaction[]) {
    const latestBlock = this.blocks[this.blocks.length - 1];
    const block = new Block(txs, latestBlock.hash, this.blocks.length, this.dificulty);
    const hash = block.mine();
    block.hash = hash;
    this.blocks.push(block);
  }


  saveLog(){
    writeFileSync(chainFilePath, JSON.stringify(this, null, 2))
    console.log('saved chain data in file', chainFilePath)
  }

  verifyIntegrity() {
    for(let block of this.blocks){
      if(block.height != 0){
        let parentBlock = this.blocks[block.height - 1];
        if(block.parentHash == parentBlock.hash) {
          console.log(`Block #${block.height} is VALID`);
        } else {
          throw new Error(`Block #${block.height} is not pointing to the previous block and NOT VALID!`)
        }
      }
    }
    console.log('all blocks are VALID. The Chain is Secure and VALID!');
  }


  verifyHashes(){
    for(let block of this.blocks){
      let newBlock = new Block(block.txs, block.parentHash || "", block.height, this.dificulty);
      newBlock.hash = sha256hash({
        txs: block.txs,
        parentHash: block.parentHash,
        height: block.height,
        nonce: block.nonce
      });
      if(newBlock.hash == block.hash) console.log(`Block #${block.height} hash is correct`)
      else throw new Error(`Block ${block.height} hash is not correct\n Correct Hash is ${newBlock.hash}. the Given hash is ${block.hash}`);
    }
    console.log("All Hashes Calculated Correctly! Chain is Secure and VALID");
  }


  loadFromFile() {
    const chainFile = require(chainFilePath);
    this.blocks = chainFile.blocks;
    this.dificulty = chainFile.dificulty;
    console.log(`Loaded Chain Data with ${this.blocks.length} Blocks and dificulty of ${this.dificulty} from File ${chainFilePath}`);
  }
}

