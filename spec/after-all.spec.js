import { expect, jest } from '@jest/globals'
import { afterAll, beforeAll, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const beforeAllFn = jest.fn(() => fakeContext())
const testFn = jest.fn()
const afterAllFn = jest.fn()

beforeAll(beforeAllFn)
test('provides fn with the group context', testFn)
afterAll(afterAllFn)

afterAll(() => {
  const groupContext = beforeAllFn.mock.results[0].value
  expect(afterAllFn).toHaveBeenCalledWith(groupContext)
})
