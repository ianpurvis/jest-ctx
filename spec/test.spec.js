import { expect, it, jest, test } from 'jest-ctx'
import { wait } from './helpers.js'

const testFn = jest.fn()

test('mock test', testFn)

test('calls fn with any test context', () => {
  expect(testFn).toHaveBeenCalledWith(undefined)
})

test.failing('supports timeout', () => wait(2), 1)

test('is aliased as it', () => {
  expect(it).toBe(test)
})
