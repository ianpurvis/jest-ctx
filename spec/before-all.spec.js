import { expect } from '@jest/globals'
import { beforeAll, scopes, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

let original, received, returned = fakeContext()

beforeAll((context) => {
  original = scopes.at(-1).groupContext
  received = context
  return returned
})

test('calls the hook with the group context', () => {
  expect(received).toBe(original)
})

test('replaces the group context with the return value', (context) => {
  const final = scopes.at(-1).groupContext
  expect(final).toBe(returned)
  expect(context).toBe(returned)
})
