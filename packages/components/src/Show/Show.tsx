import { runIfFunction } from '@react-universal/utils';

export interface ShowProps<T> {
  /**
   * The children to render if `when` is `true`.
   */
  children: React.ReactNode | ((props: T) => React.ReactNode);
  /**
   * The fallback content to render if `when` is `false`.
   */
  fallback?: React.ReactNode;
  /**
   * If `true`, it'll render the `children` prop.
   */
  when: T | null | undefined;
}

export const Show = <T,>({ children, fallback, when }: ShowProps<T>): React.ReactNode =>
  when ? runIfFunction(children, when) : fallback;
