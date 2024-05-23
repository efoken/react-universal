import { Box, Container, Link, Text } from '@universal-ui/components';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <Box
      as="main"
      sx={{
        top: 0,
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: '6rem' as any,
        minH: '100vh' as any,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: 'inherit' as any,
          display: 'inherit' as any,
          fontFamily: 'var(--font-mono)',
          fontSize: { xs: '0.8rem' as any, md: '0.85rem' as any },
          justifyContent: 'inherit' as any,
          maxW: { xl: 'var(--max-width)' as any },
          zIndex: 2,
        }}
      >
        <Text
          role="paragraph"
          sx={{
            '--bg-color': 'rgba(var(--callout-rgb), 0.5)',
            alignItems: 'center',
            backdropFilter: { xs: 'blur(24px)', md: 'unset' },
            backgroundClip: { xs: 'padding-box', md: 'unset' },
            backgroundImage: {
              xs: 'linear-gradient(to bottom, rgba(var(--background-start-rgb), 1), rgba(var(--callout-rgb), 0.5))',
              md: 'unset',
            },
            bgColor: 'var(--bg-color)',
            borderBottomWidth: 1,
            borderColor: {
              xs: 'var(--undefined, rgba(var(--callout-border-rgb), 0.25))',
              md: 'var(--undefined, rgba(var(--callout-border-rgb), 0.3))',
            },
            borderLeftWidth: { md: 1 },
            borderRadius: { xs: 0, md: 'var(--border-radius)' as any },
            borderRightWidth: { md: 1 },
            borderTopWidth: { md: 1 },
            bottom: { xs: 'auto', md: 'unset' as any },
            display: { xs: 'flex', md: 'block' as any },
            justifyContent: 'center',
            left: { xs: 0, md: 'unset' as any },
            m: 0,
            pb: { xs: '1.4rem' as any, md: '1rem' as any },
            position: { xs: 'fixed', md: 'relative' },
            pt: { xs: '2rem' as any, md: '1rem' as any },
            px: '1rem' as any,
            right: { xs: 0, md: 'unset' as any },
            top: { xs: 0, md: 'unset' as any },
            w: { xs: '100%', md: 'unset' as any },
          }}
        >
          Get started by editing&nbsp;
          <Text
            as="code"
            sx={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}
          >
            app/page.tsx
          </Text>
        </Text>
        <Box
          sx={{
            alignItems: { xs: 'flex-end', md: 'stretch' },
            backgroundImage: {
              xs: 'linear-gradient(to bottom, transparent 0%, rgb(var(--background-end-rgb)) 40%)',
              md: 'none',
            },
            bottom: { xs: 0, md: 'unset' as any },
            flexDir: 'row',
            h: { xs: 200, md: 'unset' as any },
            justifyContent: { xs: 'center', md: 'unset' as any },
            left: { xs: 0, md: 'unset' as any },
            p: { xs: '2rem' as any, md: 0 },
            pointerEvents: { xs: 'none', md: 'unset' },
            position: { xs: 'fixed', md: 'relative' },
            right: { xs: 0, md: 'unset' as any },
            top: { xs: 'auto', md: 'unset' as any },
            w: { xs: '100%', md: 'unset' as any },
            zIndex: { xs: 1, md: 0 },
          }}
        >
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            hrefAttrs={{
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
            sx={{
              alignItems: 'center',
              display: 'flex',
              gap: '0.5rem' as any,
              justifyContent: 'center',
              p: { xs: '1rem' as any, md: 0 },
            }}
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
          </Link>
        </Box>
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

      <Container
        as="div"
        maxWidth="xl"
        sx={{
          display: 'grid' as any,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 50%)',
            xl: 'repeat(4, minmax(25%, auto))',
          },
          maxW: { xs: 320, xl: 'var(--max-width)' as any },
          mb: { xs: 120, md: 'unset' as any },
          textAlign: { xs: 'center', md: 'unset' as any },
        }}
      >
        <Link
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          hrefAttrs={{
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
          style={{ c: styles.card, $$css: true } as any}
          sx={{
            '--bg-color': 'rgba(var(--card-rgb), 0)',
            '--border-color': 'rgba(var(--card-border-rgb), 0)',
            bgColor: 'var(--bg-color)',
            borderColor: 'var(--border-color)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem' as any, md: '1.2rem' as any },
            py: '1rem' as any,
          }}
        >
          <Text
            as="h2"
            sx={{
              fontSize: '1.5rem' as any,
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem' as any, md: '0.7rem' as any },
            }}
          >
            Docs{' '}
            <Text as="span" sx={{ display: 'inline-block' as any }}>
              -&gt;
            </Text>
          </Text>
          <Text
            as="p"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem' as any,
              lineHeight: '1.5' as any,
              maxWidth: '30ch' as any,
              textWrap: 'balance',
            }}
          >
            Find in-depth information about Next.js features and API.
          </Text>
        </Link>

        <Link
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          hrefAttrs={{
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
          style={{ c: styles.card, $$css: true } as any}
          sx={{
            '--bg-color': 'rgba(var(--card-rgb), 0)',
            '--border-color': 'rgba(var(--card-border-rgb), 0)',
            bgColor: 'var(--bg-color)',
            borderColor: 'var(--border-color)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem' as any, md: '1.2rem' as any },
            py: '1rem' as any,
          }}
        >
          <Text
            as="h2"
            sx={{
              fontSize: '1.5rem' as any,
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem' as any, md: '0.7rem' as any },
            }}
          >
            Learn{' '}
            <Text as="span" sx={{ display: 'inline-block' as any }}>
              -&gt;
            </Text>
          </Text>
          <Text
            as="p"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem' as any,
              lineHeight: '1.5' as any,
              maxWidth: '30ch' as any,
              textWrap: 'balance',
            }}
          >
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </Text>
        </Link>

        <Link
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          hrefAttrs={{
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
          style={{ c: styles.card, $$css: true } as any}
          sx={{
            '--bg-color': 'rgba(var(--card-rgb), 0)',
            '--border-color': 'rgba(var(--card-border-rgb), 0)',
            bgColor: 'var(--bg-color)',
            borderColor: 'var(--border-color)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem' as any, md: '1.2rem' as any },
            py: '1rem' as any,
          }}
        >
          <Text
            as="h2"
            sx={{
              fontSize: '1.5rem' as any,
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem' as any, md: '0.7rem' as any },
            }}
          >
            Templates{' '}
            <Text as="span" sx={{ display: 'inline-block' as any }}>
              -&gt;
            </Text>
          </Text>
          <Text
            as="p"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem' as any,
              lineHeight: '1.5' as any,
              maxWidth: '30ch' as any,
              textWrap: 'balance',
            }}
          >
            Explore starter templates for Next.js.
          </Text>
        </Link>

        <Link
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          hrefAttrs={{
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
          style={{ c: styles.card, $$css: true } as any}
          sx={{
            '--bg-color': 'rgba(var(--card-rgb), 0)',
            '--border-color': 'rgba(var(--card-border-rgb), 0)',
            bgColor: 'var(--bg-color)',
            borderColor: 'var(--border-color)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem' as any, md: '1.2rem' as any },
            py: '1rem' as any,
          }}
        >
          <Text
            as="h2"
            sx={{
              fontSize: '1.5rem' as any,
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem' as any, md: '0.7rem' as any },
            }}
          >
            Deploy{' '}
            <Text as="span" sx={{ display: 'inline-block' as any }}>
              -&gt;
            </Text>
          </Text>
          <Text
            as="p"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem' as any,
              lineHeight: '1.5' as any,
              maxWidth: '30ch' as any,
              textWrap: 'balance',
            }}
          >
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </Text>
        </Link>
      </Container>
    </Box>
  );
}
