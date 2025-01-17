import jwt from 'jsonwebtoken'

function authMiddeware (req, res, next) {
  const token = req.headers['authorization']
  if (!token) { return res.status(404).send({error: 'No token provided'}) }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) { return res.status(404).send({error: 'Invalid token'}) }
    req.userId = decoded.id
    next()
  })

}

export default authMiddeware