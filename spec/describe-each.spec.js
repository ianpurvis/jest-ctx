import { beforeAll, describe, expect, jest, test } from '../src/index.js'
import { loopSubjects } from './fixtures.js'
import { randomString } from './helpers.js'

for (const { description, table } of loopSubjects) {
  describe(`given ${description}`, () => {
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
