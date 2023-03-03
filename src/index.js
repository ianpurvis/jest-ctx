import * as _jest from '@jest/globals'

export const stack = new Array()

export function afterAll(block) {
  let prev
  _jest.afterAll(async () => {
    prev = stack.at(-1)
    await block(prev)
  })
}

export function afterEach(block) {
  let prev
  _jest.afterEach(async () => {
    prev = stack.at(-1)
    await block(prev)
  })
}

export function beforeAll(block) {
  let prev, next
  _jest.beforeAll(async () => {
    prev = stack.at(-1)
    next = await block(prev) || prev
    stack.push(next)
  })
  _jest.afterAll(() => {
    stack.pop()
    // TODO verify next is popped to catch stack corruption
  })
}

export function beforeEach(block) {
  let prev, next
  _jest.beforeEach(async () => {
    prev = stack.at(-1)
    next = await block(prev) || prev
    stack.push(next)
  })
  _jest.afterEach(() => {
    stack.pop()
    // TODO verify next is popped to catch stack corruption
  })
}

export function describe(title, block) {
  let prev, next
  _jest.describe(title, () => {
    _jest.beforeAll(() => {
      prev = stack.at(-1)
      next = prev || {}
      stack.push(next)
    })
    block()
    _jest.afterAll(() => {
      stack.pop()
    })
  })
}

export function it(title, block) {
  let prev, next
  _jest.it(title, async () => {
    prev = stack.at(-1) || {}
    next = { ...prev }
    await block(next)
  })
}
