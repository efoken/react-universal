declare module 'react-native-web' {
  export function unstable_createElement(
    type: React.ElementType,
    props: any,
    options?: { writingDirection?: 'ltr' | 'rtl' },
  ): React.ReactElement;
}

declare module 'react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle' {
  export default function createReactDOMStyle<T extends Record<string, any>>(
    style: T,
  ): T;
}
