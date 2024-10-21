import { NextResponse } from 'next/server'
import isValidJWT, { publicKey } from './lib/auth/isValidJWT'
import Cookies from 'js-cookie'
import { getSession } from './lib/auth'

// Atur route yang dilindungi
const protectedRoutes = ['/todos', '/profile']

export async function middleware(req) {
  const token = req.cookies.get('UNTAN_ACCESS') // Ambil token dari cookie (atau sesuaikan dengan storage/token yang Anda gunakan)
  const { pathname } = req.nextUrl

  // Jika route termasuk dalam protectedRoutes
  if (protectedRoutes.includes(pathname)) {
    // Cek apakah user sudah login (ada token atau tidak)
    if (!token) {
      // Redirect ke halaman login SSO jika belum login
      const loginUrl = new URL('http://localhost:3001', req.url)
      loginUrl.searchParams.set('redirectUrl', req.nextUrl.origin + '/authsso')
      return NextResponse.redirect(loginUrl)
    }

    // Cek apakah token valid
    const isValid = await isValidJWT(token)
    if (!isValid) {
      // Jika token tidak valid, redirect ke halaman login SSO
      const loginUrl = new URL('http://localhost:3001', req.url)
      loginUrl.searchParams.set('redirectUrl', req.nextUrl.origin + '/authsso')
      return NextResponse.redirect(loginUrl)
    }
  }

  // Untuk unprotected routes, lanjutkan tanpa perubahan
  return NextResponse.next()
}

// Konfigurasi pada route mana middleware ini akan berjalan
export const config = {
  matcher: ['/todos', '/profile'], // Tentukan route mana yang menggunakan middleware
}
