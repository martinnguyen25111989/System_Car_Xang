const files = import.meta.glob('../../../curriculum/level-*/lesson-*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const byId = new Map<string, string>()

for (const [path, source] of Object.entries(files)) {
  const match = path.match(/lesson-(\d+)\.md$/)
  if (!match || typeof source !== 'string') continue
  byId.set(`L${match[1].padStart(2, '0')}`, source)
}

export function lessonMarkdown(id: string): string | null {
  return byId.get(id) ?? null
}
