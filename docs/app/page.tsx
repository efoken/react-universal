import { Container, Text } from '@universal-ui/components';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Container
        style={{ c: styles.description, $$css: true } as any}
        sx={
          {
            display: 'inherit',
            justifyContent: 'inherit',
            alignItems: 'inherit',
            fontSize: { xs: '0.8rem', md: '0.85rem' },
            maxW: 'var(--max-width)',
            w: '100%',
            zIndex: 2,
            fontFamily: 'var(--font-mono)',
          } as any
        }
      >
        <Text
          role={'paragraph' as any}
          sx={
            {
              '--bg-color': 'rgba(var(--callout-rgb), 0.5)',
              alignItems: { xs: 'center', md: 'unset' },
              backdropFilter: { xs: 'blur(24px)', md: 'unset' },
              backgroundClip: { xs: 'padding-box', md: 'unset' },
              backgroundImage: {
                xs: 'linear-gradient(to bottom, rgba(var(--background-start-rgb), 1), rgba(var(--callout-rgb), 0.5))',
                md: 'unset',
              },
              bgColor: 'var(--bg-color)',
              borderBottomWidth: 1,
              borderColor: {
                xs: 'rgba(var(--callout-border-rgb), 0.25)',
                md: 'rgba(var(--callout-border-rgb), 0.3)',
              },
              borderLeftWidth: { md: 1 },
              borderRadius: { xs: 0, md: 'var(--border-radius)' },
              borderRightWidth: { md: 1 },
              borderTopWidth: { md: 1 },
              bottom: { xs: 'auto', md: 'unset' },
              display: { xs: 'flex', md: 'unset' },
              justifyContent: { xs: 'center', md: 'unset' },
              left: { xs: 0, md: 'unset' },
              m: 0,
              pb: { xs: '1.4rem', md: '1rem' },
              position: { xs: 'fixed', md: 'relative' },
              pt: { xs: '2rem', md: '1rem' },
              px: '1rem',
              right: { xs: 0, md: 'unset' },
              top: { xs: 0, md: 'unset' },
              w: { xs: '100%', md: 'unset' },
            } as any
          }
        >
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </Text>
        <div>
          <Text
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            hrefAttrs={{
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
            sx={
              {
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                p: { xs: '1rem', md: 'unset' },
              } as any
            }
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </Text>
        </div>
      </Container>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
