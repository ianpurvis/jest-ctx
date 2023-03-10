import { expect } from '@jest/globals'
import { beforeEach, it, test } from '../src/index.js'

let testContext
beforeEach((context) => {
  testContext = context
})

test('receives the test context', (context) => {
  expect(context).toBe(testContext)
})

test('does not mutate the scope stack', (context) => {
  expect(context).toBe(testContext)
})

test('is aliased as it', () => {
  expect(it).toBe(test)
})
