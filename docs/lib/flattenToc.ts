interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface FlattenedTocEntry {
  title: string;
  url: string;
  depth: number;
}

export function flattenToc(entries: TocEntry[] = [], depth = 0): FlattenedTocEntry[] {
  return entries.reduce<FlattenedTocEntry[]>(
    (acc, entry) =>
      acc.concat({ title: entry.title, url: entry.url, depth }, flattenToc(entry.items, depth + 1)),
    [],
  );
}
