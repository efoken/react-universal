'use client';

import type { ButtonMethods } from '@react-universal/components';
import { Button } from '@react-universal/components';
import { H2, P, Span } from '@react-universal/elements';
import { useCallback, useState } from 'react';

export interface CardProps {
  description?: string;
  href?: string;
  ref?: React.Ref<HTMLAnchorElement & ButtonMethods>;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ description, href, ref, title }) => {
  const [hovered, setHovered] = useState(false);

  const handleHoverIn = useCallback(() => setHovered(true), []);

  const handleHoverOut = useCallback(() => setHovered(false), []);

  return (
    <Button
      ref={ref}
      href={href}
      hrefAttrs={{
        target: '_blank',
        rel: 'noopener noreferrer',
      }}
      role="link"
      sx={{
        bgColor: `rgba(var(--card-rgb) / ${hovered ? 0.1 : 0})`,
        borderColor: `rgba(var(--card-border-rgb) / ${hovered ? 0.15 : 0})`,
        borderRadius: 'var(--border-radius)',
        borderWidth: 1,
        flexDir: 'column',
        px: { xs: '2.5rem', md: '1.2rem' },
        py: '1rem',
        transitionDuration: '200ms',
        transitionProperty: 'background-color, border-color',
      }}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      <H2
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.23,
          mb: { xs: '0.5rem', md: '0.7rem' },
        }}
      >
        {title}{' '}
        <Span
          sx={{
            display: 'inline-block' as any,
            transform: `translateX(${hovered ? '4px' : 0})`,
            // '@media (prefers-reduced-motion)': 'none',
            transition: 'transform 200ms',
          }}
        >
          -&gt;
        </Span>
      </H2>
      <P
        sx={{
          fontSize: '0.9rem',
          lineHeight: 1.5,
          maxWidth: '30ch',
          opacity: 0.6,
          textWrap: 'balance',
        }}
      >
        {description}
      </P>
    </Button>
  );
};
