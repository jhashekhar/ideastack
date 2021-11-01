const jwt = require('jsonwebtoken')


function getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY)
}

function getUserId(req) {
  const token = req.headers.authorization.split(' ')[1] || ''
  
  if (token) {
    const { email } = getTokenPayload(token)
    return email
  } else {
    throw new Error('Not Authenticated')
  }
}

module.exports = {
  getUserId
}
