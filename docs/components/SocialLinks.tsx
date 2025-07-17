import { Stack } from '@react-universal/components';
import { BsDiscord, BsGithub, BsTwitterX } from 'react-icons/bs';
import { Button } from './Button';

interface SocialLink {
  href: string;
  type: 'x' | 'github' | 'discord';
}

interface SocialLinksProps {
  items: SocialLink[];
}

const iconMap = {
  x: <BsTwitterX />,
  github: <BsGithub />,
  discord: <BsDiscord />,
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ items }) => (
  <Stack direction="row" sx={{ gap: '1' }}>
    {items.map((item) => (
      <Button
        key={item.type}
        role="link"
        href={item.href}
        hrefAttrs={{ target: '_blank', rel: 'noopener noreferrer' }}
        aria-label={`${item.type} link`}
        sx={{ h: 36, w: 36 }}
      >
        {iconMap[item.type]}
      </Button>
    ))}
  </Stack>
);
