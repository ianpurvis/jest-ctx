import type { Jest } from '@jest/environment';
import type { JestExpect } from '@jest/expect';
import type { Global as Native } from '@jest/types';

declare type Context = any;

declare type HookFn = (
  this: Native.TestContext,
  ctx: Context
) => unknown | Promise<unknown> | Generator<void, unknown, void>;

declare interface Hook {
  (fn: HookFn, timeout?: number): void;
}

declare type TestFn = (
  this: Native.TestContext,
  ctx: Context
) => void | undefined | Promise<unknown> | Generator<void, unknown, void>;

declare interface Test {
  (name: Native.TestNameLike, fn: TestFn, timeout?: number): void;
}

declare interface EachTest {
  <T extends Record<string, unknown>>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
  <T extends readonly [unknown, ...Array<unknown>]>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, ...args: T) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
  <T extends ReadonlyArray<unknown>>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, ...args: T) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
  <T>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
  <T = unknown>(strings: TemplateStringsArray, ...expressions: Array<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: Record<string, T>) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
  <T extends Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...expressions: Array<unknown>
  ): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number,
  ) => void;
}

declare interface ConcurrentExtension {
  concurrent: Test & EachExtension & FailingExtension & OnlyExtension & SkipExtension;
}

declare interface EachExtension {
  each: EachTest;
}

declare interface FailingExtension {
  failing: Test & EachExtension;
}

declare interface OnlyExtension {
  only: Test & EachExtension & FailingExtension;
}

declare interface SkipExtension {
  skip: Test & EachExtension & FailingExtension;
}

declare interface TodoExtension {
  todo: (name: Native.TestNameLike) => void;
}

declare type AllExtensions =
  ConcurrentExtension &
  EachExtension &
  FailingExtension &
  OnlyExtension &
  SkipExtension &
  TodoExtension;


declare interface Globals {
  expect: unknown;
  it: Test & AllExtensions;
  test: Test & AllExtensions;
  fit: Test & EachExtension & FailingExtension & ConcurrentExtension;
  xit: Test & EachExtension & FailingExtension;
  xtest: Test & EachExtension & FailingExtension;
  describe: Native.Describe;
  xdescribe: Native.DescribeBase;
  fdescribe: Native.DescribeBase;
  beforeAll: Hook;
  beforeEach: Hook;
  afterEach: Hook;
  afterAll: Hook;
}

export declare const expect: JestExpect;
export declare const describe: Native.Describe;
export declare const xdescribe: Native.DescribeBase;
export declare const fdescribe: Native.DescribeBase;
export declare const jest: Jest;
export declare const it: Test & AllExtensions;
export declare const test: Test & AllExtensions;
export declare const fit: Test & EachExtension & FailingExtension & ConcurrentExtension;
export declare const xit: Test & EachExtension & FailingExtension & ConcurrentExtension;
export declare const xtest: Test & EachExtension & FailingExtension & ConcurrentExtension;
export declare const beforeAll: Hook;
export declare const beforeEach: Hook;
export declare const afterEach: Hook;
export declare const afterAll: Hook;
