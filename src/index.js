import * as native from '@jest/globals'
export { expect, jest } from '@jest/globals'

const contextStack = []
let groupContext
let testContext

native.beforeEach(() => {
  testContext = groupContext
})

export function afterAll(block) {
  native.afterAll(async () => {
    await block(groupContext)
  })
}

export function afterEach(block) {
  native.afterEach(async () => {
    await block(testContext)
  })
}

export function beforeAll(block) {
  native.beforeAll(async () => {
    const next = await block(groupContext)
    if (next !== undefined) {
      groupContext = next
    }
  })
}

export function beforeEach(block) {
  native.beforeEach(async () => {
    const next = await block(testContext)
    if (next !== undefined) {
      testContext = next
    }
  })
}

export function describe(title, block) {
  native.describe(title, () => {
    native.beforeAll(() => {
      contextStack.push(groupContext)
    })
    block()
    native.afterAll(() => {
      groupContext = contextStack.pop()
    })
  })
}

describe.each = function(table) {
  return (title, block) => {
    native.describe.each(table)(title, (...args) => {
      native.beforeAll(() => {
        contextStack.push(groupContext)
      })
      block(...args)
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
    block()
    native.afterAll(() => {
      groupContext = contextStack.pop()
    })
  })
}

describe.skip = native.describe.skip

export function test(title, block) {
  native.test(title, async () => {
    await block(testContext)
  })
}

test.concurrent = function(name, fn) {
  native.test.concurrent(name, async () => {
    await fn(testContext)
  })
}

test.each = function(table) {
  return (title, block) => {
    native.test.each(table)(title, async (...args) => {
      await block(testContext, ...args)
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
