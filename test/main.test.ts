import { remarkRefinedGithub } from '../src'
import { parse } from '../src/utils'

import { it, expect, describe } from 'vitest'
import { read } from 'to-vfile'
import fs from 'fs'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'

describe('plugin', () => {
  it('basic', async () => {
    const file = await remark()
      .use(remarkGfm)
      .use(remarkRefinedGithub)
      .process(await read('test/fixtures/basic/input.md'))

    fs.writeFileSync('test/fixtures/basic/output.md', file.toString())
  })

  it('options', async () => {
    const file = await remark()
      .use(remarkGfm)
      .use(remarkRefinedGithub, { allowList: ['https://feedly.com'] })
      .process(await read('test/fixtures/options/input.md'))

    fs.writeFileSync('test/fixtures/options/output.md', file.toString())
  })
})

it('parse', async () => {
  const result = parse({ url: 'JiangWeixian/flash-point@<code>part2</code>' })
  expect(result).toMatchObject({
    text: result?.text,
    inlineCode: result?.inlineCode,
  })
})
