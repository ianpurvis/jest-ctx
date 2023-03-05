import { generate } from 'randomstring'

export const fakeContext = () => ({ key: generate() })

export const noop = () => {}
