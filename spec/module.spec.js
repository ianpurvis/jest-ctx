import * as native from '@jest/globals'
import * as module from '../src/index.js'
import { expect, test } from '../src/index.js'
import { dumpKeys } from './helpers.js'

test('it implements the native jest api', () => {
  expect(dumpKeys(module)).toEqual(dumpKeys(native))
})
