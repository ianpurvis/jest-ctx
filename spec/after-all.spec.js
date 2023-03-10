import { expect } from '@jest/globals'
import { afterAll, beforeAll, test } from '../src/index.js'
import { noop } from './helpers.js'

let groupContext
beforeAll((context) => {
  groupContext = context
})

// See hook below for assertions.
test('calls the hook with the current group context', noop)

afterAll((context) => {
  expect(context).toBe(groupContext)
})
