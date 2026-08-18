/**
 * Runs a callback and returns a result object instead of throwing.
 * @module
 */

type SafeSuccess<T> = {
  data: T
  error: null
}

type SafeError = {
  data: null
  error: Error
}

/** The result of a wrapped callback, holding either data or an Error. */
export type SafeResult<T> = SafeSuccess<T> | SafeError

/** Runs a synchronous callback, returning its result or the Error it threw. */
export const safe = <T>(fn: () => T): SafeResult<T> => {
  try {
    const data = fn()
    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}

/** Awaits a promise-returning callback, returning its result or the Error it threw. */
export const safeAsync = async <T>(fn: () => Promise<T>): Promise<SafeResult<T>> => {
  try {
    const data = await fn()
    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}
