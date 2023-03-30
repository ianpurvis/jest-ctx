const contextStack = []
let groupContext
let testContext

function resetTestContext() {
  testContext = groupContext
}

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

function adaptDescribeHook(hook, beforeAllHook, afterAllHook) {
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

function adaptDescribeEachHook(hook, beforeAllHook, afterAllHook) {
  return (table) => adaptDescribeHook(hook(table), beforeAllHook, afterAllHook)
}

function adaptTestHook(hook) {
  return (name, fn, timeout) => (
    hook(name, async (...args) => {
      await fn(testContext, ...args)
    }, timeout)
  )
}

function adaptTestEachHook(hook) {
  return (table) => adaptTestHook(hook(table))
}

module.exports = {
  adaptAfterAllHook,
  adaptAfterEachHook,
  adaptBeforeAllHook,
  adaptBeforeEachHook,
  adaptDescribeHook,
  adaptDescribeEachHook,
  adaptTestHook,
  adaptTestEachHook,
  resetTestContext
}
