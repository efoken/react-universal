export function normalizeEvent<T extends React.BaseSyntheticEvent<any>>(
  event: React.BaseSyntheticEvent<any>,
  data: Partial<T['nativeEvent']> = {},
) {
  for (const [key, value] of Object.entries(data)) {
    event.nativeEvent[key] = value;
  }
  return event as T;
}
