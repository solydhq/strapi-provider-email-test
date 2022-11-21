import  { InboxStorage } from '../src/inboxStore';

const inboxStore = new InboxStorage();

const emailA = {
  to: 'test-A@example.com',
  message: {
    text: 'test-A-message'
  },
};

const emailB = {
  to: 'test-B@example.com',
  message: {
    text: 'test-B-message'
  },
};

describe('TypedStorage', () => {
  afterEach(() => inboxStore.clear())

  it('should be able to send mail', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)
  });

  it('should be able get sent mail from inbox', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)

    const message = inboxStore.getLastEmail(emailA.to)

    expect(message).toEqual(emailA.message)
  });

  it('should be able get all mails from inbox', () => {
    const nrOfEmails = 3;
    [...Array(nrOfEmails)].map(() => inboxStore.sendEmail(emailA.to, emailA.message));

    const messages = inboxStore.getEmails(emailA.to)

    expect(messages).toBeTruthy()
    expect(messages.length).toEqual(nrOfEmails)
  });

  it('should remove email from stack when pop is true', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)

    const messageA = inboxStore.getLastEmail(emailA.to)
    const messageB = inboxStore.getLastEmail(emailA.to)

    expect(messageA).toEqual(emailA.message)
    expect(messageB).toBeFalsy()
  });

  it('should not remove email from stack when pop is true', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)

    const messageA = inboxStore.getLastEmail(emailA.to, false)
    const messageB = inboxStore.getLastEmail(emailA.to)

    expect(messageA).toEqual(emailA.message)
    expect(messageB).toEqual(emailA.message)
  });

  it('should be able to clear single inbox', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)
    inboxStore.sendEmail(emailB.to, emailB.message)

    inboxStore.clearInbox(emailA.to);

    const messageA = inboxStore.getLastEmail(emailA.to)
    const messageB = inboxStore.getLastEmail(emailB.to)

    expect(messageA).toBeFalsy()
    expect(messageB).toEqual(emailB.message)
  });

  it('should be able to clear all inboxes', () => {
    inboxStore.sendEmail(emailA.to, emailA.message)
    inboxStore.sendEmail(emailB.to, emailB.message)

    inboxStore.clear();

    const messageA = inboxStore.getLastEmail(emailA.to)
    const messageB = inboxStore.getLastEmail(emailB.to)

    expect(messageA).toBeFalsy()
    expect(messageB).toBeFalsy()
  });

  it('should return undefined when email is retrieved from non existing inbox', () => {
    const message = inboxStore.getLastEmail('non-existing-inbox')

    expect(message).toEqual(undefined)
  });
});