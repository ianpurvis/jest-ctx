import { generate } from 'randomstring'

export const fakeContext = () => ({
  [generate()]: generate()
})
