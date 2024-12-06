import { A, H1, H2, H3, H4, Img, P, Strong } from '@react-universal/elements';
import type { AnyObject } from '@react-universal/utils';
import * as runtime from 'react/jsx-runtime';
import { Card } from './Card';
import { Code } from './mdx/Code';
import { Pre } from './mdx/Pre';

const sharedComponents = {
  a: A,
  // blockquote: Blockquote,
  img: Img,
  p: P,
  strong: Strong,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
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
    <div style={{ display: 'contents' }}>
      <Component components={{ ...sharedComponents, ...components }} />
    </div>
  );
};
