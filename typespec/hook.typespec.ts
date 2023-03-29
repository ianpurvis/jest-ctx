import type { Global as native } from '@jest/types'
import type { HookFn } from 'jest-ctx'
import { afterAll, afterEach, beforeAll, beforeEach, } from 'jest-ctx'

let fn: HookFn

// it works with ctx
fn = (ctx) => ctx + 1

// it works without ctx
fn = () => {}

// it works with async
fn = async (ctx) => ctx + 1

// it is compatible with native HookFn:
const nativeFn: native.HookFn = () => {}
fn = nativeFn

// it is compatible with all hooks:
let timeout: number | undefined

beforeAll(fn, timeout)
beforeEach(fn, timeout)
afterEach(fn, timeout)
afterAll(fn, timeout)
