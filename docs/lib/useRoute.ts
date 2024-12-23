import { usePathname } from 'next/navigation';
import docsConfig from '#/docs.config';
import type { NavItem } from '#/docs.config';

function join(...args: (string | undefined)[]) {
  return `/${args.filter(Boolean).join('/')}`;
}

export function useRoute() {
  const currentUrl = usePathname();
  const [primaryHref, secondaryHref] = currentUrl.split('/').slice(1);

  const getFlattenedNavItems = (): Omit<NavItem, 'items'>[] => {
    const result: Omit<NavItem, 'items'>[] = [];
    const iterate = (item: NavItem, parentUrl = '') => {
      const url = item.url ? `${parentUrl}/${item.url}` : parentUrl;
      if (item.items) {
        for (const child of item.items) {
          iterate(child, url);
        }
      } else {
        result.push({ title: item.title, url, status: item.status });
      }
    };
    for (const item of docsConfig.navigation) {
      iterate(item);
    }
    return result;
  };

  const flattenedItems = getFlattenedNavItems();

  const getPrimaryNav = () => docsConfig.navigation.find((item) => item.url === primaryHref)!;

  const getPrimaryNavItems = () =>
    docsConfig.navigation.map((item) => {
      const firstChild = flattenedItems.find((child) => child.url?.startsWith(`/${item.url!}`));
      return {
        title: item.title,
        url: firstChild?.url,
        current: currentUrl.startsWith(`/${item.url}`),
      };
    });

  const getSecondaryNav = () => getPrimaryNav().items?.find((item) => item.url === secondaryHref)!;

  const getSecondaryNavItems = () => {
    const nav = getPrimaryNav();
    return (
      nav.items?.map((item) => {
        const firstChild = flattenedItems.find((child) =>
          child.url?.startsWith(join(nav.url, item.url)),
        );
        return {
          title: item.title,
          url: firstChild?.url,
          current: currentUrl.startsWith(join(nav.url, item.url)),
        };
      }) || []
    );
  };

  const getSidebarNavItems = () => {
    const primaryNav = getPrimaryNav();
    const secondaryNav = getSecondaryNav();
    return (
      secondaryNav.items?.map((group) => ({
        ...group,
        items:
          group.items?.map((item) => ({
            status: item.status,
            title: item.title,
            url:
              item.url?.startsWith('http') || item.external
                ? item.url
                : join(primaryNav.url, secondaryNav.url, group.url, item.url),
            current: currentUrl.startsWith(
              join(primaryNav.url, secondaryNav.url, group.url, item.url),
            ),
          })) || [],
      })) || []
    );
  };

  const getCurrentIndex = (items: Omit<NavItem, 'items'>[]): number =>
    items.findIndex((item) => currentUrl === item.url!);

  const getNextItem = (): NavItem | null => {
    const items = getFlattenedNavItems();
    const index = getCurrentIndex(items);
    return items[index + 1] || null;
  };

  const getPrevItem = (): NavItem | null => {
    const items = getFlattenedNavItems();
    const index = getCurrentIndex(items);
    return items[index - 1] || null;
  };

  return {
    currentUrl,
    getPrimaryNav,
    getPrimaryNavItems,
    getSecondaryNav,
    getSecondaryNavItems,
    getSidebarNavItems,
    getNextItem,
    getPrevItem,
  };
}
