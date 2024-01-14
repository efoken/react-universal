import 'react-native';

declare module 'react-native' {
  export namespace StyleSheet {
    export function getSheet(): { id: string; textContent: string };
  }

  export interface TextProps {
    href?: string;
    hrefAttrs?: {
      rel?: string;
      target?: '_blank';
    };
  }
}
