import { randomBytes } from 'node:crypto'
export { setTimeout as wait } from 'node:timers/promises'

export function dumpKeys(o) {
  return Object.keys(o).sort().flatMap(key => {
    const children = dumpKeys(o[key]).map(child => `${key}.${child}`)
    return [key, ...children]
  })
}

export function toStartWith(actual, expected) {
  const pass = actual.startsWith(expected)
  const message = () =>
    this.utils.matcherHint('toStartWith') +
      '\n' +
      `\nexpected: ${this.utils.printReceived(actual)}` +
      `\nreceived: ${this.utils.printExpected(expected)}`

  return { message, pass }
}

export function randomString(length = 8) {
  return randomBytes(Math.ceil(length / 4) * 3).toString('base64').slice(0, length)
}
