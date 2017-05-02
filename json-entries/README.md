# json-entries

Shows the usages of Lokka to run a GraphQL mutation with JSON and JSON list variables

### 1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project with example schema
graphcool init --file json-entries.graphql
```

Replace the `__PROJECT_ID__`.

### 2. Install dependencies

```sh
yarn
```

Make sure your node version is at least 7:

```sh
node -v
```

### 3. Create some Json data

Run the script to create some Json data:

```sh
node --harmony-async-await json-entries.js
```
