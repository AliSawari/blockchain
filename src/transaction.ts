import { sha256hash } from './sha256'

type TxData = {
  from: string;
  to: string;
  amount: number;
  createdAt?: Date;
}

export class Transaction {
  txId: string;
  constructor(public data:TxData){
    data.createdAt = new Date();
    this.txId = sha256hash(data);
  }
}
