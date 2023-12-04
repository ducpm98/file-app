# Turborepo File App

Turborepo for file application using react js, vite, socket io, turborepo

## Using this example

Run the following command:

```sh
npm i
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [React.js](https://react.dev) app
- `server`: a [Express.js](https://expressjs.com) web server


Each package/app is 100% [Javascript](https://www.javascript.com).

### Utilities

This Turborepo has some additional tools already setup for you:

- [ESLint](https://eslint.org/) for code linting

### Build

To build all apps and packages, run the following command:

```
cd file-app
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd file-app
npm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd file-app
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
