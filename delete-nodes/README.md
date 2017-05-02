# delete-nodes

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

Make sure your node version is at least 7:

```sh
node -v
```

### 3. Create test data

Set the flag to `true`:

```js
const main = async() => {
  // set to true to create test data
  if (false) {
    console.log('Creating some posts...')
    await createPosts()
  } else {
    // ...
  }

  console.log('Done!')
}
```

Run the script to create some test data:

```sh
node --harmony-async-await delete-nodes.js
```

### 4. Bulk delete data

Set the flag from above to `false` again.
Run the script to bulk delete data:

```sh
node --harmony-async-await delete-nodes.js
```
