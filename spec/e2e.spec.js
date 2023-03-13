import { expect } from '@jest/globals'
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from '../src/index.js'
import { fakeContext } from './helpers.js'

const maxDepth = 5
let depth = 0
let groupContexts = []
let testContext

beforeEach(() => {
  testContext = null
})

function itWorksAtDepth() {

  let groupContext

  beforeAll((context) => {
    groupContext = groupContexts.at(-1)
    if (groupContext) {
      expect(context).toMatchObject(groupContext)
    } else {
      expect(context).toBeUndefined()
    }
    groupContext = { ...context, ...fakeContext() }
    groupContexts.push(groupContext)
    return groupContext
  })

  beforeEach((context) => {
    expect(context).toMatchObject(groupContext)
    if (testContext) {
      expect(context).toMatchObject(testContext)
    }
    testContext = { ...context, ...fakeContext() }
    return testContext
  })

  test(`it works at depth ${depth}`, (context) => {
    expect(context).toMatchObject(groupContext)
    expect(context).toMatchObject(testContext)
  })

  afterEach((context) => {
    expect(context).toMatchObject(groupContext)
    expect(context).toMatchObject(testContext)
  })

  afterAll((context) => {
    expect(context).toMatchObject(groupContext)
    expect(context).not.toMatchObject(testContext)
    groupContexts.pop()
  })

  if (depth < maxDepth) {
    depth++
    describe(`depth ${depth}`, itWorksAtDepth)
  }
}

itWorksAtDepth()
