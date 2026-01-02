type AsyncFn<T> = () => Promise<T>

type Success<T> = {
  response: T
  error: null
}

type Failure<E> = {
  response: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

export const tryCatch = async <T, E = Error>(
  promise: Promise<T> | AsyncFn<T>
): Promise<Result<T, E>> => {
  try {
    const response = typeof promise === 'function' ? await promise() : await promise
    return { response, error: null }
  } catch (error) {
    return { response: null, error: error as E }
  }
}
