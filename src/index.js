import * as _jest from '@jest/globals'

export const stack = [{}]

function getContext() {
  return stack.at(-1)
}

function popContext(expected) {
  if (stack.pop() != expected) {
    throw new Error('Context stack corrupted')
  }
}

function pushContext(context) {
  stack.push(context)
}

export function afterAll(block) {
  _jest.afterAll(async () => {
    await block(getContext())
  })
}

export function afterEach(block) {
  _jest.afterEach(async () => {
    await block(getContext())
  })
}

export function beforeAll(block) {
  let prev, next
  _jest.beforeAll(async () => {
    prev = getContext()
    next = await block(prev) || prev
    pushContext(next)
  })
  _jest.afterAll(() => popContext(next))
}

export function beforeEach(block) {
  let prev, next
  _jest.beforeEach(async () => {
    prev = getContext()
    next = await block(prev) || prev
    pushContext(next)
  })
  _jest.afterEach(() => popContext(next))
}

export function test(title, block) {
  _jest.it(title, async () => {
    await block(getContext())
  })
}

export const it = test
