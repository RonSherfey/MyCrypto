import EthereumApp from '@ledgerhq/hw-app-eth';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

import Ledger from './Ledger';

export default class LedgerUSB extends Ledger {
  protected transport: TransportWebUSB | null = null;
  protected app: EthereumApp | null = null;

  protected async checkConnection(): Promise<void> {
    if (this.transport === null) {
      this.transport = await this.getTransport();
      this.app = new EthereumApp(this.transport);
    }
  }

  private async getTransport(): Promise<TransportWebUSB> {
    const existing = await TransportWebUSB.openConnected();
    const transport = existing ?? (await TransportWebUSB.request());

    transport.on('disconnect', () => {
      this.transport = null;
    });

    return transport;
  }
}
