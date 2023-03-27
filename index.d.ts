import type { Jest } from '@jest/environment';
import type { JestExpect } from '@jest/expect';
import type { Global } from '@jest/types';


declare interface CtxHookBase {
  (fn: CtxHookFn, timeout?: number): void;
}

declare interface CtxEach<T> {
}

declare interface CtxFailing<T extends CtxTestFn> {
  (testName: Global.TestNameLike, fn: T, timeout?: number): void;
  each: CtxEach<T>;
}

declare type CtxHookFn = CtxTestFn;

declare type CtxTestFn =
  | CtxPromiseReturningTestFn
  | CtxGeneratorReturningTestFn;

declare type Ctx = any;

declare type CtxTestReturnValuePromise = Promise<unknown>;
declare type CtxPromiseReturningTestFn = (this: Global.TestContext, ctx: Ctx) => unknown; //Global.TestReturnValue;
declare type CtxTestReturnValueGenerator = Generator<void, unknown, void>;
declare type CtxGeneratorReturningTestFn = (
  this: Global.TestContext,
) => CtxTestReturnValueGenerator;

declare interface CtxIt extends CtxItBase {
  only: CtxItBase;
  skip: CtxItBase;
  todo: (testName: Global.TestNameLike) => void;
}

declare interface CtxItBase {
  (testName: Global.TestNameLike, fn: CtxTestFn, timeout?: number): void;
  each: CtxEach<CtxTestFn>;
  failing: CtxFailing<CtxTestFn>;
}

declare interface CtxItConcurrent extends CtxIt {
  concurrent: CtxItConcurrentExtended;
}

declare type CtxConcurrentTestFn = () => CtxTestReturnValuePromise;

declare interface CtxItConcurrentBase {
  (testName: Global.TestNameLike, testFn: CtxConcurrentTestFn, timeout?: number): void;
  each: CtxEach<CtxConcurrentTestFn>;
  failing: CtxFailing<CtxConcurrentTestFn>;
}

declare interface CtxItConcurrentExtended extends CtxItConcurrentBase {
  only: CtxItConcurrentBase;
  skip: CtxItConcurrentBase;
}

declare interface CtxTestFrameworkGlobals {
  expect: unknown;
  it: CtxItConcurrent;
  test: CtxItConcurrent;
  fit: CtxItBase & {
    concurrent?: CtxItConcurrentBase;
  };
  xit: CtxItBase;
  xtest: CtxItBase;
  describe: Global.Describe;
  xdescribe: Global.DescribeBase;
  fdescribe: Global.DescribeBase;
  beforeAll: CtxHookBase;
  beforeEach: CtxHookBase;
  afterEach: CtxHookBase;
  afterAll: CtxHookBase;
}

export declare const expect: JestExpect;
export declare const describe: Global.Describe;
export declare const xdescribe: Global.DescribeBase;
export declare const fdescribe: Global.DescribeBase;
export declare const jest: Jest;
export declare const it: CtxItConcurrent;
export declare const test: CtxItConcurrent;
export declare const fit: CtxItBase & {
  concurrent?: CtxItConcurrentBase;
};
export declare const xit: CtxItBase;
export declare const xtest: CtxItBase;
export declare const beforeAll: CtxHookBase;
export declare const beforeEach: CtxHookBase;
export declare const afterEach: CtxHookBase;
export declare const afterAll: CtxHookBase;
