import { expect, jest } from '@jest/globals'
import { afterAll, beforeAll, beforeEach, describe, scopes, test } from '../src/index.js'
import { noop } from './helpers.js'

describe('given a table of arrays', () => {

  const table = [
    [ 0, 0, 0 ],
    [ 0, 1, 1 ],
    [ 1, 0, 1 ]
  ]

  let i, groupContextBefore, scopeBefore, scopeDepthBefore

  beforeAll(() => {
    i = 0
    scopeDepthBefore = scopes.length
    scopeBefore = scopes.at(-1)
    groupContextBefore = scopeBefore.groupContext
  })

  describe.each(table)('iteration %#', (...row) => {

    let groupContext, loopContext, testContext, scope, scopeDepth

    beforeAll((context) => {
      scopeDepth = scopes.length
      scope = scopes.at(-1)
      groupContext = context
      loopContext = {
        '0': row[0],
        '1': row[1],
        '2': row[2]
      }
    })

    beforeEach((context) => {
      testContext = context
    })

    test('calls the hook with a row from the table', () => {
      expect(row).toEqual(table[i])
    })

    test('pushes a copy of the parent scope onto the stack before all', () => {
      expect(scopeDepth).toEqual(scopeDepthBefore+1)
      expect(scope).not.toBe(scopeBefore)
      expect(groupContext).toMatchObject(groupContextBefore)
    })

    test('merges loop context into group context before all', () => {
      expect(groupContext).toMatchObject(loopContext)
    })

    test('assigns group context to test context before each', () => {
      expect(testContext).toBe(groupContext)
    })

    afterAll(() => { i++ })
  })

  test('calls the hook for all table rows', () => {
    expect(i).toEqual(table.length)
  })

  test('pops the scope off the stack after all', (context) => {
    expect(scopes.length).toEqual(scopeDepthBefore)
    expect(scopes.at(-1)).toBe(scopeBefore)
    expect(context).toBe(groupContextBefore)
  })
})

describe('given a table of objects', () => {

  const table = [
    { a: 0, b: 0, c: 0 },
    { a: 0, b: 1, c: 1 },
    { a: 0, b: 2, c: 2 }
  ]

  let i, groupContextBefore, scopeBefore, scopeDepthBefore

  beforeAll(() => {
    i = 0
    scopeDepthBefore = scopes.length
    scopeBefore = scopes.at(-1)
    groupContextBefore = scopeBefore.groupContext
  })

  describe.each(table)('iteration %#', (...row) => {

    let groupContext, loopContext, testContext, scope, scopeDepth

    beforeAll((context) => {
      scopeDepth = scopes.length
      scope = scopes.at(-1)
      groupContext = context
      loopContext = row[0]
    })

    beforeEach((context) => {
      testContext = context
    })

    test('calls the hook with a row from the table', () => {
      expect(row[0]).toBe(table[i])
    })

    test('pushes a copy of the parent scope onto the stack before all', () => {
      expect(scopeDepth).toEqual(scopeDepthBefore+1)
      expect(scope).not.toBe(scopeBefore)
      expect(groupContext).toMatchObject(groupContextBefore)
    })

    test('merges loop context into group context before all', () => {
      expect(groupContext).toMatchObject(loopContext)
    })

    test('assigns group context to test context before each', () => {
      expect(testContext).toBe(groupContext)
    })

    afterAll(() => { i++ })
  })

  test('calls the hook for all table rows', () => {
    expect(i).toEqual(table.length)
  })

  test('pops the scope off the stack after all', (context) => {
    expect(scopes.length).toEqual(scopeDepthBefore)
    expect(scopes.at(-1)).toBe(scopeBefore)
    expect(context).toBe(groupContextBefore)
  })
})

describe('given a table of values', () => {

  const table = [
    "a",
    "b",
    "c"
  ]

  let i, groupContextBefore, scopeBefore, scopeDepthBefore

  beforeAll(() => {
    i = 0
    scopeDepthBefore = scopes.length
    scopeBefore = scopes.at(-1)
    groupContextBefore = scopeBefore.groupContext
  })

  describe.each(table)('iteration %#', (...row) => {

    let groupContext, loopContext, testContext, scope, scopeDepth

    beforeAll((context) => {
      scopeDepth = scopes.length
      scope = scopes.at(-1)
      groupContext = context
      loopContext = {
        '0': row[0]
      }
    })

    beforeEach((context) => {
      testContext = context
    })

    test('calls the hook with a row from the table', () => {
      expect(row[0]).toBe(table[i])
    })

    test('pushes a copy of the parent scope onto the stack before all', () => {
      expect(scopeDepth).toEqual(scopeDepthBefore+1)
      expect(scope).not.toBe(scopeBefore)
      expect(groupContext).toMatchObject(groupContextBefore)
    })

    test('merges loop context into group context before all', () => {
      expect(groupContext).toMatchObject(loopContext)
    })

    test('assigns group context to test context before each', () => {
      expect(testContext).toBe(groupContext)
    })

    afterAll(() => { i++ })
  })

  test('calls the hook for all table rows', () => {
    expect(i).toEqual(table.length)
  })

  test('pops the scope off the stack after all', (context) => {
    expect(scopes.length).toEqual(scopeDepthBefore)
    expect(scopes.at(-1)).toBe(scopeBefore)
    expect(context).toBe(groupContextBefore)
  })
})
