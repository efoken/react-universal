import { Box, Container, Heading, Link, Text, TextInput } from '@universal-ui/components';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <Box
      role="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-between',
        minH: '100vh',
        px: { xs: '6rem', md: '4rem' },
        py: '6rem',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: 'inherit' as any,
          display: 'inherit' as any,
          flexDir: 'row',
          fontFamily: 'var(--font-mono)',
          fontSize: { xs: '0.8rem', md: '0.85rem' },
          justifyContent: 'inherit' as any,
          maxW: { xl: 'var(--max-width)' },
          zIndex: 2,
        }}
      >
        <Text
          role="paragraph"
          sx={{
            alignItems: 'center',
            backdropFilter: { xs: 'blur(24px)', md: 'unset' },
            backgroundClip: { xs: 'padding-box', md: 'unset' },
            backgroundImage: {
              xs: 'linear-gradient(to bottom, rgba(var(--background-start-rgb), 1), rgba(var(--callout-rgb), 0.5))',
              md: 'unset',
            },
            bgColor: { xs: 'transparent', md: 'rgba(var(--callout-rgb), 0.5)' },
            borderBottomWidth: 1,
            borderColor: {
              xs: 'rgba(var(--callout-border-rgb), 0.25)',
              md: 'rgba(var(--callout-border-rgb), 0.3)',
            },
            borderLeftWidth: { xs: 0, md: 1 },
            borderRadius: { xs: 0, md: 'var(--border-radius)' as any },
            borderRightWidth: { xs: 0, md: 1 },
            borderTopWidth: { xs: 0, md: 1 },
            bottom: { xs: 'auto', md: 'unset' },
            display: { xs: 'flex', md: 'block' as any },
            fontFamily: 'inherit',
            justifyContent: 'center',
            left: { xs: 0, md: 'unset' },
            m: 0,
            pb: { xs: '1.4rem', md: '1rem' },
            position: { xs: 'fixed', md: 'unset' as any },
            pt: { xs: '2rem', md: '1rem' },
            px: '1rem',
            right: { xs: 0, md: 'unset' },
            top: { xs: 0, md: 'unset' },
            w: { xs: '100%', md: 'unset' },
          }}
        >
          Get started by editing&nbsp;
          <Text role="code" sx={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
            app/page.tsx
          </Text>
        </Text>
        <Box
          sx={{
            alignItems: { xs: 'flex-end', md: 'unset' as any },
            backgroundImage: {
              xs: 'linear-gradient(to bottom, transparent 0%, rgb(var(--background-end-rgb)) 40%)',
              md: 'unset',
            },
            bottom: { xs: 0, md: 'unset' },
            display: { xs: 'flex', md: 'unset' as any },
            flexDir: { xs: 'row', md: 'unset' as any },
            h: { xs: 200, md: 'unset' },
            justifyContent: { xs: 'center', md: 'unset' as any },
            left: { xs: 0, md: 'unset' },
            p: { xs: '2rem', md: 0 },
            pointerEvents: { xs: 'none', md: 'unset' as any },
            position: { xs: 'fixed', md: 'unset' as any },
            right: { xs: 0, md: 'unset' },
            top: { xs: 'auto', md: 'unset' },
            w: { xs: '100%', md: 'unset' },
            zIndex: { xs: 1, md: 'unset' as any },
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
              gap: '0.5rem',
              justifyContent: 'center',
              p: { xs: '1rem', md: 0 },
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

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          pb: { xs: '6rem', md: '4rem' },
          position: 'relative',
          pt: { xs: '8rem', md: '4rem' },
        }}
      >
        <Box
          sx={
            {
              backgroundImage: 'var(--secondary-glow)',
              borderRadius: '50%',
              filter: 'blur(45px)',
              height: { xs: 300, md: 360 },
              left: '50%',
              marginLeft: -400,
              position: 'absolute',
              transform: { xs: 'none', md: 'translateZ(0)' },
              width: 480,
            } as any
          }
        />
        <Image
          priority
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
        />
        <Box
          sx={
            {
              backgroundImage: 'var(--primary-glow)',
              filter: 'blur(45px)',
              height: 180,
              left: '50%',
              position: 'absolute',
              transform: 'translateZ(0)',
              width: 240,
              zIndex: -1,
            } as any
          }
        />
      </Box>

      <TextInput sx={{ bgColor: '#fff', borderWidth: 1, p: 3, borderRadius: 2 }} />

      <Container
        maxWidth="xl"
        sx={{
          display: 'grid' as any,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 50%)',
            xl: 'repeat(4, minmax(25%, auto))',
          },
          maxW: { xs: 368, md: '100%' },
          mb: { xs: 120, md: 'unset' },
          mx: 'unset',
          textAlign: { xs: 'center', md: 'unset' as any },
          w: 'var(--max-width)',
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
            bgColor: 'rgba(var(--card-rgb), 0)',
            borderColor: 'rgba(var(--card-border-rgb), 0)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem', md: '1.2rem' },
            py: '1rem',
          }}
        >
          <Heading
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem', md: '0.7rem' },
            }}
          >
            Docs <Text sx={{ display: 'inline-block' as any }}>-&gt;</Text>
          </Heading>
          <Text
            role="paragraph"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem',
              lineHeight: '1.5' as any,
              maxWidth: '30ch',
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
            bgColor: 'rgba(var(--card-rgb), 0)',
            borderColor: 'rgba(var(--card-border-rgb), 0)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem', md: '1.2rem' },
            py: '1rem',
          }}
        >
          <Heading
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem', md: '0.7rem' },
            }}
          >
            Learn <Text sx={{ display: 'inline-block' as any }}>-&gt;</Text>
          </Heading>
          <Text
            role="paragraph"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem',
              lineHeight: '1.5' as any,
              maxWidth: '30ch',
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
            bgColor: 'rgba(var(--card-rgb), 0)',
            borderColor: 'rgba(var(--card-border-rgb), 0)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem', md: '1.2rem' },
            py: '1rem',
          }}
        >
          <Heading
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem', md: '0.7rem' },
            }}
          >
            Templates <Text sx={{ display: 'inline-block' as any }}>-&gt;</Text>
          </Heading>
          <Text
            role="paragraph"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem',
              lineHeight: '1.5' as any,
              maxWidth: '30ch',
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
            bgColor: 'rgba(var(--card-rgb), 0)',
            borderColor: 'rgba(var(--card-border-rgb), 0)',
            borderRadius: 'var(--border-radius)' as any,
            borderStyle: 'solid',
            borderWidth: 1,
            px: { xs: '2.5rem', md: '1.2rem' },
            py: '1rem',
          }}
        >
          <Heading
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.23' as any,
              mb: { xs: '0.5rem', md: '0.7rem' },
            }}
          >
            Deploy <Text sx={{ display: 'inline-block' as any }}>-&gt;</Text>
          </Heading>
          <Text
            role="paragraph"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem',
              lineHeight: '1.5' as any,
              maxWidth: '30ch',
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
