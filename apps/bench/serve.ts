import path from "node:path"
import { brotliCompressSync } from "node:zlib"

// Serves the Astro build with brotli or gzip, like a production host, and
// disables caching so every load is cold.
const PORT = 4173
const DIST_DIR = path.join(import.meta.dir, "dist")
// Compress each response once, like a host serving precompressed assets.
const compressed = new Map<string, Uint8Array<ArrayBuffer>>()

Bun.serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url)
    const relative = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname
    const file = Bun.file(path.join(DIST_DIR, path.normalize(relative)))

    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 })
    }

    const accepts = request.headers.get("accept-encoding") ?? ""
    const encoding = accepts.includes("br") ? "br" : accepts.includes("gzip") ? "gzip" : "identity"
    const key = `${encoding}:${relative}`

    if (!compressed.has(key)) {
      const body = new Uint8Array(await file.arrayBuffer())

      compressed.set(
        key,
        encoding === "br"
          ? brotliCompressSync(body)
          : encoding === "gzip"
            ? Bun.gzipSync(body)
            : body,
      )
    }

    return new Response(compressed.get(key), {
      headers: {
        "cache-control": "no-store",
        "content-encoding": encoding,
        "content-type": file.type,
      },
    })
  },
})

console.log(`Serving http://localhost:${PORT}/full/ and http://localhost:${PORT}/scoped/`)
