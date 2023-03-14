import * as native from '@jest/globals'
import * as module from '../src/index.js'
import { expect, test } from '../src/index.js'

const keys = (o) => Object.keys(o).sort()

test('it includes all globals', () => {
  expect(keys(module)).toEqual(keys(native))
})

test('it includes all test extensions', () => {
  expect(keys(module.test)).toEqual(keys(native.test))
})

test('it includes all describe extensions', () => {
  expect(keys(module.describe)).toEqual(keys(native.describe))
})
