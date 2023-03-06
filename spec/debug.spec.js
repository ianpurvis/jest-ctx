// import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from '@jest/globals'
import { afterAll as _afterAll, beforeAll as _beforeAll } from '@jest/globals'
import { afterAll, afterEach, beforeAll, beforeEach, describe, test, scopes } from '../src/index.js'

function dump(value, withStack = false) {
  console.log(value)
  if (withStack) {
    console.log(JSON.stringify(scopes, null, 2))
  }
  return value
}

_beforeAll(() => dump('first _beforeAll', true))

beforeAll(() => dump('outer beforeAll 1'))
beforeAll(() => dump('outer beforeAll 2'))

let a = 0, b = 0
beforeEach(() => dump(`outer beforeEach 1 (test ${++a})`))
beforeEach(() => dump(`outer beforeEach 2 (test ${++b})`))

test('test 1', () => dump('outer test 1', true))
test('test 2', () => dump('outer test 2', true))

describe('describe', () => {
  beforeAll(() => dump('inner beforeAll 1'))
  beforeAll(() => dump('inner beforeAll 2'))

  let c = 2, d = 2
  beforeEach(() => dump(`inner beforeEach 1 (test ${++c})`))
  beforeEach(() => dump(`inner beforeEach 2 (test ${++d})`))

  test('test 1', () => dump('inner test 1', true))
  test('test 2', () => dump('inner test 2', true))

  afterAll(() => dump('inner afterAll 1', true))
  afterAll(() => dump('inner afterAll 2', true))
  afterEach(() => dump('inner afterEach 1', true))
  afterEach(() => dump('inner afterEach 2', true))
})

afterAll(() => dump('outer afterAll 1', true))
afterAll(() => dump('outer afterAll 2', true))
afterEach(() => dump('outer afterEach 1', true))
afterEach(() => dump('outer afterEach 2', true))

_afterAll(() => dump('last _afterAll', true))
