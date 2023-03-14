import { expect, jest } from '@jest/globals'
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from '../src/index.js'
import { randomString } from './helpers.js'

const outerBeforeAllFn = jest.fn(() => randomString())
const outerBeforeEachFn = jest.fn(() => randomString())
const innerBeforeAllFn = jest.fn(() => randomString())
const innerBeforeEachFn = jest.fn(() => randomString())
const innerTestFn = jest.fn()
const innerAfterAllFn = jest.fn()
const innerAfterEachFn = jest.fn()

// Warning: Do not change the following sequence:

beforeAll(outerBeforeAllFn)
beforeEach(outerBeforeEachFn)

describe('mock describe', () => {
  beforeAll(innerBeforeAllFn)
  beforeEach(innerBeforeEachFn)
  test('mock test', innerTestFn)
  afterAll(innerAfterAllFn)
  afterEach(innerAfterEachFn)
})

test('copies parent group context to group context before all', () => {
  const parentGroupContext = outerBeforeAllFn.mock.results[0].value
  expect(innerBeforeAllFn).toHaveBeenCalledWith(parentGroupContext)
})

test('assigns parent test context to test context before each', () => {
  const parentTestContext = outerBeforeEachFn.mock.results[0].value
  expect(innerBeforeEachFn).toHaveBeenCalledWith(parentTestContext)
})

test('provides group context to group-scope hooks', () => {
  const innerGroupContext = innerBeforeAllFn.mock.results[0].value
  expect(innerAfterAllFn).toHaveBeenCalledWith(innerGroupContext)
})

test('provides test context to test-scope hooks', () => {
  const innerTestContext = innerBeforeEachFn.mock.results[0].value
  expect(innerTestFn).toHaveBeenCalledWith(innerTestContext)
  expect(innerAfterEachFn).toHaveBeenCalledWith(innerTestContext)
})

test('does not leak group context', (context) => {
  const outerGroupContext = outerBeforeAllFn.mock.results[0].value
  const innerGroupContext = innerBeforeAllFn.mock.results[0].value
  expect(context).not.toMatch(innerGroupContext)
  expect(outerBeforeEachFn.mock.calls.length).toBeGreaterThan(1)
  expect(outerBeforeEachFn).toHaveBeenNthCalledWith(1, innerGroupContext)
  for (let n = 2; n <= outerBeforeEachFn.mock.calls.length; n++) {
    expect(outerBeforeEachFn).toHaveBeenNthCalledWith(n, outerGroupContext)
  }
})

test('does not leak test context', (context) => {
  const innerTestContext = innerBeforeAllFn.mock.results[0].value
  expect(context).not.toMatch(innerTestContext)
})
