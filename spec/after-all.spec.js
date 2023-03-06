import { expect } from '@jest/globals'
import { afterAll, scopes, test } from '../src/index.js'
import { noop } from './helpers.js'

// See hook below for assertions.
test('calls the hook with the current group context', noop)

afterAll((context) => {
  const { groupContext } = scopes.at(-1)
  expect(context).toBe(groupContext)
})
