# todos

The classic todo app that everyone writes

## Setup

Clone the repository down and run `npm install` to get all the dependencies installed. The other thing to do is to create a [Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) and create a collection called `todos`.

Once you have those two things, you're going to want to create a `.env` file so that certain Firebase requirements can be inlined into the project. The file should have the 3 keys that you see below.

```
FIREBASE_API_KEY=<api_key>
FIREBASE_PROJECT_ID=<project_id>
FIREBASE_MESSAGING_ID=<messaging_id>
```

These details will be provided to you when you create a new Firebase project for yourself. Without this information, this project will not work.

## Running

A simple `npm start` will start the server and start `webpack-dev-server` as well to build the assets. This app will write to your Cloud Firestore.

## Development

The patterns in the project are fairly self explanatory, it uses React + Redux + Redux Saga to get the job done. The project also runs prettier so that code style can be enforced and ESLint for linting.

## Resources

-   [Firebase API](https://firebase.google.com/docs/firestore/quickstart)
-   [Material UI Docs](https://material-ui.com/getting-started/installation/)
-   [MomentJS Docs](https://momentjs.com/)
