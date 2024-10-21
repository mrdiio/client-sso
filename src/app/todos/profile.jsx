'use client'
import { getProfileService } from '@/services/profile.service'
import { useQuery } from '@tanstack/react-query'

export default function Profile() {
  // get stored cookie
  const token = ''

  

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      fetch('http://localhost:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        return res.json()
      }),
  })

  return (
    <div>
      <div>
        {data ? (
          <div>
            <div>Nama : {data.data.name}</div>
            <div>Email : {data.data.email}</div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}
