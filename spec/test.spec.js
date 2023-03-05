import { expect } from '@jest/globals'
import { it, stack, test } from '../src/index.js'

const initialStack = [...stack]
const currentContext = stack.at(-1)

test('calls the test with the current context', (context) => {
  expect(context).toBe(currentContext)
})

test('does not mutate the context stack', () => {
  expect(stack).toEqual(initialStack)
})

test('is aliased as it', () => {
  expect(it).toBe(test)
})
