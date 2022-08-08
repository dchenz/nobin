/**
 * ResponseSuccess is returned by the API on a successful request:
 *    - "success" is set to true
 *    - "data" may contain results from the request
 */
export type ResponseSuccess<T> = {
  success: true
  data: T
}

/**
 * ResponseFail is returned by the API on a failed request:
 *    - "success" is set to false
 *    - "data" may contain an error message
 */
export type ResponseFail = {
  success: false
  data: string
}

// Borrowed from Haskell...
export type Maybe<T> = ResponseSuccess<T> | ResponseFail