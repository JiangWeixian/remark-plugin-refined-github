![remark-plugin-refined-github](https://realme-ten.vercel.app/api/v1/banner?colorA=7c2d12&colorB=c2410c&textColor=fb923c&title=remark-plugin-refined-github&subtitle=NEO&desc=Shorten%20github%20url%20like%20refined%20github)

[![npm](https://img.shields.io/npm/v/remark-plugin-refined-github)](https://github.com/JiangWeixian/remark-plugin-refined-github) [![GitHub](https://img.shields.io/npm/l/remark-plugin-refined-github)](https://github.com/JiangWeixian/remark-plugin-refined-github) 

*Shorten github repo url in md files like...*

![refined-github](https://user-images.githubusercontent.com/1402241/27252232-8fdf8ed0-538b-11e7-8f19-12d317c9cd32.png)

## install

```console
pnpm i remark-plugin-refined-github
```

## usage

```tsx
import { read } from 'to-vfile'
import { remarkRefinedGithub } from 'remark-plugin-refined-github'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'


const file = await remark()
  .use(remarkGfm)
  .use(remarkRefinedGithub)
  .process(await read('test/fixtures/input.md'))
```

## development

- **Setup** - `pnpm i`
- **Build** - `pnpm build`

# 
<div align='right'>

*built with ❤️ by 😼*

</div>

