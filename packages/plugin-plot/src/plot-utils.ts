import * as mathjs from 'mathjs'

let math = mathjs

export function createInstance(imported: math.ImportObject) {
  math = mathjs.create(mathjs.all)
  if (imported !== undefined) {
    math.import(imported, {})
  }
}

export function getSymbols(expr: math.MathNode) {
  return expr
    .filter((node) => {
      if (node instanceof math.SymbolNode && node.isSymbolNode) {
        try {
          const e = node.evaluate()
          return !!e.units
        } catch {
          return node.name !== 'x'
        }
      }
      return false
    })
    .map((node: unknown) => (node as math.SymbolNode).name)
}

export function parseExpression(expression: string, get: (path: string) => any) {
  const parsed = math.parse(expression)
  const symbols = getSymbols(parsed)
  const scope = symbols.reduce((acc, path) => {
    const symbol = get(path)
    if (!symbol) throw Error(`Invalid symbol at path \`${path}\``)
    return Object.assign(acc, { [path]: symbol })
  }, {} as { [key in keyof typeof symbols]: any })

  let _formattedString = parsed.toString()

  for (let key in scope) {
    const re = new RegExp(`\\b${key}\\b`, 'g')
    // TODO check type better than this
    const s = typeof scope[key] === 'function' ? scope[key].__parsedScoped.toString() : scope[key]
    _formattedString = _formattedString.replace(re, s)
  }

  const parsedScoped = math.parse(_formattedString)
  const compiled = parsedScoped.compile()

  function expr(v: number) {
    return compiled.evaluate({ x: v })
  }

  Object.assign(expr, {
    __parsedScoped: parsedScoped,
    __parsed: parsed,
    __symbols: symbols,
  })

  return expr
}
