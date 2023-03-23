const native = require('@jest/globals')

const contextStack = []
let groupContext
let testContext

native.beforeEach(() => {
  testContext = groupContext
})

exports.afterAll = adaptAfterAllHook(native.afterAll)
exports.afterEach = adaptAfterEachHook(native.afterEach)

exports.beforeAll = adaptBeforeAllHook(native.beforeAll)
exports.beforeEach = adaptBeforeEachHook(native.beforeEach)

exports.describe = adaptDescribeHook(native.describe)
exports.describe.each = (table) => adaptDescribeHook(native.describe.each(table))
exports.describe.only = adaptDescribeHook(native.describe.only)
exports.describe.only.each = (table) => adaptDescribeHook(native.describe.only.each(table))
exports.describe.skip = native.describe.skip

exports.expect = native.expect
exports.jest = native.jest

exports.test = adaptTestHook(native.test)
exports.test.concurrent = adaptTestHook(native.test.concurrent)
exports.test.concurrent.each = (table) => adaptTestHook(native.test.concurrent.each(table))
exports.test.concurrent.failing = adaptTestHook(native.test.concurrent.failing)
exports.test.concurrent.failing.each = (table) => adaptTestHook(native.test.concurrent.failing.each(table))
exports.test.concurrent.only = adaptTestHook(native.test.concurrent.only)
exports.test.concurrent.only.each = (table) => adaptTestHook(native.test.concurrent.only.each(table))
exports.test.concurrent.only.failing = adaptTestHook(native.test.concurrent.only.failing)
exports.test.concurrent.only.failing.each = (table) => adaptTestHook(native.test.concurrent.only.failing.each(table))
exports.test.concurrent.skip = native.test.concurrent.skip
exports.test.each = (table) => adaptTestHook(native.test.each(table))
exports.test.failing = adaptTestHook(native.test.failing)
exports.test.failing.each = (table) => adaptTestHook(native.test.failing.each(table))
exports.test.only = adaptTestHook(native.test.only)
exports.test.only.each = (table) => adaptTestHook(native.test.only.each(table))
exports.test.only.failing = adaptTestHook(native.test.only.failing)
exports.test.only.failing.each = (table) => adaptTestHook(native.test.only.failing.each(table))
exports.test.skip = native.test.skip
exports.test.todo = native.test.todo

exports.fdescribe = describe.only
exports.fit = test.only
exports.it = test
exports.xdescribe = describe.skip
exports.xit = test.skip
exports.xtest = test.skip

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
