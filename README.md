# strapi-provider-email-test [![Tests Actions Status](https://github.com/solydhq/strapi-provider-email-test/workflows/Tests/badge.svg)](https://github.com/solydhq/strapi-provider-email-mock/actions)

A zero-dependency in memory email mock provider for [strapi v4](https://github.com/strapi/strapi)

## :floppy_disk: Installation

```bash
npm install --save-dev trapi-provider-email-test
# or
yarn add -D strapi-provider-email-test
```

## :technologist: Usage

Add the plugin configuration in the plugin.js as you would with any other plugin.

```javascript
// ...
email: {
  config: {
    provider: 'strapi-provider-email-test',
    providerOptions: {},
    settings: {
      defaultFrom: 'solyd@example.com',
      defaultReplyTo: 'solyd@example.com',
    },
  },
},
//...
```

In your tests you can then get the used instance of the in-memory storage to access the sent emails:

```typescript
declare let strapi: IStrapi;

const { inboxes } = strapi.plugin('email').provider;

it('sends confirmation email after register', async () => {
  const response = await graphqlRequest.Register({
    ...testUser,
  });

  const lastEmail = inbox.getLastEmail(testUser.email);
  expect(lastEmail).toBe(expectedValue);
});
```

## :monocle_face: API

The API of in-memory inbox (`inboxes`) is kept simple and allows for the usual operations                     |

```typescript
class InboxStorage {
  private readonly storage;
  constructor();
  getEmails(emailAddress: string): Record<string, unknown>[];
  getLastEmail(emailAddress: string, pop?: boolean): Record<string, unknown> | undefined;
  sendEmail(emailAddress: string, message: Record<string, unknown>): void;
  clearInbox(emailAddress: string): void;
  clear(): void;
}
```

## :hammer_and_wrench: Contributing

Interested in contributing? Great!

To fix a bug or add a feature, follow these steps:

- Create a [Fork](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#forking-a-repository) of the repo
- Create a new branch (`git checkout -b your-branch`)
- Add your changes and new tests if necessary
- Make sure all tests pass
- Commit your changes (`git commit -am 'feat: fantastic feature'`)
- Push the branch (`git push origin your-branch`)
- Create a [Pull Request](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#forking-a-repository)

### Development

The required packages to start development can be installed with

```bash
npm install
# or
yarn install
```

The tests can be run with

```bash
npm run test
# or
yarn test
```
