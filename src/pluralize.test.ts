import { describe, it } from 'node:test'
import { assertEquals } from '@std/assert'
import { pluralize } from './pluralize.ts'

describe('All Pluralize Tests', () => {
  describe('selecting a form', () => {
    it('uses the singular form for a count of one', () => {
      // Act
      const result = pluralize('file', 1)

      // Assert
      assertEquals(result, '1 file')
    })

    it('uses the plural form for a count of zero', () => {
      // Act
      const result = pluralize('file', 0)

      // Assert
      assertEquals(result, '0 files')
    })

    it('uses the plural form for a count of two', () => {
      // Act
      const result = pluralize('file', 2)

      // Assert
      assertEquals(result, '2 files')
    })

    it('uses the plural form for a negative count', () => {
      // Act
      const result = pluralize('file', -3)

      // Assert
      assertEquals(result, '-3 files')
    })

    it('uses the plural form for a fractional count', () => {
      // Act
      const result = pluralize('file', 1.5)

      // Assert
      assertEquals(result, '1.5 files')
    })
  })

  describe('omitting the count', () => {
    it('returns the singular word alone for a count of one', () => {
      // Act
      const result = pluralize('file', 1, false)

      // Assert
      assertEquals(result, 'file')
    })

    it('returns the plural word alone for any other count', () => {
      // Act
      const result = pluralize('file', 3, false)

      // Assert
      assertEquals(result, 'files')
    })
  })

  describe('known limitations', () => {
    // Intl.PluralRules treats -1 as the `one` category, so the count reads as a negative singular.
    it('uses the singular form for a count of negative one', () => {
      // Act
      const result = pluralize('file', -1)

      // Assert
      assertEquals(result, '-1 file')
    })

    // Intl.PluralRules picks the category, but the suffix is a bare `s` with no English spelling rules.
    it('appends a bare s to a word needing es', () => {
      // Act
      const result = pluralize('box', 2)

      // Assert
      assertEquals(result, '2 boxs')
    })

    it('appends a bare s to a word ending in y', () => {
      // Act
      const result = pluralize('city', 2)

      // Assert
      assertEquals(result, '2 citys')
    })

    it('appends a bare s to an irregular plural', () => {
      // Act
      const result = pluralize('person', 2)

      // Assert
      assertEquals(result, '2 persons')
    })
  })
})
