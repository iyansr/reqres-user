export type Credentials = {
  email: string
  password: string
}

export type AuthResult = {
  token: string
}

export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type Support = {
  url: string
  text: string
}

export type GeneralResponse<T> = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
  support: Support
}
