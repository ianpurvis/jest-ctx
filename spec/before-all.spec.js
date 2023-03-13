import { expect, jest } from '@jest/globals'
import { beforeAll, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const beforeAllFn = jest.fn(() => fakeContext())
const testFn = jest.fn()

beforeAll(beforeAllFn)
beforeAll(beforeAllFn)
test('mock test', testFn)

test('calls the hook with any group context', () => {
  expect(beforeAllFn).toHaveBeenNthCalledWith(1, undefined)
})

test('replaces the group context with the result', () => {
  const returnedContext = beforeAllFn.mock.results[0].value
  expect(beforeAllFn).toHaveBeenNthCalledWith(2, returnedContext)
})
