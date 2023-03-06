import { expect } from '@jest/globals'
import { afterEach, scopes, test } from '../src/index.js'
import { noop } from './helpers.js'

// See hook below for assertions.
test('calls the hook with the current test context', noop)

afterEach((context) => {
  const { testContext } = scopes.at(-1)
  expect(context).toBe(testContext)
})
