exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: {
        Allow: 'Get',
      },
    }
  }

  const data = JSON.parse(event.body)
  const name = data.name || 'World'

  return {
    statusCode: 200,
    body: `Hello, ${name}`,
  }
}
