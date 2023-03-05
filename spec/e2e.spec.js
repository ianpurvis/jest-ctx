import { afterAll as _afterAll, beforeAll as _beforeAll, describe, expect } from '@jest/globals'
import { afterAll, afterEach, beforeAll, beforeEach, stack, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const initialStack = [...stack]

_beforeAll(() => {
  expect(stack).toEqual(initialStack)
})

test('top level ok', (context) => {
  expect(stack).toEqual(initialStack)
  expect(context).toBe(stack.at(-1))
})

_afterAll(() => {
  expect(stack).toEqual(initialStack)
})

describe('nested', () => {
  const nestedContext = {}

  _beforeAll(() => {
    expect(stack).toEqual(initialStack)
    nestedContext.initialStack = [...stack]
    nestedContext.accumulated = []
  })

  beforeAll((context) => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
    expect(context).toBe(stack.at(-1))
    accumulated.push(fakeContext())
    return accumulated.at(-1)
  })

  beforeEach((context) => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
    expect(context).toBe(stack.at(-1))
    accumulated.push(fakeContext())
    return accumulated.at(-1)
  })

  test('nested ok', (context) => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
    expect(context).toBe(stack.at(-1))
  })

  afterEach((context) => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
    expect(context).toBe(stack.at(-1))
  })

  afterAll((context) => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
    expect(context).toBe(stack.at(-1))
  })

  _afterAll(() => {
    const { initialStack, accumulated } = nestedContext
    expect(stack).toEqual([...initialStack, ...accumulated])
  })
})
