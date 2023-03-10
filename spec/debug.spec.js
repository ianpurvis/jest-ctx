import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from '../src/index.js'
import { generate } from 'randomstring'

function fakeContext() {
  return { key: generate() }
}

function dump(event, length = 120) {
  return (prev) => {
    const description = prev.key
    const spacer = ' '.repeat(length - event.length - description.length)
    console.log(`${event}${spacer}${description}`)
  }
}

function mutate(event, length = 120) {
  return (prev) => {
    const next = fakeContext()
    const description = `${prev.key} -> ${next.key}`
    const spacer = '\u0020'.repeat(length - event.length - description.length)
    console.log(`${event}${spacer}${description}`)
    return next
  }
}

const output = []
global.console.log = (...values) => output.push(values.join())

let testCount = 1

beforeAll(mutate('outer beforeAll'))
beforeEach(mutate('outer beforeEach'))
test('test 1', dump('test 1'))
afterAll(dump('outer afterAll'))
afterEach(dump('outer afterEach'))

describe('describe', () => {
  beforeAll(mutate('inner beforeAll'))
  beforeEach(mutate('inner beforeEach'))
  test('test 2', dump('test 2'))
  afterAll(dump('inner afterAll'))
  afterEach(dump('inner afterEach'))
})

test('test 3', dump('test 3'))

afterAll(() => console.debug(output.join('\n')))
