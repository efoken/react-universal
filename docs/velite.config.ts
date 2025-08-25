import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { defineCollection, defineConfig, s } from 'velite';
import docsConfig from './docs.config';

const docs = defineCollection({
  name: 'Docs',
  pattern: ['content/**/*.mdx'],
  schema: s
    .object({
      title: s.string(),
      slug: s.path(),
      description: s.string(),
      metadata: s.metadata(),
      content: s.markdown(),
      toc: s.toc(),
      code: s.mdx(),
      hideToc: s.boolean().optional(),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
        })
        .optional(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: data.slug.replace(/^content\//, ''),
      links: {
        ...data.links,
        source: data.links?.source
          ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/${data.links.source}`
          : undefined,
        storybook: data.links?.storybook
          ? `${docsConfig.storybookUrl}/?path=/story/${data.links.storybook}`
          : undefined,
      },
      category: (meta.path as string)
        .replace(/.*\/content\//, '')
        .replace(/\/[^/]*$/, '')
        .replace(process.cwd(), ''),
    })),
});

export default defineConfig({
  root: process.cwd(),
  collections: {
    docs,
  },
  mdx: {
    remarkPlugins: [remarkDirective, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeShiki, { theme: 'dark-plus' }],
      //   [
      //     rehypeShiki,
      //     {
      //       transformers: [
      //         transformerNotationDiff(),
      //         transformerNotationFocus(),
      //         transformerNotationHighlight(),
      //         transformerNotationWordHighlight(),
      //         transformerMetaHighlight(),
      //         transformerMetaWordHighlight(),
      //       ],
      //       theme: 'dark-plus',
      //     },
      //   ],
      //   [
      //     rehypeAutolinkHeadings,
      //     {
      //       behavior: 'wrap',
      //       properties: {
      //         className: ['subheading-anchor'],
      //       },
      //     },
      //   ],
    ],
  },
});
