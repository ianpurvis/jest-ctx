import { expect } from '@jest/globals'
import { afterEach, beforeEach, test } from '../src/index.js'
import { noop } from './helpers.js'

let testContext
beforeEach((context) => {
  testContext = context
})

// See hook below for assertions.
test('calls the hook with the current test context', noop)

afterEach((context) => {
  expect(context).toBe(testContext)
})
