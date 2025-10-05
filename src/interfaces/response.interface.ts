export interface IResponseSuccess<T> {
  data: T
  status: number
  message: string
}

export interface IResponseError {
  status: number
  message: string
}
