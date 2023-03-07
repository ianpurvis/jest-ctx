import { expect } from '@jest/globals'
import { afterAll, beforeAll, beforeEach, describe, scopes, test } from '../src/index.js'
import { noop } from './helpers.js'

describe('given a table of arrays', () => {

  const table = [
    [ 0, 0, 0 ],
    [ 0, 1, 1 ],
    [ 1, 0, 1 ]
  ]

  let scopesBefore, i

  beforeAll(() => {
    scopesBefore = [...scopes]
    i = 0
  })

  describe.each(table)('iteration %#', (...row) => {

    test('calls the hook with a row from the table', () => {
      expect(row).toEqual(table[i++])
    })

    test('pushes a new scope onto the stack before all', () => {
      expect(scopes).toHaveLength(scopesBefore.length+1)
      const scope = scopes.at(-1)
      const scopeBefore = scopesBefore.at(-1)
      expect(scope).toEqual(scopeBefore)
      expect(scope).not.toBe(scopeBefore)
    })

    test('assigns group context to test context before each', (context) => {
      const scope = scopes.at(-1)
      expect(context).toBe(scope.testContext)
    })

  })

  // See hooks below for assertions.
  test('calls the hook for all table rows', noop)
  test('pops the scope off the stack after all', noop)

  afterAll(() => {
    expect(i).toEqual(table.length)
  })

  afterAll((context) => {
    expect(scopes).toEqual(scopesBefore)
    const scopeBefore = scopesBefore.at(-1)
    expect(context).toBe(scopeBefore.groupContext)
  })
})
