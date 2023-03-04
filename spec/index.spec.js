import { afterAll, afterEach, beforeAll, beforeEach, it, rootContext, stack } from '../src/index.js'
import { generate } from 'randomstring'

const fakeContext = () => ({ key: generate() })

describe('describe', () => {

  it('does not mutate the stack', (context) => {
    expect(stack).toHaveLength(1)
    expect(stack[0]).toBe(rootContext)
    expect(context).toBe(rootContext)
  })

  it('runs tests with the current context', (context) => {
    expect(context).toBe(rootContext)
  })

  describe('given a beforeAll hook', () => {
    let received, accumulated = fakeContext()

    beforeAll((context) => {
      received = context
      return accumulated
    })

    it('runs the hook with the current context', () => {
      expect(received).toBe(rootContext)
    })

    it('pushes the returned context onto the stack', (context) => {
      expect(stack).toHaveLength(2)
      expect(stack[0]).toBe(rootContext)
      expect(stack[1]).toBe(accumulated)
      expect(context).toBe(accumulated)
    })
  })

  describe('given a beforeEach hook', () => {
    let received, accumulated = fakeContext()

    beforeEach((context) => {
      received = context
      return accumulated
    })

    it('runs the hook with the current context', () => {
      expect(received).toBe(rootContext)
    })

    it('pushes the returned context onto the stack', (context) => {
      expect(stack).toHaveLength(2)
      expect(stack[0]).toBe(rootContext)
      expect(stack[1]).toBe(accumulated)
      expect(context).toBe(accumulated)
    })
  })

  describe('given an afterEach hook', () => {

    afterEach((context) => {
      expect(context).toBe(rootContext)
      expect(stack).toHaveLength(1)
      expect(stack[0]).toBe(rootContext)
    })

    // ☝️ assertions in afterAll hook
    it('runs the hook with the current context', () => true)
    it('does not mutate the stack', () => true)
  })

  describe('given an afterAll hook', () => {

    afterAll((context) => {
      expect(context).toBe(rootContext)
      expect(stack).toHaveLength(1)
      expect(stack[0]).toBe(rootContext)
    })

    // ☝️ assertions in afterAll hook
    it('runs the hook with the current context', () => true)
    it('does not mutate the stack', () => true)
  })
})
