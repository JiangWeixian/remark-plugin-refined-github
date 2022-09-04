export function parse(node: { url: string }) {
  const url = node.url || ''
  const shortenRepoUrlRegex = /(.*)<code>(.*)<\/code>/
  const match = shortenRepoUrlRegex.exec(url)

  if (!match) {
    return
  }

  return {
    text: match?.[1],
    inlineCode: match?.[2],
  }
}
