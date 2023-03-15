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

export function describe(name, fn) {
  native.describe(name, () => {
    native.beforeAll(() => {
      contextStack.push(groupContext)
    })
    fn()
    native.afterAll(() => {
      groupContext = contextStack.pop()
    })
  })
}

describe.each = function(table) {
  return (name, fn, timeout) => {
    native.describe.each(table)(name, (...args) => {
      native.beforeAll(() => {
        contextStack.push(groupContext)
      })
      fn(...args)
      native.afterAll(() => {
        groupContext = contextStack.pop()
      })
    }, timeout)
  }
}

describe.only = function(name, fn) {
  native.describe.only(name, () => {
    native.beforeAll(() => {
      contextStack.push(groupContext)
    })
    fn()
    native.afterAll(() => {
      groupContext = contextStack.pop()
    })
  })
}

describe.skip = native.describe.skip

export function test(name, fn, timeout) {
  native.test(name, async () => {
    await fn(testContext)
  }, timeout)
}

test.concurrent = function(name, fn, timeout) {
  native.test.concurrent(name, async () => {
    await fn(testContext)
  }, timeout)
}

test.each = function(table) {
  return (name, fn, timeout) => {
    native.test.each(table)(name, async (...args) => {
      await fn(testContext, ...args)
    }, timeout)
  }
}

test.failing = function(name, fn, timeout) {
  native.test.failing(name, async () => {
    await fn(testContext)
  }, timeout)
}

test.only = function(name, fn, timeout) {
  native.test.only(name, async () => {
    await fn(testContext)
  }, timeout)
}

test.skip = native.test.skip
test.todo = native.test.todo

export const fdescribe = describe.only
export const fit = test.only
export const it = test
export const xdescribe = describe.skip
export const xit = test.skip
export const xtest = test.skip
