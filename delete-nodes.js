const Bluebird = require('bluebird')
const _ = require('lodash')
const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

const headers = {
  'Authorization': 'Bearer __PERMANENT_AUTH_TOKEN__'
}

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/__PROJECT_ID__', {headers})
})

const createPosts = async () => {
  const mutations = _.chain(_.range(1000))
    .map(n => (
      `{
        post: createPost(text: "${n}") {
          id
        }
      }`
    ))
    .value()

  await Bluebird.map(mutations, m => client.mutate(m), {concurrency: 4})
}

const queryBatch = () => {
  return client.query(`
    query getPosts {
      posts: allPosts(first: 100) {
        id
      }
    }
  `)
}

const deleteBatch = async () => {
  console.log('Fetching new nodes')
  const posts = (await queryBatch()).posts

  if (posts && posts.length > 0) {
    console.log(`Deleting next batch of ${posts.length} posts...`)
    const mutations = _.chain(posts)
      .map(post => (
        `{
          deletePost(id: "${post.id}") {
            id
          }
        }`
      ))
      .value()

    await Bluebird.map(mutations, m => client.mutate(m), {concurrency: 4})
    await deleteBatch()
  }
}

const main = async() => {
  // set to true to create test data
  if (false) {
    console.log(`Creating some posts...`)
    await createPosts()
  } else {
    // query total posts:
    const postsMeta = await client.query(`{
      meta: _allPostsMeta {
        count
      }
    }`)

    console.log(`Deleting ${postsMeta.meta.count} posts...`)
    await deleteBatch()
  }

  console.log('Done!')
}

main().catch((e) => console.error(e))