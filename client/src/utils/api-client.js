function client(endpoint, {body, ...customConfig} = {}) {
  const token = window.localStorage.getItem('__primitrade_token__')
  console.log('token granted!')
  const headers = {'content-type': 'application/json'}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  console.log(`${process.env.REACT_APP_API_URL}/${endpoint}`)
  console.log(config)
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(r => r.json())
}

export default client
