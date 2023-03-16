import { afterAll, afterEach, beforeEach, expect, jest, test } from '../src/index.js'
import { randomString } from './helpers.js'

const beforeEachFn = jest.fn(() => randomString())
const testFn = jest.fn()
const afterEachFn = jest.fn()

beforeEach(beforeEachFn)
test('provides fn with the test context', testFn)
test('mock test', testFn)
afterEach(afterEachFn)

afterAll(() => {
  for (let i = 0, testContext; i < testFn.mock.calls.length; i++) {
    testContext = beforeEachFn.mock.results[i].value
    expect(afterEachFn).toHaveBeenNthCalledWith(i+1, testContext)
  }
})
