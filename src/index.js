import * as native from '@jest/globals'
import { contextFromLoopArgs } from './util.js'

const groupContexts = []
let testContext

native.beforeEach(() => {
  testContext = groupContexts.at(-1)
})

export function afterAll(block) {
  native.afterAll(async () => {
    const context = groupContexts.at(-1)
    await block(context)
  })
}

export function afterEach(block) {
  native.afterEach(async () => {
    await block(testContext)
  })
}

export function beforeAll(block) {
  native.beforeAll(async () => {
    const prev = groupContexts.at(-1)
    const next = await block(prev)
    if (next !== undefined) {
      groupContexts.splice(-1, 1, next)
    }
  })
}

export function beforeEach(block) {
  native.beforeEach(async () => {
    const prev = testContext
    const next = await block(prev)
    if (next !== undefined) {
      testContext = next
    }
  })
}

export function describe(title, block) {
  native.describe(title, () => {
    native.beforeAll(() => {
      const context = groupContexts.at(-1)
      groupContexts.push(context)
    })
    block()
    native.afterAll(() => {
      groupContexts.pop()
    })
  })
}

describe.each = function(table) {
  const nativeBoundHook = native.describe.each(table)
  return (title, block) => {
    nativeBoundHook(title, (...args) => {
      const loopContext = contextFromLoopArgs(...args)
      native.beforeAll(() => {
        const prev = groupContexts.at(-1)
        const next = { ...prev, ...loopContext }
        groupContexts.push(next)
      })
      block(...args)
      native.afterAll(() => {
        groupContexts.pop()
      })
    })
  }
}

export function test(title, block) {
  native.test(title, async () => {
    await block(testContext)
  })
}

export const it = test
