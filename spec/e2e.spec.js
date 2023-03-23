import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'jest-ctx'
import { toStartWith, randomString } from './helpers.js'

expect.extend({ toStartWith })

const maxDepth = 5
let depth = 0
let groupContexts = []
let testContext

beforeEach(() => {
  testContext = groupContexts.at(-1)
})

function itWorksAtDepth() {

  let groupContext

  beforeAll((context) => {
    groupContext = groupContexts.at(-1)
    expect(context).toEqual(groupContext)
    groupContext = (context||'') + randomString()
    groupContexts.push(groupContext)
    return groupContext
  })

  beforeEach((context) => {
    expect(context).toStartWith(groupContext)
    expect(context).toEqual(testContext)
    testContext = context + randomString()
    return testContext
  })

  test(`it works at depth ${depth}`, (context) => {
    expect(context).toStartWith(groupContext)
    expect(context).toEqual(testContext)
  })

  afterEach((context) => {
    expect(context).toStartWith(groupContext)
    expect(context).toEqual(testContext)
  })

  afterAll((context) => {
    expect(context).toEqual(groupContext)
    expect(context).not.toEqual(testContext)
    groupContexts.pop()
  })

  if (depth < maxDepth) {
    depth++
    describe(`depth ${depth}`, itWorksAtDepth)
  }
}

itWorksAtDepth()
