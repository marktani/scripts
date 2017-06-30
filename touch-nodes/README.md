# touch-nodes

### 1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project with example schema
graphcool init --schema touch-nodes.graphql
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

### 3. Touch all nodes

```sh
node touch-nodes.js
```

### Notes

* nodes are queried in *pages*
* for each page of nodes, the according update mutations are generated and divided into equally sized *chunks*
* each chunk of mutations is [*batched* into a single GraphQL document](https://www.graph.cool/docs/faq/graphql-combining-multiple-queries-and-mutations-cahzai2eur/)
* each batch of mutations is executed *concurrently* with a certain concurrency factor

Tweaking the sizes of a page, a chunk or the concurrency factor can lead to faster results.

```sh
time -p node touch-nodes.js
```

For 3000 nodes, page size 1000, batch of 50 and concurrency factor 4:

```sh
real        11.39
user         0.56
sys          0.09
```

For 3000 nodes, page size 500, batch of 25 and concurrency factor 8:

```sh
real        15.73
user         0.77
sys          0.14
```

If single mutations result in a 502 or 504, then you should probably try a lower batch size or concurrency factor