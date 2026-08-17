/**
 * Runs a callback and hands back `{ data, error }` instead of throwing.
 *
 * Use {@link safe} for a synchronous callback and {@link safeAsync} for one that returns a promise.
 * Either way `error` is always an `Error`, so a thrown value that is not an `Error` gets wrapped in one.
 *
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

/**
 * The outcome of a call wrapped by {@link safe} or {@link safeAsync}.
 *
 * Exactly one side is filled in. On success `data` holds the returned value and `error` is `null`.
 * On failure `error` holds an `Error` and `data` is `null`. Checking `error` first narrows `data` to `T`,
 * so there is no need to assert it is present.
 *
 * @example
 * ```ts
 * const result = safe(() => JSON.parse(input))
 *
 * if (result.error) {
 *   return
 * }
 *
 * result.data // narrowed, no longer null
 * ```
 */
export type SafeResult<T> = SafeSuccess<T> | SafeError

/**
 * Calls a synchronous function and captures a throw as a value.
 *
 * A thrown value that is not an `Error` is wrapped in one via `String(value)`, so callers can rely on
 * `error.message` without checking the type of what was thrown.
 *
 * @param fn The function to call. Anything it throws is caught.
 * @returns Its return value under `data`, or the caught failure under `error`.
 *
 * @example
 * ```ts
 * const { data, error } = safe(() => JSON.parse(input))
 *
 * if (error) {
 *   console.error(error.message)
 *   return
 * }
 * ```
 */
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

/**
 * Awaits a promise-returning function and captures a rejection as a value.
 *
 * The async counterpart to {@link safe}. A rejection value that is not an `Error` is wrapped in one,
 * and a synchronous throw from `fn` before it returns its promise is caught too.
 *
 * @param fn The function to call and await.
 * @returns A promise for its resolved value under `data`, or the caught failure under `error`.
 *
 * @example
 * ```ts
 * const { data, error } = await safeAsync(() => fetch(url))
 *
 * if (error) {
 *   return
 * }
 *
 * console.log(data.status)
 * ```
 */
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
