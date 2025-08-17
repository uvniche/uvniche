export const config = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://uvniche.com' 
    : 'http://localhost:3000'
} as const
