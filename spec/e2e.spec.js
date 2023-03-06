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
import { fakeContext } from './helpers.js'

let depth = 0

beforeAll((context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.groupContext)
  expect(context).toEqual({})
})

beforeEach((context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.testContext)
  expect(context).toEqual({})
})

test('scope 0 - test 0', (context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.testContext)
  expect(context).toEqual({})
})

test('scope 0 - test 1', (context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.testContext)
  expect(context).toEqual({})
})

afterAll((context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.groupContext)
  expect(context).toEqual({})
})

afterEach((context) => {
  expect(scopes).toHaveLength(depth+1)
  const scope = scopes[depth]
  expect(context).toBe(scope.testContext)
  expect(context).toEqual({})
})

describe('scope 1', () => {

  beforeAll(() => { depth++ })

  beforeAll((context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.groupContext)
    expect(context).toEqual({})
  })

  beforeEach((context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
    expect(context).toEqual({})
  })

  test('scope 1 - test 0', (context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
    expect(context).toEqual({})
  })

  test('scope 1 - test 1', (context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
    expect(context).toEqual({})
  })

  afterEach((context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.testContext)
    expect(context).toEqual({})
  })

  afterAll((context) => {
    expect(scopes).toHaveLength(depth+1)
    const scope = scopes[depth]
    expect(context).toBe(scope.groupContext)
    expect(context).toEqual({})
  })

  afterAll(() => { depth-- })
})
