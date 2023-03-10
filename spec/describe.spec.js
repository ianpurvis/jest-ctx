import { expect } from '@jest/globals'
import { afterAll, beforeAll, beforeEach, describe, test } from '../src/index.js'
import { generate } from 'randomstring'

function fakeContext(name) {
  return { [generate()]: name }
}

const outerGroupContext = fakeContext('outer group')
const innerGroupContext = fakeContext('inner group')
const testContext = fakeContext('test context')

beforeAll((prev) => ({ ...prev, outerGroupContext }))
beforeEach((prev) => ({ ...prev, innerGroupContext }))

describe('describe', () => {
  const innerScope = {}

  beforeAll((context) => {
    expect(context).toBe(context)
    return { ...context, innerGroupContext }
  })

  beforeEach((context) => {
    expect(context).toBe(testContext)
    return { ...context, testContext }
  })

  test('pushes a new scope onto the stack before all', () => {
    expect(innerScope.groupContext).toEqual(outerScope.groupContext)
    expect(innerScope.groupContext).not.toBe(outerScope.groupContext)
  })

  test('assigns group context to test context before each', () => {
    expect(innerScope.testContext).toBe(outerScope.testContext)
  })
})

test('pops the scope off the stack after all', (context) => {
  expect(context).toBe(outerScope.testContext)
  expect(outerScope.testContext).toBe(outerScope.groupContext)
})
