import * as native from '@jest/globals'
export { expect, jest } from '@jest/globals'

const contextStack = []
let groupContext
let testContext

native.beforeEach(() => {
  testContext = groupContext
})

export function afterAll(fn) {
  native.afterAll(async () => {
    await fn(groupContext)
  })
}

export function afterEach(fn) {
  native.afterEach(async () => {
    await fn(testContext)
  })
}

export function beforeAll(fn) {
  native.beforeAll(async () => {
    const next = await fn(groupContext)
    if (next !== undefined) {
      groupContext = next
    }
  })
}

export function beforeEach(fn) {
  native.beforeEach(async () => {
    const next = await fn(testContext)
    if (next !== undefined) {
      testContext = next
    }
  })
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
  return (name, fn) => {
    native.describe.each(table)(name, (...args) => {
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

export function test(name, fn) {
  native.test(name, async () => {
    await fn(testContext)
  })
}

test.concurrent = function(name, fn) {
  native.test.concurrent(name, async () => {
    await fn(testContext)
  })
}

test.each = function(table) {
  return (name, fn) => {
    native.test.each(table)(name, async (...args) => {
      await fn(testContext, ...args)
    })
  }
}

test.failing = function(name, fn) {
  native.test.failing(name, async () => {
    await fn(testContext)
  })
}

test.only = function(name, fn) {
  native.test.only(name, async () => {
    await fn(testContext)
  })
}

test.skip = native.test.skip
test.todo = native.test.todo

export const fdescribe = describe.only
export const fit = test.only
export const it = test
export const xdescribe = describe.skip
export const xit = test.skip
export const xtest = test.skip
