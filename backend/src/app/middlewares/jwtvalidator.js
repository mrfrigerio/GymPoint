import jwt from 'jsonwebtoken'

import { promisify } from 'util'
import authConfig from '../../config/auth'

export default async function(req, res, next) {
  const { authorization } = req.headers
  if (authorization) {
    const [, token] = authorization.split(' ')

    try {
      const { id } = await promisify(jwt.verify)(token, authConfig.secret)
      req.userId = id
      return next()
    } catch (error) {
      // Fluxo de execução entra no catch caso o token seja inválido
      return res.status(401).json({ error: 'Invalid session token.' })
    }
  }

  return res.status(401).json({ error: 'Session token is missing.' })
}
