import { A, H2, H3, H4, Img, P, Strong } from '@react-universal/elements';
import type { AnyObject } from '@react-universal/utils';
import * as runtime from 'react/jsx-runtime';
import { Card } from './Card';
import { Code } from './mdx/Code';
import { Pre } from './mdx/Pre';

const sharedComponents = {
  a: A,
  // blockquote: Blockquote,
  img: Img,
  p: (props: Pick<React.HTMLProps<HTMLParagraphElement>, 'children' | 'id'>) => (
    <P sx={{ color: 'text.muted', mb: 4 }} {...props} />
  ),
  strong: Strong,
  h2: (props: Pick<React.HTMLProps<HTMLHeadingElement>, 'children' | 'id'>) => (
    <H2 sx={{ fontSize: '1.375rem', mb: 4, mt: 7 }} {...props} />
  ),
  h3: (props: Pick<React.HTMLProps<HTMLHeadingElement>, 'children' | 'id'>) => (
    <H3 sx={{ fontSize: '1.25rem', mb: 2, mt: 7 }} {...props} />
  ),
  h4: (props: Pick<React.HTMLProps<HTMLHeadingElement>, 'children' | 'id'>) => (
    <H4 sx={{ fontSize: '1.125rem', mb: 1, mt: 7 }} {...props} />
  ),
  // kbd: Kbd,
  pre: Pre,
  code: Code,
  // ol: Ol,
  // ul: Ul,
  // li: Li,
  // table: Table,
  // steps: Steps,
  // callout: Callout,
  // "code-group": CodeGroup,
  // card: Card,
  // "card-group": CardGroup,
  Card,
  // hr: Hr,
  // "code-block": CodeBlock,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MDXProps {
  code: string;
  components?: AnyObject<React.ComponentType>;
}

export const MDXContent: React.FC<MDXProps> = ({ code, components = {} }) => {
  const Component = useMDXComponent(code);

  return (
    <div style={{ display: 'block' }}>
      <Component components={{ ...sharedComponents, ...components }} />
    </div>
  );
};
