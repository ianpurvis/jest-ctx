import { afterAll, beforeAll, expect, jest, test } from 'jest-ctx'
import { randomString } from './helpers.js'

const beforeAllFn = jest.fn(() => randomString())
const testFn = jest.fn()
const afterAllFn = jest.fn()

beforeAll(beforeAllFn)
test('provides fn with the group context', testFn)
afterAll(afterAllFn)

afterAll(() => {
  const groupContext = beforeAllFn.mock.results[0].value
  expect(afterAllFn).toHaveBeenCalledWith(groupContext)
})
