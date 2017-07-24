# delete-nodes

A script that deletes 1000 nodes of a type at a time.

### 1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project with example schema
graphcool init --file delete-nodes.graphql
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

### 3. Bulk Delete

Run the script to delete your `Post` and `User` nodes.

```sh
node delete-nodes.js
```

