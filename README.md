# MongoDB Book List

This project now uses a small Express API backed by MongoDB instead of `json-server`.

## Setup

1. Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.
2. Optional: set `MONGODB_URI`, `MONGODB_DB`, or `MONGODB_COLLECTION` if you want different values.
3. Seed the database from the existing `db.json` file:

```bash
npm run seed:mongo
```

## Available Scripts

### `npm run server`

Starts the Express API on port `5000`.

### `npm start`

Starts the React app on port `3000`.

### `npm run dev`

Starts both the React app and the MongoDB API together.

### `npm test`

Runs the React test suite.
