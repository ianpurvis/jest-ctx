import { expect } from '@jest/globals'
import { afterAll, describe, scopes, test } from '../src/index.js'
import { noop } from './helpers.js'

describe('describe', () => {
  test('pushes a new scope onto the stack before all', () => {
    expect(scopes).toHaveLength(2)
    const [ original, current ] = scopes
    expect(current).toEqual(original)
    expect(current).not.toBe(original)
  })

  test('assigns group context to test context before each', (context) => {
    const scope = scopes.at(-1)
    expect(context).toBe(scope.testContext)
  })

  // See hook below for assertions.
  test('pops the scope off the stack after all', noop)
})

afterAll((context) => {
  const { groupContext } = scopes.at(-1)
  expect(context).toBe(groupContext)
})
