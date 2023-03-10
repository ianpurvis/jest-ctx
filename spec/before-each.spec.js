import { expect } from '@jest/globals'
import { beforeEach, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

let received, returned = fakeContext()

beforeEach((context) => {
  received = context
  return returned
})

test('calls the hook with the test context', () => {
  const initialContext = {}
  expect(received).toEqual(initialContext)
})

test('replaces the test context with the return value', (context) => {
  expect(context).toEqual(returned)
})
