import { Container } from '@react-universal/components';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Container maxWidth="xl" sx={{ flexDir: 'row' }}>
          {/* <SidebarStart /> */}
          {/* <SkipNavContent /> */}
          {children}
        </Container>
      </main>
    </>
  );
}
