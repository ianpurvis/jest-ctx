const native = require('@jest/globals')

const contextStack = []
let groupContext
let testContext

native.beforeEach(() => {
  testContext = groupContext
})

const afterAll = adaptAfterAllHook(native.afterAll)
const afterEach = adaptAfterEachHook(native.afterEach)

const beforeAll = adaptBeforeAllHook(native.beforeAll)
const beforeEach = adaptBeforeEachHook(native.beforeEach)

const describe = adaptDescribeHook(native.describe)
describe.each = (table) => adaptDescribeHook(native.describe.each(table))
describe.only = adaptDescribeHook(native.describe.only)
describe.only.each = (table) => adaptDescribeHook(native.describe.only.each(table))
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

function adaptAfterAllHook(hook) {
  return (fn, timeout) => (
    hook(async () => {
      await fn(groupContext)
    }, timeout)
  )
}

function adaptAfterEachHook(hook) {
  return (fn, timeout) => (
    hook(async () => {
      await fn(testContext)
    }, timeout)
  )
}

function adaptBeforeAllHook(hook) {
  return (fn, timeout) => (
    hook(async () => {
      const next = await fn(groupContext)
      if (next !== undefined) {
        groupContext = next
      }
    }, timeout)
  )
}

function adaptBeforeEachHook(hook) {
  return (fn, timeout) => (
    hook(async () => {
      const next = await fn(testContext)
      if (next !== undefined) {
        testContext = next
      }
    }, timeout)
  )
}

function adaptDescribeHook(
  hook,
  beforeAllHook = native.beforeAll,
  afterAllHook = native.afterAll
) {
  return (name, fn, timeout) => (
    hook(name, (...args) => {
      beforeAllHook(() => {
        contextStack.push(groupContext)
      })
      fn(...args)
      afterAllHook(() => {
        groupContext = contextStack.pop()
      })
    }, timeout)
  )
}

function adaptTestHook(hook) {
  return (name, fn, timeout) => (
    hook(name, async (...args) => {
      await fn(testContext, ...args)
    }, timeout)
  )
}

module.exports = {
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
  xdescribe,
  xit,
  xtest,
}
