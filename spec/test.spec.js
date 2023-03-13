import { expect, jest } from '@jest/globals'
import { it, test } from '../src/index.js'

const testFn = jest.fn()

test('mock test', testFn)

test('receives any test context', () => {
  expect(testFn).toHaveBeenCalledWith(undefined)
})

test('is aliased as it', () => {
  expect(it).toBe(test)
})
