export function contextFromLoopArgs(...args) {
  let context
  if (args.length === 1 && args[0] === Object(args[0])) {
    context = args[0]
  } else {
    context = args.reduce((prev, next, i) => ({ ...prev, [i]: next }), {})
  }
  return context
}
