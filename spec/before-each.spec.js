import { expect, jest } from '@jest/globals'
import { beforeEach, test } from '../src/index.js'
import { randomString } from './helpers.js'

const beforeEachFn = jest.fn(() => randomString())
const secondBeforeEachFn = jest.fn(() => randomString())
const testFn = jest.fn()

beforeEach(beforeEachFn)
beforeEach(secondBeforeEachFn)
test('mock test', testFn)
test('mock test', testFn)

test('calls the hook with any test context', () => {
  expect(beforeEachFn).toHaveBeenNthCalledWith(1, undefined)
})

test('replaces the test context with the result', () => {
  for (let i = 0, testContext; i < testFn.mock.calls.length; i++) {
    testContext = beforeEachFn.mock.results[i].value
    expect(secondBeforeEachFn).toHaveBeenNthCalledWith(i+1, testContext)
    testContext = secondBeforeEachFn.mock.results[i].value
    expect(testFn).toHaveBeenNthCalledWith(i+1, testContext)
  }
})
