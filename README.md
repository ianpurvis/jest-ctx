# jest-ctx

Pass context to [Jest](https://jestjs.io) hooks and tests.

## Getting Started

    $ npm i -D github:ianpurvis/jest-ctx.git

    $ yarn add -D github:ianpurvis/jest-ctx.git

`jest-ctx` exports the same module interface as `@jest/globals`, so it is easy
to drop into your codebase:

    import {
        afterAll,
        afterEach,
        beforeAll,
        beforeEach,
        describe,
        expect,
        jest,
        test // aliases such as `it` are available as well.
    } from 'jest-ctx'

If you would like to inject `jest-ctx` into the global environment, modify your
Jest config to disable [`injectGlobals`](https://jestjs.io/docs/configuration#injectglobals-boolean)
and then add a file to [`setupFilesAfterEnv`](https://jestjs.io/docs/configuration#setupfilesafterenv-array)
with the following:

    import * as globals from 'jest-ctx'
    Object.assign(globalThis, globals)

## Usage

Context can be anything you like including objects, arrays, and primitives. It
is undefined by default. To give some context, use a `beforeAll` or
`beforeEach` hook.

### `beforeAll(fn, timeout)`

You can set the context of any test group (top-level or described) by returning
data from a `beforeAll` hook:

    beforeAll(() => '🍐');
    it('has group context', (ctx) => expect(ctx).toEqual('🍐'));

`beforeAll` hooks receive context as their first argument, which allows for
accumulation:

    beforeAll(() => '🍐');
    beforeAll((ctx) => ctx + '🍐');
    it('accumulates group context', (ctx) => expect(ctx).toEqual('🍐🍐'));

`beforeAll` hooks of described groups inherit the context of their ancestors:

    beforeAll(() => '🍐');

    describe('group one', () => {
      beforeAll((ctx) => ctx + '🍎');
      it('inherits group context', (ctx) => expect(ctx).toEqual('🍐🍎'));
    })

    describe('group two', () => {
      beforeAll((ctx) => ctx + '🍊');
      it('inherits group context', (ctx) => expect(ctx).toEqual('🍐🍊'));
    })


### `beforeEach(fn, timeout)`

You can set the isolated context of each test in a group by returning data from
a `beforeEach` hook:

    const sequence = [...'🍋🍉'];
    beforeEach(() => sequence.shift());
    it('has test context one', (ctx) => expect(ctx).toEqual('🍋'));
    it('has test context two', (ctx) => expect(ctx).toEqual('🍉'));

`beforeEach` hooks can accumlate context:

    beforeEach(() => '🍋');
    beforeEach((ctx) => ctx + '🍉');
    it('accumulates test context', (ctx) => expect(ctx).toEqual('🍋🍉'));

`beforeEach` hooks inherit group context:

    beforeAll(() => '🍐');
    beforeEach((ctx) => ctx + '🍋');
    it('inherits group context' (ctx) => expect(ctx).toEqual('🍐🍋'));

`beforeEach` hooks of described groups inherit context from their ancestors:

    beforeEach(() => '🍋');

    describe('group one', () => {
      beforeEach((ctx) => ctx + '🍉');
      it('inherits test context', (ctx) => expect(ctx).toEqual('🍋🍉'));
    })

    describe('group two', () => {
      beforeEach((ctx) => ctx + '🥝');
      it('inherits test context', (ctx) => expect(ctx).toEqual('🍋🥝'));
    })


### `test(name, fn, timeout)`

`test` hooks receive context as their first argument. Return values do not affect
context.

    beforeAll(() => '🍐');
    beforeEach((ctx) => ctx + '🍋');
    it('has group and test context' (ctx) => expect(ctx).toEqual('🍐🍋'));

### `afterAll(fn, timeout)`

`afterAll` hooks receive context as their first argument. Note that this will
be the context of the group and will not include any isolated test context
created by `beforeEach`. If you need test context, see the `afterEach` hook.
Return values do not affect context.

    beforeAll(() => '🍐');
    beforeEach((ctx) => ctx + '🍋');
    afterAll((ctx) => expect(ctx).toEqual('🍐'));

### `afterEach(fn, timeout)`

`afterEach` hooks receive context as their first argument. Return values do not
affect context.

    beforeAll(() => '🍐');
    beforeEach((ctx) => ctx + '🍋');
    afterEach((ctx) => expect(ctx).toEqual('🍐🍋'));


## Notes

### Accumulation

Context can be accumulated to achieve many different scenarios.
Make sure you have a good grasp of Jest's
[scoping and order of execution](https://jestjs.io/docs/setup-teardown)
when mixing `beforeAll` and `beforeEach`:

    beforeAll(() => '🍐');
    beforeEach((ctx) => ctx + '🍋');
    it('has group and test context', (ctx) => expect(ctx).toEqual('🍐🍋'));

    describe('group one', () => {
      beforeAll((ctx) => ctx + '🍎');
      beforeEach((ctx) => ctx + '🍉');
      it('has group and test context', (ctx) => expect(ctx).toEqual('🍐🍎🍋🍉'));
    })

    describe('group two', () => {
      beforeAll((ctx) => ctx + '🍊');
      beforeEach((ctx) => ctx + '🥝');
      it('has group and test context', (ctx) => expect(ctx).toEqual('🍐🍊🍋🥝'));
    })


### Mutability

Any style of data management is allowed, so you are free to mutate your
contexts or keep them immutable, even freeze them, seal them, etc.

Context is only set when a value is returned from `beforeAll` or `beforeEach`.


### Async Code

Async functions, promises, and timeouts work as usual. Note that hooks do not
receive a `done` callback like their native counterparts. As an alternative to
`done`, try using a pattern like this:

    it('can be done', (ctx) => new Promise((done) => {
      asyncCode(ctx, done)
    }))

If it's got to be done with `done`, please open an issue and let's figure it out.


### Each

`test.each` and its variations receive context as the first argument followed
by the usual args for each table row:

    beforeAll(() => '🍍')
    it.each(['🥥'])(`has context and table data`, (ctx, data) => {
      expect(ctx).toEqual('🍍')
      expect(data).toEqual('🥥')
    })


### Concurrency

`test.concurrent` and its variations are affected by a known issue with
`beforeEach` (https://github.com/facebook/jest/issues/7997)

## License

`jest-ctx` is available as open source under the terms of the [MIT License](LICENSE).

[![https://purvisresearch.com](.logo.svg)](https://purvisresearch.com)
