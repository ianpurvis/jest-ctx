import { afterAll, afterEach, beforeAll, beforeEach, it, stack } from '../src/index.js'
import { generate } from 'randomstring'

const fakeContext = () => ({ key: generate() })

describe('import scope', () => {

  it('initializes stack with an empty context', () => {
    expect(stack.length).toEqual(1)
    expect(stack.at(-1)).toEqual({})
  })

  describe('describe', () => {

    it('does not mutate the stack', () => {
      expect(stack.length).toEqual(1)
      expect(stack.at(-1)).toEqual({})
    })

    it('runs tests with the current context', (context) => {
      expect(context).toBe(stack.at(-1))
    })

    describe('given a beforeAll hook', () => {
      let prevContext, nextContext = fakeContext()

      beforeAll((context) => {
        prevContext = context
        return nextContext
      })

      it('runs the hook with the current context', () => {
        expect(prevContext).toBe(stack.at(0))
      })

      it('pushes the returned context onto the stack', () => {
        expect(stack.length).toEqual(2)
        expect(stack.at(-1)).toBe(nextContext)
      })

      it('runs tests with the returned context', (context) => {
        expect(context).toBe(nextContext)
      })
    })

    describe('given a beforeEach hook', () => {
      let prevContext, nextContext = fakeContext()

      beforeEach((context) => {
        prevContext = context
        return nextContext
      })

      it('runs the hook with the current context', () => {
        expect(prevContext).toBe(stack.at(0))
      })

      it('pushes the returned context onto the stack', () => {
        expect(stack.length).toEqual(2)
        expect(stack.at(-1)).toBe(nextContext)
      })

      it('runs tests with the returned context', (context) => {
        expect(context).toBe(nextContext)
      })
    })

    describe('given an afterEach hook', () => {

      afterEach((context) => {
        expect(stack.length).toEqual(1)
        expect(stack.at(-1)).toEqual({})
        expect(context).toBe(stack.at(-1))
      })

      // ☝️ assertions in afterAll hook
      it('does not mutate the stack', () => true)
      it('runs the hook with the current context', () => true)
    })

    describe('given an afterAll hook', () => {

      afterAll((context) => {
        expect(stack.length).toEqual(1)
        expect(stack.at(-1)).toEqual({})
        expect(context).toBe(stack.at(-1))
      })

      // ☝️ assertions in afterAll hook
      it('does not mutate the stack', () => true)
      it('runs the hook with the current context', () => true)
    })
  })
})
