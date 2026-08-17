const pluralRules = new Intl.PluralRules('en-US')

export const pluralize = (singular: string, count: number, includeCount = true): string => {
  const form = pluralRules.select(count)
  const word = form === 'one' ? singular : `${singular}s`

  if (includeCount) {
    return `${count} ${word}`
  }

  return word
}
