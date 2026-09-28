import path from "node:path"

// Approximates Tailwind's scanner: any token between whitespace, double quotes,
// or backticks may be a class, and single quotes also split JS strings. Tailwind
// ignores tokens that are not valid utilities.
export function extractCandidates(content: string, candidates: Set<string>) {
  for (const token of content.split(/[\s"`\\]+/)) {
    for (const part of [token, ...token.split("'")]) {
      if (part) {
        candidates.add(part)
        candidates.add(part.replace(/[,;:)}\]]+$/, ""))
      }
    }
  }
}

// Resolves @import targets for Tailwind's compiler, including packages that
// expose CSS through the "style" export condition.
export async function loadStylesheet(id: string, base: string) {
  const file =
    id.startsWith(".") || path.isAbsolute(id) ? path.resolve(base, id) : resolveStyle(id, base)

  return { base: path.dirname(file), content: await Bun.file(file).text(), path: file }
}

function resolveStyle(id: string, base: string) {
  const manifestPath = Bun.resolveSync(`${id}/package.json`, base)
  const manifest = require(manifestPath) as {
    exports?: { ".": { style?: string } }
    style?: string
  }
  const style = manifest.exports?.["."]?.style ?? manifest.style

  if (!style) {
    throw new Error(`${id} has no stylesheet export`)
  }

  return path.join(path.dirname(manifestPath), style)
}
