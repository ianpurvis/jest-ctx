import type { Jest } from "@jest/environment";
import type { JestExpect } from "@jest/expect";
import type { Global as Native } from "@jest/types";

declare type Context = any;

declare type HookFn = (
  this: Native.TestContext,
  ctx: Context
) => unknown | Promise<unknown> | Generator<void, unknown, void>;

declare interface Hook {
  (fn: HookFn, timeout?: number): void;
}

declare type DescribeHook = Native.Describe;

declare type TestFn = (
  this: Native.TestContext,
  ctx: Context
) => void | Promise<unknown> | Generator<void, unknown, void>;

declare interface Test {
  (name: Native.TestNameLike, fn: TestFn, timeout?: number): void;
}

declare interface EachTest {
  <T extends Record<string, unknown>>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
  <T extends readonly [unknown, ...Array<unknown>]>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, ...args: T) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
  <T extends ReadonlyArray<unknown>>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, ...args: T) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
  <T>(table: ReadonlyArray<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
  <T = unknown>(strings: TemplateStringsArray, ...expressions: Array<T>): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: Record<string, T>) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
  <T extends Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...expressions: Array<unknown>
  ): (
    name: Native.TestNameLike,
    fn: (ctx: Context, arg: T) => ReturnType<TestFn>,
    timeout?: number
  ) => void;
}

declare interface TodoTest {
  (name: Native.TestNameLike): void;
}

declare interface ConcurrentExtension {
  concurrent: Test &
    EachExtension &
    FailingExtension &
    OnlyExtension &
    SkipExtension;
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
  todo: TodoTest;
}

declare interface Globals {
  afterAll: Hook;
  afterEach: Hook;
  beforeAll: Hook;
  beforeEach: Hook;
  describe: DescribeHook;
  expect: JestExpect;
  fdescribe: Globals["describe"]["only"];
  fit: Globals["test"]["only"];
  it: Globals["test"];
  jest: Jest;
  test: Test &
    ConcurrentExtension &
    EachExtension &
    FailingExtension &
    OnlyExtension &
    SkipExtension &
    TodoExtension;
  xdescribe: Globals["describe"]["skip"];
  xit: Globals["test"]["skip"];
  xtest: Globals["test"]["skip"];
}

export declare const afterAll: Globals["afterAll"];
export declare const afterEach: Globals["afterEach"];
export declare const beforeAll: Globals["beforeAll"];
export declare const beforeEach: Globals["beforeEach"];
export declare const describe: Globals["describe"];
export declare const expect: Globals["expect"];
export declare const fdescribe: Globals["fdescribe"];
export declare const fit: Globals["fit"];
export declare const it: Globals["test"];
export declare const jest: Globals["jest"];
export declare const test: Globals["test"];
export declare const xdescribe: Globals["xdescribe"];
export declare const xit: Globals["xit"];
export declare const xtest: Globals["xtest"];
