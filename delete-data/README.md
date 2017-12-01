# delete-nodes

A script that deletes all nodes of all types found in the provided schema file.

### 1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project with example schema
graphcool init --file delete-data.graphql
```

### 2. Install dependencies

Make sure your node version is at least 7.6.0:

```sh
node -v
```

### 3. Bulk Delete

Run the script to delete all nodes for types defined in the schema file

```sh
./node_modules/.bin/babel-node --presets es2015 delete-data/delete-data.js <graphql-server-url> delete-data/delete-data.graphql
```

