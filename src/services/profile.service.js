import apiClient from '@/lib/apiClient'

export const getProfileService = async () => {
  const res = await apiClient.get('/auth/profile')

  console.log('test')

  return res.data
}
