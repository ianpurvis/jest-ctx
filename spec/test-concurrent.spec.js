import { beforeAll, describe, expect, it, jest, test } from '../src/index.js'

beforeAll(() => '🍐')

test.concurrent('receives group context', (context) => {
  expect(context).toBe('🍐')
})

describe('in a described group', () => {
  beforeAll((ctx) => ctx + '🍎')

  describe('...', () => {
    test.concurrent('receives group context', async (context) => {
      expect(context).toBe('🍐🍎')
    })
  })
})
