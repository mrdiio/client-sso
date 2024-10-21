import { cookies } from 'next/headers'

export default async function removeCookie() {
  const removeCookie = cookies()
  removeCookie.delete('UNTAN_ACCESS')
}
