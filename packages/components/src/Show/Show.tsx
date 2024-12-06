import { runIfFunction } from '@react-universal/utils';
import { isValidElement } from 'react';

export interface ShowProps<T> {
  /**
   * The children to render if `when` is `true`
   */
  children: React.ReactNode | ((props: T) => React.ReactNode);
  /**
   * The fallback content to render if `when` is `false`
   */
  fallback?: React.ReactNode;
  /**
   * If `true`, it'll render the `children` prop
   */
  when: T | null | undefined;
}

export const Show = <T,>({ children, fallback, when }: ShowProps<T>): React.ReactNode => {
  const result = when ? runIfFunction(children, when) : fallback;
  return isValidElement(result) ? result : <>{result}</>;
};
