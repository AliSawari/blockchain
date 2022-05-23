import { sha256hash } from "./sha256";
import { Transaction } from "./transaction";

export class Block {
  public hash: string = "";
  public nonce: number = 0;
  public dificultyStr = "";
  constructor(
    public txs: Transaction[] = [],
    public parentHash: string = "",
    public height: number = 0,
    public dificulty = 0
  ) {
    this.dificultyStr = this.createDifString();
  }


  private createDifString(): string {
    let str = '';
    for (let x = 0; x < this.dificulty; x++) {
      str += '0';
    }
    return str;
  }


  mine(): string {
    let hash = "";

    while (hash.substring(0, this.dificulty) != this.dificultyStr) {
      this.nonce++;
      hash = sha256hash({
        txs: this.txs,
        parentHash: this.parentHash,
        height: this.height,
        nonce: this.nonce
      })
      console.log('Mining Block #', this.height, 'nonce::', this.nonce , hash);
    }
    console.log('found hash', hash);
    return hash;
  }
}
