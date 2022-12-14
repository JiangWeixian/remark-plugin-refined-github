import { visit } from 'unist-util-visit'
import shortenRepoUrl from 'shorten-repo-url'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'

import { parse } from './utils'

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

const isAllowed = (href: string, allowList?: string[]) => {
  if (!allowList) {
    return true
  }
  const { origin } = new URL(href)
  return allowList.some((h) => h.includes(origin))
}

const isShortened = (node: any) => {
  return node.url !== toString(node)
}

export function remarkRefinedGithub({ allowList = defaultAllowList }: Options = {}): Plugin {
  return (tree) => {
    visit(tree, 'link', (node) => {
      // skip shorten url `[text](url)`
      if (isShortened(node)) {
        return
      }
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
