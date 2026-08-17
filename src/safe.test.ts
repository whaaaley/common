import { describe, it } from 'node:test'
import { assertEquals, assertInstanceOf } from '@std/assert'
import { safe, safeAsync } from './safe.ts'

describe('All Safe Tests', () => {
  describe('safe', () => {
    it('returns the value and a null error on success', () => {
      // Arrange
      const fn = (): number => 42

      // Act
      const { data, error } = safe(fn)

      // Assert
      assertEquals(data, 42)
      assertEquals(error, null)
    })

    it('returns a null data and the thrown Error on failure', () => {
      // Arrange
      const boom = new Error('boom')

      // Act
      const { data, error } = safe((): number => {
        throw boom
      })

      // Assert
      assertEquals(data, null)
      assertEquals(error, boom)
    })

    it('wraps a non-Error throw in an Error', () => {
      // Arrange
      const fn = (): number => {
        throw 'plain string'
      }

      // Act
      const { error } = safe(fn)

      // Assert
      assertInstanceOf(error, Error)
      assertEquals(error.message, 'plain string')
    })

    it('stringifies a thrown object when wrapping it', () => {
      // Arrange
      const fn = (): number => {
        throw { code: 500 }
      }

      // Act
      const { error } = safe(fn)

      // Assert
      assertInstanceOf(error, Error)
      assertEquals(error.message, '[object Object]')
    })

    it('preserves an Error subclass rather than rewrapping it', () => {
      // Arrange
      const thrown = new TypeError('wrong type')

      // Act
      const { error } = safe((): number => {
        throw thrown
      })

      // Assert
      assertInstanceOf(error, TypeError)
      assertEquals(error, thrown)
    })

    it('treats a returned undefined as success', () => {
      // Arrange
      const fn = (): undefined => undefined

      // Act
      const { data, error } = safe(fn)

      // Assert
      assertEquals(data, undefined)
      assertEquals(error, null)
    })
  })

  describe('safeAsync', () => {
    it('returns the resolved value and a null error on success', async () => {
      // Arrange
      const fn = (): Promise<string> => Promise.resolve('ok')

      // Act
      const { data, error } = await safeAsync(fn)

      // Assert
      assertEquals(data, 'ok')
      assertEquals(error, null)
    })

    it('returns a null data and the rejection Error on failure', async () => {
      // Arrange
      const boom = new Error('async boom')
      const fn = (): Promise<string> => Promise.reject(boom)

      // Act
      const { data, error } = await safeAsync(fn)

      // Assert
      assertEquals(data, null)
      assertEquals(error, boom)
    })

    it('wraps a non-Error rejection in an Error', async () => {
      // Arrange
      const fn = (): Promise<string> => Promise.reject('plain rejection')

      // Act
      const { error } = await safeAsync(fn)

      // Assert
      assertInstanceOf(error, Error)
      assertEquals(error.message, 'plain rejection')
    })

    it('catches a synchronous throw from the callback body', async () => {
      // Arrange
      const boom = new Error('threw before the promise')
      const fn = (): Promise<string> => {
        throw boom
      }

      // Act
      const { data, error } = await safeAsync(fn)

      // Assert
      assertEquals(data, null)
      assertEquals(error, boom)
    })
  })
})
