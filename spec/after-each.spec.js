import { expect, jest } from '@jest/globals'
import { afterAll, afterEach, beforeEach, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const beforeEachFn = jest.fn(() => fakeContext())
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
