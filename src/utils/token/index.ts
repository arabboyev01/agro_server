import jwt from 'jsonwebtoken'

function generateToken(id: number) {
  const jwtSecret = process.env.JWT_SIGN || 'secret'

  const token = jwt.sign({ user_id: id }, jwtSecret)

  return token
}
export { generateToken }
