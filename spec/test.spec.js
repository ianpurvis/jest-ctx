import { expect, jest } from '@jest/globals'
import { it, test } from '../src/index.js'

const testFn = jest.fn()

test('mock test', testFn)

test('receives the test context', () => {
  const initialTestContext = {}
  expect(testFn).toHaveBeenCalledWith(initialTestContext)
})

test('is aliased as it', () => {
  expect(it).toBe(test)
})
