const facades = ["src/index.ts"]

for await (const path of new Bun.Glob("src/components/ui/*.tsx").scan(".")) {
  facades.push(path)
}

// Keep namespaces outside client modules; bundling them can move the object across the RSC boundary.
for (const path of facades) {
  const source = await Bun.file(path).text()
  const statements = source.trim().split("\n")
  if (
    !statements.every(function (statement) {
      return /^export (?:\*|\* as \w+|\{ [\w, ]+ \}) from "\.[^"]+\.js"$/.test(statement)
    })
  ) {
    throw new Error(`Public facade must contain only re-exports with .js paths: ${path}`)
  }
  const output = path.replace(/^src\//, "dist/").replace(/\.tsx?$/, ".js")
  await Bun.write(output, source)
}
