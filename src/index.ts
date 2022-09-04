import { visit } from 'unist-util-visit'
import shortenRepoUrl from 'shorten-repo-url'
import type { Plugin } from 'unified'

// refs: https://github.com/refined-github/shorten-repo-url/blob/main/index.js#L68
const defaultAllowList = [
  'https://github.com',
  'https://www.npmjs.com',
  'https://raw.githubusercontent.com',
  'https://cdn.rawgit.com',
  'https://rawgit.com',
  'https://togithub.com', // Renovate
  'https://github-redirect.dependabot.com', // Dependabot
]

type Options = {
  allowList?: string[]
}

const isAllowed = (href: string, allowList = defaultAllowList) => {
  const { origin } = new URL(href)
  return allowList.some((h) => h.includes(origin))
}

export function remarkRefinedGithub({ allowList = defaultAllowList }: Options = {}): Plugin {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (!isAllowed(node.url, allowList)) {
        return
      }
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
