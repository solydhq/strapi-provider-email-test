import { InboxStorage } from './inboxStore';

interface Provider {
  inboxes: InboxStorage;
  send: (options: Record<string, unknown>) => Promise<void>;
}

const store = new InboxStorage();
const emailFields = ['from', 'replyTo', 'to', 'cc', 'bcc', 'subject', 'text', 'html', 'attachments'];

const pick = (obj: Record<string, unknown>, keys: string[]) =>
  Object.fromEntries(keys.filter((key) => !!obj[key]).map((key) => [key, obj[key]]));

export = {
  provider: 'mock',
  name: 'Email Mock',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init: (providerOptions: unknown = {}, settings: Record<string, unknown> = {}): Provider => {
    return {
      inboxes: store,
      send: (options: Record<string, unknown> = {}) => {
        const email = {
          ...pick(options, emailFields),
          to: options.to as string,
          from: options.from || settings.defaultFrom,
          replyTo: options.replyTo || settings.defaultReplyTo,
          text: options.text || options.html,
          html: options.html || options.text,
        };

        return new Promise((resolve) => resolve(store.sendEmail(email.to, email)));
      },
    };
  },
};
