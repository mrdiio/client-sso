'use client'
import { getProfileService } from '@/services/profile.service'
import { useQuery } from '@tanstack/react-query'

export default function Profile() {
  const { data, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileService(),
    retry: 1,
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

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
