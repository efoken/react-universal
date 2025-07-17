import { Stack, Text } from '@react-universal/components';
import { A, H1, Span } from '@react-universal/elements';
import { LuArrowUpRight } from 'react-icons/lu';
import { titleCase } from 'scule';

interface PageHeaderProps {
  title: string;
  description: string;
  links?: {
    source?: string;
    storybook?: string;
    recipe?: string;
    ark?: string;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, links }) => (
  <Stack sx={{ gap: '4', pb: '4' }}>
    <H1 sx={{ fontSize: '1.875rem' }}>{title}</H1>
    <Text sx={{ color: 'text.muted' }}>{description}</Text>
    {links && (
      <Stack direction="row" sx={{ gap: '6', mb: '4', flexWrap: 'wrap' }}>
        {Object.entries(links).map(([title, url]) => (
          <A
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.muted',
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
            {/* <ResourceIcon type={title} /> */}
            {titleCase(title)}
            <Span sx={{ color: 'text.muted' }}>
              <LuArrowUpRight />
            </Span>
          </A>
        ))}
      </Stack>
    )}
  </Stack>
);
