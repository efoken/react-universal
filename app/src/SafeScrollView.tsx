import type { ScrollViewProps } from '@react-universal/components';
import { ScrollView } from '@react-universal/components';
import { calc, max, useSafeAreaInsets } from '@react-universal/core';

const defaultContentInset = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export const SafeScrollView: React.FC<ScrollViewProps> = ({
  contentContainerStyle,
  contentInset = defaultContentInset,
  scrollIndicatorInsets,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const bottom = max(calc(contentInset.bottom ?? 0, '-', insets.bottom), 0) as number;

  return (
    <ScrollView
      contentContainerStyle={[{ paddingBottom: insets.bottom }, contentContainerStyle]}
      contentInset={{ ...contentInset, bottom }}
      scrollIndicatorInsets={scrollIndicatorInsets ?? { bottom }}
      sx={{ flex: 1 }}
      {...props}
    />
  );
};
