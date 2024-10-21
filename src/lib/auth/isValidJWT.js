import { jwtDecode, InvalidTokenError } from 'jwt-decode'

export const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAunA8cEIUIym/FzZmGs4j
e1yoq+miSe8dYmj1oBmcAqGzqF4GPTMgn1M03cDEJErvdSFAv/D/sDDqNNQ9ZSpi
wxKMdzqWTIdrhwrsFm23le9BGp714YRdtXDFQ6XI4AFTKqh79gPvb9+Fvd9dXjfI
Oc7FynoLS5moLtICVMS/gxwVfy54DCx4pvxIks3PRg3nyx7rnEtPXUE7rO2cVyu+
THdv/J1uaOsKfZfO6pOCxfHdFXdzlejr+xMRQ8FGpjt9up+4EBtF4GXHBA4A9ppR
TJLDvK+WBtw38ChAl7LT1Yike1GL/a+snBXAVhMD5M7Jr3HH3oCu/8tMjTRdBLKC
LJlcRQ8KB6QegD+O+leIC3aycusHJyjQ3I1DZWnjhoHWZhQrAFPFcB/ftqbX3iP5
sDM3mRSJhruI+IkBy/PJuREclxizQbhWtpeIqGqVNK45YAUrQfzW8BaTFkhNUMpQ
jILhV+QlbCdjGn6GvB9x1YTXTg5xVnFUSd0E8OptoPXHM9J5ZyIYQxStewrjTT+j
O1MODsyHXFCc1sbylbryCmP5GX6KFMUxEMcVKsV0dCOY2dTCDUVXg/wj0Gp7bkQR
eumNclQ5Gd9wbnSwNYlCxWZiMGfx2T/ZoPVX/vntPFtPG+JBZ02jC6VlmFezAwxL
1RZ1P7OQTt8hVLdws7noGhUCAwEAAQ==
-----END PUBLIC KEY-----
`

export default async function isValidJWT(token) {
  // console.log('token', token.value)

  try {
    const payload = jwtDecode(token.value)

    const currentTime = Math.floor(Date.now() / 1000)

    if (payload.exp < currentTime) {
      throw new InvalidTokenError('Token expired')
    }

    return true
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return false
    }
    throw error
  }
}

export function getSession(token) {
  return jwtDecode(token.value)
}
