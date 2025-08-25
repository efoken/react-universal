import { Box, Container } from '@react-universal/components';
import { A, Code, Main, P } from '@react-universal/elements';
import { Image } from '@react-universal/next';
import { Card } from '../components/Card';

export default function Home() {
  return (
    <Main
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
          alignItems: 'center',
          display: 'flex',
          flexDir: 'row',
          fontFamily: 'mono',
          fontSize: { xs: '0.8rem', md: '0.85rem' },
          justifyContent: 'space-between',
          maxW: { xl: 'var(--max-width)' },
          zIndex: 2,
        }}
      >
        <P
          sx={{
            alignItems: 'center',
            backdropFilter: { xs: 'blur(24px)', md: 'none' },
            backgroundClip: { xs: 'padding-box', md: 'unset' },
            backgroundImage: {
              xs: 'linear-gradient(to bottom, rgba(var(--background-start-rgb) / 1), rgba(var(--callout-rgb) / 0.5))',
              md: 'none',
            },
            bgColor: { xs: 'transparent', md: 'rgba(var(--callout-rgb) / 0.5)' },
            borderBottomWidth: 1,
            borderColor: {
              xs: 'rgba(var(--callout-border-rgb) / 0.25)',
              md: 'rgba(var(--callout-border-rgb) / 0.3)',
            },
            borderLeftWidth: { xs: 0, md: 1 },
            borderRadius: { xs: 0, md: 'var(--border-radius)' },
            borderRightWidth: { xs: 0, md: 1 },
            borderTopWidth: { xs: 0, md: 1 },
            bottom: 'auto',
            display: { xs: 'flex', md: 'block' },
            fontFamily: 'inherit',
            justifyContent: 'center',
            left: 0,
            m: 0,
            pb: { xs: '1.4rem', md: '1rem' },
            position: { xs: 'fixed', md: 'static' },
            pt: { xs: '2rem', md: '1rem' },
            px: '1rem',
            right: 0,
            top: 0,
            w: { xs: '100%', md: 'auto' },
          }}
        >
          Get started by editing&nbsp;
          <Code sx={{ fontWeight: 700 }}>app/page.tsx</Code>
        </P>
        <Box
          sx={{
            alignItems: 'flex-end',
            backgroundImage: {
              xs: 'linear-gradient(to bottom, transparent 0%, rgb(var(--background-end-rgb)) 40%)',
              md: 'none',
            },
            bottom: 0,
            display: { xs: 'flex', md: 'block' },
            h: { xs: 200, md: 'auto' },
            justifyContent: 'center',
            left: 0,
            p: { xs: '2rem', md: 0 },
            pointerEvents: { xs: 'none', md: 'auto' },
            position: { xs: 'fixed', md: 'static' },
            right: 0,
            top: 'auto',
            w: { xs: '100%', md: 'auto' },
            zIndex: 1,
          }}
        >
          <A
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
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
              priority
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              sx={{
                filter: {
                  // '@media (prefers-color-scheme: dark)': 'invert(1)',
                },
              }}
            />
          </A>
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
          sx={{
            backgroundImage: 'var(--secondary-glow)',
            borderRadius: '50%',
            filter: 'blur(45px)',
            height: { xs: 300, md: 360 },
            left: '50%',
            marginLeft: -400,
            position: 'absolute',
            transform: { xs: 'none', md: 'translateZ(0)' },
            width: 480,
          }}
        />
        <Image
          priority
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          sx={{
            filter: {
              // '@media (prefers-color-scheme: dark)': 'invert(1) drop-shadow(0 0 0.3rem #ffffff70)',
            },
            position: 'relative',
          }}
        />
        <Box
          sx={{
            backgroundImage: 'var(--primary-glow)',
            filter: 'blur(45px)',
            height: 180,
            left: '50%',
            position: 'absolute',
            transform: 'translateZ(0)',
            width: 240,
            zIndex: -1,
          }}
        />
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 50%)',
            xl: 'repeat(4, minmax(25%, auto))',
          },
          maxW: { xs: 368, md: '100%' },
          mb: { xs: 120, md: 0 },
          mx: 0,
          textAlign: { xs: 'center', md: 'unset' as any },
          w: 'var(--max-width)',
        }}
      >
        <Card
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          title="Docs"
          description="Find in-depth information about Next.js features and API."
        />
        <Card
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          title="Learn"
          description="Learn about Next.js in an interactive course with quizzes!"
        />
        <Card
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          title="Templates"
          description="Explore starter templates for Next.js."
        />
        <Card
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          title="Deploy"
          description="Instantly deploy your Next.js site to a shareable URL with Vercel."
        />
      </Container>
    </Main>
  );
}
