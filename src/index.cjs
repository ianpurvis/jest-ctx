module.exports = (() => {

const native = require('@jest/globals')
const {
  adaptAfterAllHook,
  adaptAfterEachHook,
  adaptBeforeAllHook,
  adaptBeforeEachHook,
  adaptDescribeHook,
  adaptTestHook,
  resetTestContext
} = require('./core.cjs')

const afterAll = adaptAfterAllHook(native.afterAll)
const afterEach = adaptAfterEachHook(native.afterEach)

const beforeAll = adaptBeforeAllHook(native.beforeAll)
const beforeEach = adaptBeforeEachHook(native.beforeEach)

const describe = adaptDescribeHook(native.describe, native.beforeAll, native.afterAll)
describe.each = (table) => adaptDescribeHook(native.describe.each(table), native.beforeAll, native.afterAll)
describe.only = adaptDescribeHook(native.describe.only, native.beforeAll, native.afterAll)
describe.only.each = (table) => adaptDescribeHook(native.describe.only.each(table), native.beforeAll, native.afterAll)
describe.skip = native.describe.skip

const expect = native.expect
const jest = native.jest

const test = adaptTestHook(native.test)
test.concurrent = adaptTestHook(native.test.concurrent)
test.concurrent.each = (table) => adaptTestHook(native.test.concurrent.each(table))
test.concurrent.failing = adaptTestHook(native.test.concurrent.failing)
test.concurrent.failing.each = (table) => adaptTestHook(native.test.concurrent.failing.each(table))
test.concurrent.only = adaptTestHook(native.test.concurrent.only)
test.concurrent.only.each = (table) => adaptTestHook(native.test.concurrent.only.each(table))
test.concurrent.only.failing = adaptTestHook(native.test.concurrent.only.failing)
test.concurrent.only.failing.each = (table) => adaptTestHook(native.test.concurrent.only.failing.each(table))
test.concurrent.skip = native.test.concurrent.skip
test.each = (table) => adaptTestHook(native.test.each(table))
test.failing = adaptTestHook(native.test.failing)
test.failing.each = (table) => adaptTestHook(native.test.failing.each(table))
test.only = adaptTestHook(native.test.only)
test.only.each = (table) => adaptTestHook(native.test.only.each(table))
test.only.failing = adaptTestHook(native.test.only.failing)
test.only.failing.each = (table) => adaptTestHook(native.test.only.failing.each(table))
test.skip = native.test.skip
test.todo = native.test.todo

const fdescribe = describe.only
const fit = test.only
const it = test
const xdescribe = describe.skip
const xit = test.skip
const xtest = test.skip

native.beforeEach(resetTestContext)

return {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
  fdescribe,
  fit,
  it,
  xdescribe,
  xit,
  xtest,
}

})()
