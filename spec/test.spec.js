import { expect } from '@jest/globals'
import { it, scopes, test } from '../src/index.js'

test('receives the current test context', (context) => {
  const current = scopes.at(-1)
  expect(context).toBe(current.testContext)
})

test('does not mutate the scope stack', () => {
  expect(scopes).toHaveLength(1)
  const first = scopes[0]
  expect(first.groupContext).toEqual({})
  expect(first.testContext).toEqual({})
})

test('is aliased as it', () => {
  expect(it).toBe(test)
})
