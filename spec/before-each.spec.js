import { expect } from '@jest/globals'
import { beforeEach, stack, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const initialStack = [...stack]
const currentContext = stack.at(-1)

let received, accumulated = fakeContext()

beforeEach((context) => {
  received = context
  return accumulated
})

test('calls the hook with the current context', () => {
  expect(received).toBe(currentContext)
})

test('pushes the return value onto the context stack', (context) => {
  expect(context).toBe(accumulated)
  expect(stack).toEqual([...initialStack, accumulated])
})
