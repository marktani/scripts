const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/__PROJECT_ID__')
})

const createEntry = async() => {
  // define a mutation with json and jsonList variables
  const mutation = `($json: Json, $jsonList: [Json!]) {
    createEntry(
      json: $json
      jsonList: $jsonList
    ) {
      id
      jsonList
    }
  }`

  // stringify an object for a single Json field
  const json = JSON.stringify({a: 2, message: "hello"})

  // stringify an array of objects for a [Json!] field
  const jsonList = JSON.stringify([{a: 2, message: "hello"}, {b: 3, message: "bye"}])

  // pass vars to mutation
  const vars = {
    json,
    jsonList
  }

  return await client.mutate(mutation, vars)
}

const main = async() => {
  const res = await createEntry()
  console.log('Created new entry:')
  console.log(res.createEntry)
  console.log('Done!')
}

main().catch((e) => console.error(e))
