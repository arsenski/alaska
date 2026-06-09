export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (import.meta.client) {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  const get = async (url: string) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        headers: getHeaders()
      })
      return await response.json()
    } catch (error) {
      console.error('GET Error:', error)
      return []
    }
  }

  const post = async (url: string, data: any) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error('POST Error:', error)
      throw error
    }
  }

  const del = async (url: string) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: 'DELETE',
        headers: getHeaders()
      })
      return await response.json()
    } catch (error) {
      console.error('DELETE Error:', error)
      throw error
    }
  }

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch(`${baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': getHeaders()['Authorization'] || ''
      },
      body: formData
    })
    return response.json()
  }

  const put = async (url: string, data: any) => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    console.error('PUT Error:', error)
    throw error
  }
}

// Добавь в return
return { get, post, put, del, uploadImage }
}