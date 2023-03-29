import type { Global as native } from '@jest/types'
import type { TestFn } from 'jest-ctx'
import { test } from 'jest-ctx'

let fn: TestFn

// it works with ctx
fn = (ctx) => { ctx + 1 }

// it works without ctx
fn = () => {}

// it works with async
fn = async (ctx) => { ctx + 1 }

// it is compatible with native TestFn:
let nativeFn: native.TestFn = () => {}
fn = nativeFn

// it is compatible with all test variants
let name: native.TestNameLike = ''
let timeout: number | undefined
let table: [] = []

test(name, fn, timeout)
test.concurrent(name, fn, timeout)
test.concurrent.each(table)(name, fn, timeout)
test.concurrent.failing(name, fn, timeout)
test.concurrent.failing.each(table)(name, fn, timeout)
test.concurrent.only(name, fn, timeout)
test.concurrent.only.each(table)(name, fn, timeout)
test.concurrent.only.failing(name, fn, timeout)
test.concurrent.only.failing.each(table)(name, fn, timeout)
test.concurrent.skip(name, fn, timeout)
test.each(table)(name, fn, timeout)
test.failing(name, fn, timeout)
test.failing.each(table)(name, fn, timeout)
test.only(name, fn, timeout)
test.only.each(table)(name, fn, timeout)
test.only.failing(name, fn, timeout)
test.only.failing.each(table)(name, fn, timeout)
test.skip(name, fn, timeout)
test.todo(name)
