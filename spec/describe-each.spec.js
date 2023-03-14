import { expect, jest } from '@jest/globals'
import { beforeAll, describe, test } from '../src/index.js'
import { randomString } from './helpers.js'

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
    const beforeAllFn = jest.fn(() => randomString())
    const testFn = jest.fn()
    const describeFn = jest.fn(() => {
      beforeAll(beforeAllFn)
      test('mock test', testFn)
    })
    describe.each(table)('mock describe %#', describeFn)

    test('calls contextual describe for each row of the table', () => {
      for (let i = 0, row, expected; i < table.length; i++) {
        row = table[i]
        expected = Array.isArray(row) ? row : [row]
        expect(describeFn).toHaveBeenNthCalledWith(i+1, ...expected)

        expected = beforeAllFn.mock.results[i].value
        expect(testFn).toHaveBeenNthCalledWith(i+1, expected)
      }
      expect(describeFn).toHaveBeenCalledTimes(table.length)
    })
  })
}
