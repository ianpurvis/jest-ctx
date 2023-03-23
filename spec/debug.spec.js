import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'jest-ctx'
import { randomString } from './helpers.js'

const output = []

function dump(event, depth = 0) {
  return (prev) => {
    output.push({ depth, event, prev })
  }
}

function mutate(event, depth = 0) {
  return (prev) => {
    const next = randomString()
    output.push({ depth, event, prev, next })
    return next
  }
}

beforeAll(mutate('beforeAll', 0))
beforeEach(mutate('beforeEach', 0))
test('mock test', dump('test 1', 0))
afterAll(dump('afterAll', 0))
afterEach(dump('afterEach', 0))

describe('mock describe', () => {
  beforeAll(mutate('beforeAll', 1))
  beforeEach(mutate('beforeEach', 1))
  test('mock test', dump('test 2', 1))
  test('mock test', dump('test 3', 1))
  afterAll(dump('afterAll', 1))
  afterEach(dump('afterEach', 1))
})

test('mock test', dump('test 4', 0))

afterAll(() => console.table(output))
