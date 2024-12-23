import { Container } from '@react-universal/components';
import { Header } from '#/components/Header';
import { SidebarStart } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xl" sx={{ flexDir: 'row' }}>
          <SidebarStart />
          {/* <SkipNavContent /> */}
          {children}
        </Container>
      </main>
    </>
  );
}
