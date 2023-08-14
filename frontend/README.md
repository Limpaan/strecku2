# StreckU Frontend
The frontend for the StreckU app. Use together with the backend found in the same github repo

## Installation
1. Clone the repo
2. Make sure to have node and npm [installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Run `npm install` to install all dependencies
4. Run `npm start` to start the app

## Development
The frontend is build on [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/). Using [Material UI](https://mui.com/) for styling.

### Generate backend types
The frontend can automatically generate the types from the backend to use.
1. Start the backend
2. Run `npm run types:openapi` to generate the types

Do this any time the backend has changed.