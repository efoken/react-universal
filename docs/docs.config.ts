export interface NavItem {
  title: string;
  url?: string;
  external?: boolean;
  status?: string;
  items?: NavItem[];
}

export interface Config {
  storybookUrl: string;
  repoUrl: string;
  repoBranch: string;
  navigation: NavItem[];
}

const config: Config = {
  storybookUrl: '',
  repoBranch: 'main',
  repoUrl: 'https://github.com/efoken/react-universal',
  navigation: [
    {
      title: 'Docs',
      url: 'docs',
      items: [
        {
          title: 'Get Started',
          url: 'getting-started',
          items: [
            {
              title: 'Overview',
              items: [{ title: 'Installation', url: 'installation' }],
            },
            {
              title: 'Frameworks',
              url: 'frameworks',
              items: [{ title: 'Next.js (App)', url: 'next-app' }],
            },
          ],
        },
        {
          title: 'Components',
          url: 'components',
          items: [
            {
              title: 'Concepts',
              url: 'concepts',
              items: [
                { title: 'Overview', url: 'overview' },
                { title: 'Composition', url: 'composition' },
              ],
            },
            {
              title: 'Layout',
              items: [
                { title: 'Box', url: 'box' },
                { title: 'Container', url: 'container' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default config;
