declare module 'react-native-web' {
  export function unstable_createElement(
    type: React.ElementType,
    props: any,
    options?: any,
  ): React.ReactElement;
}

declare module 'react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle' {
  export default function createReactDOMStyle<T extends Record<string, any>>(
    style: T,
  ): T;
}

declare module 'react-native-web/dist/exports/StyleSheet/preprocess' {
  export default function preprocess<T extends Record<string, any>>(
    style: T,
  ): T;
}
