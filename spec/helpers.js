import { generate } from 'randomstring'

export const fakeContext = () => ({
  [generate()]: generate()
})

export const noop = () => {}
