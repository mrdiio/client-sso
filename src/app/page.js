import { getSession, getToken } from '@/lib/auth'

export default async function Home() {
  const token = await getSession()

  console.log('token', token)

  return (
    <>
      <h1>Home</h1>
      {token ? <p>Token: {JSON.stringify(token, null, 2)}</p> : <p>No token</p>}
    </>
  )
}
