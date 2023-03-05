import { afterAll as _afterAll, expect, test } from '@jest/globals'
import { afterAll, stack } from '../src/index.js'
import { fakeContext, noop } from './helpers.js'

const initialStack = [...stack]
const currentContext = stack.at(-1)

let received, returned = fakeContext()

afterAll((context) => {
  received = context
  return returned
})

// See _afterAll for assertions:
test('calls the hook with the current context', noop)
test('does not mutate the stack', noop)

_afterAll(() => {
  expect(received).toBe(currentContext)
  expect(stack).toEqual(initialStack)
})
