import { beforeEach, describe, expect, jest, test } from '../src/index.js'
import { loopSubjects } from './fixtures.js'
import { randomString } from './helpers.js'

for (const { description, table } of loopSubjects) {
  describe(`given ${description}`, () => {
    const beforeEachFn = jest.fn(() => randomString())
    const testFn = jest.fn()

    beforeEach(beforeEachFn)
    test.each(table)('mock test %#', testFn)

    test('calls test for each row of the table with context', () => {
      for (let i = 0, context, args; i < table.length; i++) {
        args = [].concat(table[i])
        context = beforeEachFn.mock.results[i].value
        expect(testFn).toHaveBeenNthCalledWith(i+1, context, ...args)
      }
      expect(testFn).toHaveBeenCalledTimes(table.length)
    })
  })
}
