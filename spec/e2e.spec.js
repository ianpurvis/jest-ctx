import { expect } from '@jest/globals'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  test
} from '../src/index.js'
import { fakeContext } from './helpers.js'

function itWorksAtDepth(depth) {

  const a = fakeContext(), b = fakeContext()

  beforeAll((context) => {
    expect(context).toBeInstanceOf(Object)
    return { ...context, ...a }
  })

  beforeEach((context) => {
    expect(context).toMatchObject(a)
    return { ...context, ...b }
  })

  test(`scope ${depth} - test 0`, (context) => {
    expect(context).toMatchObject(a)
    expect(context).toMatchObject(b)
  })

  test(`scope ${depth} - test 1`, (context) => {
    expect(context).toMatchObject(a)
    expect(context).toMatchObject(b)
  })

  afterEach((context) => {
    expect(context).toMatchObject(a)
    expect(context).toMatchObject(b)
  })

  afterAll((context) => {
    expect(context).toMatchObject(a)
  })
}

itWorksAtDepth(0)
describe('depth 1', () => {
  itWorksAtDepth(1)
  describe('depth 2', () => {
    itWorksAtDepth(2)
    describe('depth 3', () => {
      itWorksAtDepth(3)
      describe('depth 4', () => {
        itWorksAtDepth(4)
      })
      itWorksAtDepth(3)
    })
    itWorksAtDepth(2)
  })
  itWorksAtDepth(1)
})
itWorksAtDepth(0)
