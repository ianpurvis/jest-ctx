import * as native from '@jest/globals'
import { contextFromLoopArgs } from './util.js'

const scopes = new Array()

native.beforeAll(() => {
  scopes.push({ groupContext: {}, testContext: undefined })
})

native.beforeEach(() => {
  const scope = scopes.at(-1)
  scope.testContext = { ...scope.groupContext }
})

native.afterAll(() => {
  const scope = scopes.at(-1)
  scope.textContext = undefined
})

export function afterAll(block) {
  native.afterAll(async () => {
    const scope = scopes.at(-1)
    await block(scope.groupContext)
  })
}

export function afterEach(block) {
  native.afterEach(async () => {
    const scope = scopes.at(-1)
    await block(scope.testContext)
  })
}

export function beforeAll(block) {
  native.beforeAll(async () => {
    const scope = scopes.at(-1)
    const prev = scope.groupContext
    const next = await block(prev) || prev
    scope.groupContext = next
  })
}

export function beforeEach(block) {
  native.beforeEach(async () => {
    const scope = scopes.at(-1)
    const prev = scope.testContext
    const next = await block(prev) || prev
    scope.testContext = next
  })
}

export function describe(title, block) {
  native.describe(title, () => {
    native.beforeAll(() => {
      const scope = scopes.at(-1)
      const groupContext = { ...scope.groupContext }
      const testContext = undefined
      scopes.push({ groupContext, testContext })
    })
    native.afterAll(() => {
      const scope = scopes.at(-1)
      scope.testContext = undefined
    })
    block()
    native.afterAll(() => {
      scopes.pop()
    })
  })
}

describe.each = function(table) {
  const nativeBoundHook = native.describe.each(table)
  return (title, block) => {
    nativeBoundHook(title, (...args) => {
      const loopContext = contextFromLoopArgs(...args)
      native.beforeAll(() => {
        const scope = scopes.at(-1)
        const next = { ...scope }
        next.groupContext = { ...next.groupContext, ...loopContext }
        scopes.push(next)
      })
      native.afterAll(() => {
        const scope = scopes.at(-1)
        scope.testContext = undefined
      })
      block(...args)
      native.afterAll(() => {
        scopes.pop()
      })
    })
  }
}

export function test(title, block) {
  native.test(title, async () => {
    const scope = scopes.at(-1)
    await block(scope.testContext)
  })
}

export const it = test
