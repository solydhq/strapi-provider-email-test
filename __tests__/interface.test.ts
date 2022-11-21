import { InboxStorage } from '../src/inboxStore';
import provider from '../src/index';

describe('TypedLocalStorage', () => {
  it('should expose a provider field', () => {
    expect(provider.provider).toBeTruthy();
    expect(typeof provider.provider).toBe('string');
  });

  it('should expose a name field', () => {
    expect(provider.name).toBeTruthy();
    expect(typeof provider.name).toBe('string');
  });

  it('should expose a init method', () => {
    expect(provider.init).toBeInstanceOf(Function);
  });

  it('should expose a getItem method', () => {
      const initialized = provider.init();
  
      expect(initialized.inboxes).toBeInstanceOf(InboxStorage);
  });

  it('should expose a getItem method', () => {
    const initialized = provider.init();

    expect(initialized.send).toBeInstanceOf(Function);
  });
});
