import { expect, jest } from '@jest/globals'
import { beforeAll, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const beforeAllFn = jest.fn(() => fakeContext())
const testFn = jest.fn()

beforeAll(beforeAllFn)
beforeAll(beforeAllFn)
test('mock test', testFn)

test('calls the hook with the group context', () => {
  const initialGroupContext = {}
  expect(beforeAllFn).toHaveBeenCalledWith(initialGroupContext)
})

test('replaces the group context with the result', () => {
  const returnedContext = beforeAllFn.mock.results[0].value
  expect(beforeAllFn).toHaveBeenCalledWith(returnedContext)
})
