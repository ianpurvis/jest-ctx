const { Deferred } = require('./deferred.cjs')

const contextStack = []
let groupContext
let testContext

const readyStack = []
let ready

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

let setReady, ready = new Promise(resolve => { setReady = resolve })


function adaptDescribeHook(hook, beforeAllHook, afterAllHook) {
  return (name, fn, timeout) => (
    hook(name, (...args) => {
      setReady, ready = new Promise(resolve => { setReady = resolve })
      beforeAllHook(() => {
        contextStack.push(groupContext)
      })
      fn(...args)
      beforeAllHook(setReady)
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
      await ready
      await fn(testContext || groupContext, ...args)
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
