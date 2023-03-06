import { expect } from '@jest/globals'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  scopes,
  test
} from '../src/index.js'

function itWorksAtDepth(depth) {

  beforeAll((context) => ({ ...context, depth }))

  beforeAll((context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.groupContext)
  })

  beforeEach((context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
  })

  test(`scope ${depth} - test 0`, (context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
  })

  test(`scope ${depth} - test 1`, (context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
  })

  afterAll((context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.groupContext)
  })

  afterEach((context) => {
    const { depth } = context
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
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
