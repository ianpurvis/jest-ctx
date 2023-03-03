import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from '../src/index.js'
import { generate } from 'randomstring'

const fakeContext = () => ({ key: generate() })

describe('describe', () => {
  const identityContext = {}

  it('provides the identity context to tests', (context) => {
    expect(context).toEqual(identityContext)
  })

  describe('given a beforeAll hook', () => {
    let prevContext, nextContext = fakeContext()

    beforeAll((context) => {
      prevContext = context
      return nextContext
    })

    it('passes the current context to the hook', () => {
      expect(prevContext).toEqual(identityContext)
    })

    it('provides the returned context to tests', (context) => {
      expect(context).toEqual(nextContext)
    })
  })

  describe('given a beforeEach hook', () => {
    let prevContext, nextContext = fakeContext()

    beforeEach((context) => {
      prevContext = context
      return nextContext
    })

    it('passes the current context to the hook', () => {
      expect(prevContext).toEqual(identityContext)
    })

    it('provides the returned context to tests', (context) => {
      expect(context).toEqual(nextContext)
    })
  })

  describe('given an afterEach hook', () => {

    afterEach((context) => {
      expect(context).toEqual(identityContext)
    })

    it('passes the current context to the hook', () => {
      // ☝️ assertion in afterAll hook
    })
  })

  describe('given an afterAll hook', () => {

    afterAll((context) => {
      expect(context).toEqual(identityContext)
    })

    it('passes the current context to the hook', () => {
      // ☝️ assertion in afterAll hook
    })
  })
})
