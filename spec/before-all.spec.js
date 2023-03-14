import { beforeAll, expect, jest, test } from '../src/index.js'
import { randomString } from './helpers.js'

const beforeAllFn = jest.fn(() => randomString())
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
