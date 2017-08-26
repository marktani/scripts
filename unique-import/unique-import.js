const Bluebird = require('bluebird')
const _ = require('lodash')
const { GraphQLClient } = require('graphql-request')

const headers = {
  // if needed, inject a PAT
  // 'Authorization': 'Bearer __PERMANENT_AUTH_TOKEN__'
}

const client = new GraphQLClient('https://api.graph.cool/simple/v1/__PROJECT_ID__', { headers })

const generateUniqueKeys = (count, max) => {
  // use Set to make keys unique
  const uniqueKeys = new Set(_.range(count).map(
    r => {
      // need to use string interpolation because we need GraphQL String variables
      return `${Math.floor((Math.random() * max) + 1)}`
    }
  ))

  return [...uniqueKeys]
}

const queryExistingKeys = async(keys) => {
  const query = `
    query existingItems($keys: [String!]!) {
      allItems(filter: {
        key_in: $keys
      }) {
        id
        key
      }
    }
  `

  const variables = { keys }

  const response = await client.request(query, variables)
  return response.allItems.map(item => item.key)
}

const createItems = async(keys) => {
  const BATCH_SIZE = 50

  const mutations = _.chain(keys).map(key => {
    return `
      k_${key}: createItem(key: "${key}") {
        id
      }
    `
  })
  .chunk(BATCH_SIZE)
  .map(chunk => `
    mutation {
      ${chunk.join('\n')}
    }
  `)
  .value()

  await Bluebird.map(mutations, mutation => client.request(mutation), {concurrency: 8})
}

const main = async() => {
  // get maximally 1000 unique keys between 1 and 10000
  const keys = generateUniqueKeys(1000, 10000)

  // query existing keys
  const existingKeys = await queryExistingKeys(keys)
  console.log(`${existingKeys.length} keys already exist!`)

  // filter out existing keys to obtain new keys
  const newKeys = keys.filter(key => existingKeys.indexOf(key) < 0)

  // create new items with new keys
  console.log(`Creating ${newKeys.length} new items...`)
  await createItems(newKeys)

  console.log('Done!')
}

main().catch((e) => console.error(e))
