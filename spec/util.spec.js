import { describe, expect, test } from '@jest/globals'
import { contextFromLoopArgs } from '../src/util.js'

describe('contextFromLoopArgs(...args)', () => {
  describe('given a single value', () => {
    const args = [ 'a' ]

    test('returns an object with property 0', () => {
      const result = contextFromLoopArgs(...args)
      expect(result).toEqual({ 0: 'a' })
    })
  })

  describe('given a single object', () => {
    const args = [{ 0: 'a', 1: 'b', 2: 'c' }]

    test('returns the object', () => {
      const result = contextFromLoopArgs(...args)
      expect(result).toBe(args[0])
    })
  })

  describe('given multiple args', () => {
    const args = [ 'a', 'b', 'c' ]

    test('returns an object with properties for each arg position', () => {
      const result = contextFromLoopArgs(...args)
      expect(result).toEqual({ 0: 'a', 1: 'b', 2: 'c' })
    })
  })
})
