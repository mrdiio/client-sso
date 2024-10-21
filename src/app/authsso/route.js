import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { publicKey } from '@/lib/auth/isValidJWT'

export async function GET(req) {
  const token = req.nextUrl.searchParams.get('token')

  try {
    jwt.verify(token, publicKey)

    const cookieStore = cookies()
    cookieStore.set('UNTAN_ACCESS', token)
    return NextResponse.redirect('http://localhost:3002/todos')
  } catch (error) {
    return NextResponse.redirect('http://localhost:3002')
  }
}
