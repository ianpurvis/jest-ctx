import * as native from '@jest/globals'
export { expect, jest } from '@jest/globals'

const contextStack = []
let groupContext
let testContext

native.beforeEach(() => {
  testContext = groupContext
})

export function afterAll(fn, timeout) {
  native.afterAll(async () => {
    await fn(groupContext)
  }, timeout)
}

export function afterEach(fn, timeout) {
  native.afterEach(async () => {
    await fn(testContext)
  }, timeout)
}

export function beforeAll(fn, timeout) {
  native.beforeAll(async () => {
    const next = await fn(groupContext)
    if (next !== undefined) {
      groupContext = next
    }
  }, timeout)
}

export function beforeEach(fn, timeout) {
  native.beforeEach(async () => {
    const next = await fn(testContext)
    if (next !== undefined) {
      testContext = next
    }
  }, timeout)
}

export const describe = adaptDescribeHook(native.describe)
describe.each = (table) => adaptDescribeHook(native.describe.each(table))
describe.only = adaptDescribeHook(native.describe.only)
describe.skip = native.describe.skip

export const test = adaptTestHook(native.test)
test.concurrent = adaptTestHook(native.test.concurrent)
test.each = (table) => adaptTestHook(native.test.each(table))
test.failing = adaptTestHook(native.test.failing)
test.only = adaptTestHook(native.test.only)
test.skip = native.test.skip
test.todo = native.test.todo

export const fdescribe = describe.only
export const fit = test.only
export const it = test
export const xdescribe = describe.skip
export const xit = test.skip
export const xtest = test.skip

function adaptDescribeHook(hook) {
  return (name, fn) => {
    hook(name, (...args) => {
      native.beforeAll(() => {
        contextStack.push(groupContext)
      })
      fn(...args)
      native.afterAll(() => {
        groupContext = contextStack.pop()
      })
    })
  }
}

function adaptTestHook(hook) {
  return (name, fn, timeout) => {
    hook(name, async (...args) => {
      await fn(testContext, ...args)
    }, timeout)
  }
}
