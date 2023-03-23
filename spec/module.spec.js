import * as native from '@jest/globals'
import * as module from 'jest-ctx'
import { expect, test } from 'jest-ctx'
import { dumpKeys } from './helpers.js'

test('it implements the native jest api', () => {
  expect(dumpKeys(module)).toEqual(dumpKeys(native))
})
