import { expect } from '@jest/globals'
import { beforeEach, scopes, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

let original, received, returned = fakeContext()

beforeEach((context) => {
  original = scopes.at(-1).testContext
  received = context
  return returned
})

test('calls the hook with the test context', () => {
  expect(received).toBe(original)
})

test('replaces the test context with the return value', (context) => {
  const final = scopes.at(-1).testContext
  expect(final).toBe(returned)
  expect(context).toBe(returned)
})
