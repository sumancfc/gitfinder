# Hublens

Hublens is a lightweight tool for searching GitHub users and exploring their
public profiles and repositories, without leaving a single page.

## Features

- **Instant search** — look up any GitHub username and get matching profiles
  in real time via the GitHub Search API.
- **Rich profiles** — view avatar, bio, company, location, follower/following
  counts, and public repo & gist totals at a glance.
- **Recent repositories** — see a user's five most recently created
  repositories, linking straight through to GitHub.

## Tech stack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Chakra UI](https://v1.chakra-ui.com/) for components and theming (dark mode)
- Context API + `useReducer` for state management
- [Axios](https://axios-http.com/) against the GitHub REST API

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app. The page
reloads automatically as you edit source files.

### Environment variables

GitHub API requests are authenticated with a personal OAuth app's client
credentials to raise the rate limit above the default unauthenticated quota.
Create a `.env` file in the project root:

```
REACT_APP_CLIENT_ID=your_github_oauth_client_id
REACT_APP_CLIENT_SECRET=your_github_oauth_client_secret
```

## Available scripts

| Command         | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `npm start`      | Runs the app in development mode.                         |
| `npm test`       | Launches the test runner in interactive watch mode.       |
| `npm run build`  | Builds the app for production into the `build/` folder.  |
| `npm run deploy` | Builds and publishes the app to GitHub Pages.             |

## Deployment

This project is configured to deploy to GitHub Pages via [`gh-pages`](https://www.npmjs.com/package/gh-pages):

```bash
npm run deploy
```

This runs `npm run build` and publishes the contents of `build/` to the
`gh-pages` branch, served at the `homepage` URL configured in `package.json`.
