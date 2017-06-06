const { request } = require('graphql-request')

const query = `mutation jsons($json: Json!, $jsonList: [Json!]!) {
  createEntry(
    json: $json
    jsonList: $jsonList
  ) {
    id
    json
    jsonList
  }
}`

const variables = {
  json: JSON.stringify({a: 'a'}),
  jsonList: [JSON.stringify({a: 'a'})]
}

request('https://api.graph.cool/simple/v1/__PROJECT_ID__', query, variables)
  .then(({ createJsons }) => console.log(createJsons))
