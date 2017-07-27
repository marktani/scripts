const { fromEvent } = require('graphcool-lib')

const pat = '__PAT__'
const projectId = 'cixne4sn40c7m0122h8fabni1'

const event = {
  context: {
    graphcool: {
      projectId,
      // include a PAT if you need full read/write access on the server-side
      // pat,
    }
  }
}

const api = fromEvent(event).api('simple/v1')

const query = `
query {
  allMovies {
    id
    title
  }
}
`

api.request(query)
  .then(data => console.log(data))