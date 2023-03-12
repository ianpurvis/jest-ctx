import { expect, jest } from '@jest/globals'
import { afterAll, beforeAll, beforeEach, describe, test } from '../src/index.js'
import { contextFromLoopArgs } from '../src/util.js'
import { fakeContext } from './helpers.js'

const subjects = [
  {
    name: 'a table of arrays',
    table:[
      [ 0, 0, 0 ],
      [ 0, 1, 1 ],
      [ 1, 0, 1 ]
    ]
  },
  {
    name: 'a table of objects',
    table: [
      { a: 0, b: 0, c: 0 },
      { a: 0, b: 1, c: 1 },
      { a: 1, b: 0, c: 1 }
    ]
  },
  {
    name: 'a table of values',
    table: [
      1,
      2,
      3
    ]
  }
]

for (const { name, table } of subjects) {
  describe(`given ${name}`, () => {
    const outerBeforeAllFn = jest.fn(() => fakeContext())
    const innerBeforeAllFn = jest.fn(() => fakeContext())
    const innerTestFn = jest.fn()
    const describeFn = jest.fn(() => {
      beforeAll(innerBeforeAllFn)
      test('mock test', innerTestFn)
    })

    beforeAll(outerBeforeAllFn)
    describe.each(table)('mock describe %#', describeFn)

    test('creates a group for each row of the table', () => {
      for (let i = 0, row, expected; i < table.length; i++) {
        row = table[i]
        expected = Array.isArray(row) ? row : [row]
        expect(describeFn).toHaveBeenNthCalledWith(i+1, ...expected)
      }
      expect(describeFn).toHaveBeenCalledTimes(table.length)
    })

    test('copies parent group context to group context before all', () => {
      const parentGroupContext = outerBeforeAllFn.mock.results[0].value
      for (let i = 0, expected; i < table.length; i++) {
        expected = expect.objectContaining(parentGroupContext)
        expect(innerBeforeAllFn).toHaveBeenNthCalledWith(i+1, expected)
      }
      expect(innerBeforeAllFn).toHaveBeenCalledTimes(table.length)
    })

    test('merges loop context into group context before all', () => {
      for (let i = 0, loopContext, expected; i < table.length; i++) {
        loopContext = contextFromLoopArgs(table[i])
        expected = expect.objectContaining(loopContext)
        expect(innerBeforeAllFn).toHaveBeenNthCalledWith(i+1, expected)
      }
      expect(innerBeforeAllFn).toHaveBeenCalledTimes(table.length)
    })
  })
}
