export class InboxStorage {
  private readonly storage: Map<string, Record<string, unknown>[]>;

  constructor() {
    this.storage = new Map<string, Record<string, unknown>[]>();
  }

  public getEmails(emailAddress: string): Record<string, unknown>[] {
    return this.storage.get(emailAddress) || [];
  }

  public getLastEmail(emailAddress: string, pop = true): Record<string, unknown> | undefined {
    const inbox = this.storage.get(emailAddress);

    if (!inbox) {
      return undefined;
    }

    const message = pop ? inbox.pop() : inbox[0];

    if (inbox.length === 0) {
      this.storage.delete(emailAddress);
    }

    return message;
  }

  public sendEmail(emailAddress: string, message: Record<string, unknown>): void {
    if (!emailAddress) {
      return;
    }

    if (!this.storage.has(emailAddress)) {
      this.storage.set(emailAddress, []);
    }

    const inbox = this.storage.get(emailAddress);
    inbox?.push(message);
  }

  public clearInbox(emailAddress: string): void {
    this.storage.delete(emailAddress);
  }

  public clear(): void {
    this.storage.clear();
  }
}
