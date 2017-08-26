# unique-import

### 1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project with example schema
graphcool init --schema unique-import.graphql
```

Replace the `__PROJECT_ID__` and if needed the `__PERMANENT_AUTH_TOKEN__`.

### 2. Install dependencies

```sh
yarn
```

Make sure your node version is at least 7.6.0:

```sh
node -v
```

### 3. Import items with unique keys

```sh
node unique-imports.js
```