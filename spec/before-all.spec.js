import { expect } from '@jest/globals'
import { beforeAll, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

let received, returned = fakeContext()

beforeAll((context) => {
  received = context
  return returned
})

test('calls the hook with the group context', () => {
  const initialGroupContext = {}
  expect(received).toEqual(initialGroupContext)
})

test('replaces the group context with the return value', (context) => {
  expect(context).toEqual(returned)
})
