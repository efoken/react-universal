import { useEffect } from 'react';

export function useScrollIntoView(
  containerRef: React.RefObject<HTMLElement>,
  itemSelector: string,
  alignment: 'nearest' | 'center' = 'nearest',
) {
  useEffect(() => {
    const container = containerRef.current;
    const item = container?.querySelector(itemSelector);

    if (!container || !item) {
      return;
    }

    const isInView = () => {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      return itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom;
    };

    if (!isInView()) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const scrollTop = container.scrollTop;
      const itemTop = itemRect.top - containerRect.top + scrollTop;

      let targetScrollTop = itemTop;
      if (alignment === 'center') {
        const containerHeight = container.clientHeight;
        const itemHeight = item.clientHeight;
        targetScrollTop = itemTop - containerHeight / 2 + itemHeight / 2;
      }

      container.scrollTop = targetScrollTop;
    }
  }, [containerRef, itemSelector, alignment]);
}
