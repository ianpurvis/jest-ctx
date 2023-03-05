import { afterAll, expect, test } from '@jest/globals'
import { afterEach, stack } from '../src/index.js'
import { fakeContext, noop } from './helpers.js'

const initialStack = [...stack]
const currentContext = stack.at(-1)

let received, returned = fakeContext()

afterEach((context) => {
  received = context
  return returned
})

// See afterAll for assertions:
test('calls the hook with the current context', noop)
test('does not mutate the stack', noop)

afterAll(() => {
  expect(received).toBe(currentContext)
  expect(stack).toEqual(initialStack)
})
