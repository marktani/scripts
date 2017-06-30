const Bluebird = require('bluebird')
const _ = require('lodash')
const { GraphQLClient } = require('graphql-request')

const headers = {
  // if needed, inject a PAT
  // 'Authorization': 'Bearer __PERMANENT_AUTH_TOKEN__'
}

const client = new GraphQLClient('https://api.graph.cool/simple/v1/__PROJECT_ID__', { headers })

const countAll = () => {
  return client.request(`{
    meta: _allPostsMeta {
      count
    }
  }`)
}

const queryBatch = (first, skip = 0) => {
  return client.request(`
    query getPosts {
      posts: allPosts(first: ${first}, skip: ${skip}) {
        id
      }
    }
  `)
}

const touchAll = async (count) => {
  console.log(`Updating ${count} posts:`)

  // because it's a simple mutation, we choose fairly high chunk and batch size. use lower ones for nested mutations!
  const BATCH_SIZE = 50
  const PAGE_SIZE = 1000
  const TOTAL = Math.floor(count / PAGE_SIZE) + 1

  let skip = 0
  let run = 0

  while(skip <= count) {
    console.log(`[${++run}/${TOTAL}] Fetch and update next page in chunks of ${BATCH_SIZE}...`)
    const posts = (await queryBatch(PAGE_SIZE, skip)).posts

    // first, generate every update mutation separately
    const mutations = _.chain(posts)
      .map(post => (
        `
        ${post.id}: updatePost(id: "${post.id}" dummy: "dummy") {
          id
        }
      `
      ))
      .value()

    // create equally sized chunks, that are batched into one GraphQL document
    const batchedMutations = _.chain(_.chunk(mutations, BATCH_SIZE))
      .map(chunk =>
        `
        mutation {
          ${chunk.join('\n')}
        }
      `
      )
      .value()

    // run each batch separately
    await Bluebird.map(batchedMutations, m => client.request(m), {concurrency: 4})

    // skip finished nodes
    skip = skip + PAGE_SIZE
  }
}


const createPosts = async () => {
  const mutations = _.chain(_.range(1000))
    .map(n => (
      `mutation {
        post: createPost(title: "${n}") {
          id
        }
      }`
    ))
    .value()

  await Bluebird.map(mutations, m => client.request(m), {concurrency: 4})
}


const main = async() => {
  // uncomment to create some test data
  // await createPosts()
  const count = (await countAll()).meta.count
  await touchAll(count)

  console.log('Done!')
}

main().catch((e) => console.error(e))
