/**
 * Picks the singular or plural form of a word for a count.
 *
 * The category comes from `Intl.PluralRules` for `en-US`, but the plural is formed by appending `s`
 * with no English spelling rules applied, so irregular words come out wrong.
 *
 * @module
 */

const pluralRules = new Intl.PluralRules('en-US')

/**
 * Picks the singular or plural form of a word for a count, optionally prefixed with the count itself.
 *
 * `Intl.PluralRules` decides which category the count falls into, but the plural is built by appending `s`
 * to the singular. There are no English spelling rules behind it, so anything irregular comes out wrong:
 * `pluralize('box', 2)` returns `'2 boxs'`, not `'2 boxes'`. Pass a word that pluralizes with a plain `s`,
 * or format the irregular cases yourself.
 *
 * @param singular The singular form of the word.
 * @param count Decides which form is used, and is prefixed to the result unless `includeCount` is false.
 * @param includeCount Whether to prefix the count and a space. Defaults to true.
 *
 * @example
 * ```ts
 * pluralize('file', 1) // '1 file'
 * pluralize('file', 2) // '2 files'
 * pluralize('file', 2, false) // 'files'
 * ```
 */
export const pluralize = (singular: string, count: number, includeCount = true): string => {
  const form = pluralRules.select(count)
  const word = form === 'one' ? singular : `${singular}s`

  if (includeCount) {
    return `${count} ${word}`
  }

  return word
}
