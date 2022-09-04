import { visit } from 'unist-util-visit'
import shortenRepoUrl from 'shorten-repo-url'
import type { Plugin } from 'unified'

export function remarkRefinedGithub(): Plugin {
  return (tree) => {
    visit(tree, 'link', (node) => {
      const text = shortenRepoUrl(node.url)
      const link = parse({ url: text })

      /** @type {StaticPhrasingContent[]} */
      const children = []

      if (!link) {
        children.push({
          type: 'text',
          value: text,
        })
        node.children = children
        return
      }

      if (link?.text) {
        children.push({
          type: 'text',
          value: link?.text,
        })
      }

      if (link?.inlineCode) {
        children.push({
          type: 'inlineCode',
          value: link?.inlineCode,
        })
      }

      node.children = children
    })
  }
}

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
