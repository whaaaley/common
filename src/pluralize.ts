/**
 * Picks the singular or plural form of a word for a count.
 * @module
 */

const pluralRules = new Intl.PluralRules('en-US')

/** Returns the count with the singular or plural form of the word, appending s with no spelling rules. */
export const pluralize = (singular: string, count: number, includeCount = true): string => {
  const form = pluralRules.select(count)
  const word = form === 'one' ? singular : `${singular}s`

  if (includeCount) {
    return `${count} ${word}`
  }

  return word
}
