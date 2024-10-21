import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { publicKey } from './auth/isValidJWT'

// create a getToken function that returns the token from the cookies()
export async function getToken() {
  const token = cookies().get('UNTAN_ACCESS').value

  return token
}

export async function getSession() {
  try {
    const token = await getToken()
    const payload = jwt.verify(token, publicKey)

    return payload
  } catch (error) {
    return null
  }
}
