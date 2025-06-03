import { Show, Stack } from '@react-universal/components';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { docs } from '#/.velite';
import { MDXContent } from '#/components/MDXContent';
import { PageHeader } from '#/components/PageHeader';
import { Toc } from '#/components/Toc';
import { flattenToc } from '#/lib/flattenToc';
import { SidebarEnd } from '../sidebar';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = docs.find((doc) => doc.slug === slug.join('/'));

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Stack
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          minH: 'var(--content-height)',
          overflow: 'auto' as any,
          pb: 18,
          pt: 13,
          px: { md: 15 },
          w: '100%',
        }}
      >
        <PageHeader title={page.title} description={page.description} links={page.links} />
        <MDXContent code={page.code} />
      </Stack>
      <Show when={!page.hideToc}>
        <SidebarEnd
          id="toc"
          sx={{
            visibility: page.toc.length === 0 ? 'hidden' : undefined,
          }}
        >
          <Toc items={flattenToc(page.toc)} />
        </SidebarEnd>
      </Show>
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = docs.find((doc) => doc.slug === slug.join('/'));

  const category = page?.slug
    .split('/')
    .slice(0, -1)
    .join(' > ')
    .replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: page?.title,
    description: page?.description,
    openGraph: {
      images: `/og?title=${page?.title}&category=${category}`,
    },
  };
}

export function generateStaticParams() {
  return docs.map((item) => ({
    slug: item.slug.split('/').slice(1),
  }));
}
