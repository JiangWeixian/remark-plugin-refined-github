import { remarkRefinedGithub, parse } from '../src'

import { test, expect } from 'vitest'
import { read } from 'to-vfile'
import fs from 'fs'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'

test('plugin', async () => {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRefinedGithub)
    .process(await read('test/fixtures/input.md'))

  fs.writeFileSync('test/fixtures/output.md', file.toString())
})

test('parse', async () => {
  const result = parse({ url: 'JiangWeixian/flash-point@<code>part2</code>' })
  expect(result).toMatchObject({
    text: result?.text,
    inlineCode: result?.inlineCode,
  })
})
