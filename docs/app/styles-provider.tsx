'use client';

import { ThemeProvider } from '@universal-ui/styles';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleSheet } from 'react-native';

export function StylesProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useServerInsertedHTML(() => {
    const sheet = StyleSheet.getSheet();
    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  });
  return <ThemeProvider>{children}</ThemeProvider>;
}
