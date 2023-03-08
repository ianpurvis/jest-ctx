import * as native from '@jest/globals'

export const scopes = new Array()

native.beforeAll(() => {
  const groupContext = {}
  const testContext = {}
  const scope = { groupContext, testContext }
  scopes.push(scope)
})

native.beforeEach(() => {
  const scope = scopes.at(-1)
  scope.testContext = scope.groupContext
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
      const next = { ...scope }
      scopes.push(next)
    })
    native.beforeEach(() => {
      const scope = scopes.at(-1)
      scope.testContext = scope.groupContext
    })
    block()
    native.afterAll(() => {
      scopes.pop()
    })
  })
}

function coerceLoopContext(...args) {
  let context
  if (args.length === 1 && args[0] === Object(args[0])) {
    context = args[0]
  } else {
    context = args.reduce((prev, next, i) => ({ ...prev, [i]: next }), {})
  }
  return context
}

describe.each = function(table) {
  const nativeBoundHook = native.describe.each(table)
  return (title, block) => {
    nativeBoundHook(title, (...args) => {
      const loopContext = coerceLoopContext(...args)
      native.beforeAll(() => {
        const scope = scopes.at(-1)
        const next = { ...scope }
        next.groupContext = { ...next.groupContext, ...loopContext }
        scopes.push(next)
      })
      native.beforeEach(() => {
        const scope = scopes.at(-1)
        scope.testContext = scope.groupContext
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
