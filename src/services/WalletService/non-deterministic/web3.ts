import { bufferToHex } from 'ethereumjs-util';

import { Web3Node } from '@services/EthService';

import { IFullWallet } from '../IWallet';

export default class Web3Wallet implements IFullWallet {
  public network: string;

  private address: string;

  constructor(address: string, network: string) {
    this.address = address;
    this.network = network;
  }

  public getAddressString(): string {
    return this.address;
  }

  public signRawTransaction(): Promise<Buffer> {
    return Promise.reject(new Error('Web3 wallets cannot sign raw transactions.'));
  }

  public async signMessage(msg: string, nodeLib?: Web3Node): Promise<string> {
    const msgHex = bufferToHex(Buffer.from(msg));

    if (!nodeLib) {
      throw new Error('');
    }

    return (nodeLib as Web3Node).signMessage(msgHex, this.address);
  }
}
