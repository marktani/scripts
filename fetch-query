require('isomorphic-fetch')

getMovies = async() => {

  const query = `
    query movies($first: Int!) {
      allMovies(first: $first) {
        title
      }
    }
  `

  const variables = {
    first: 3
  }

  const result = await fetch('https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables})
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch((e) => {
    console.log(e)
  })

  return result.data
}

main = async() => {
  const data = await getMovies()
  console.log(data)
}

main()
