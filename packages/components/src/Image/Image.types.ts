import type {
  AccessibilityProps,
  LayoutEvent,
  PlatformMethods,
  RNStyle,
  ResponderConfig,
  StyleProp,
  SxProps,
} from '@react-universal/core';
import type {
  AccessibilityProps as RNAccessibilityProps,
  Image as RNImage,
  ImageProps as RNImageProps,
} from 'react-native';

export interface ImageErrorEvent {
  nativeEvent: {
    error: any;
  };
}

export interface ImageSize {
  height: number;
  width: number;
}

export interface ImageMethods extends PlatformMethods {}

export type ImageStyle = Omit<
  RNStyle,
  | 'color'
  | 'elevation'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textDecorationColor'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textTransform'
  | 'userSelect'
>;

export interface ImageProps
  extends Omit<
      RNImageProps,
      | keyof RNAccessibilityProps
      | keyof ResponderConfig
      | 'borderBottomLeftRadius'
      | 'borderBottomRightRadius'
      | 'borderRadius'
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'defaultSource'
      | 'nativeID'
      | 'onError'
      | 'onLoadEnd'
      | 'onLoadStart'
      | 'onLayout'
      | 'resizeMode'
      | 'source'
      | 'style'
      | 'tintColor'
    >,
    AccessibilityProps {
  as?: React.ElementType;
  dataSet?: Record<string, any>;
  dir?: 'ltr' | 'rtl' | 'auto';
  lang?: Intl.UnicodeBCP47LocaleIdentifier;
  /**
   * Invoked on load error with `{ nativeEvent: { error } }`
   */
  onError?: (event: ImageErrorEvent) => void;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  style?: StyleProp<ImageStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ImageType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ImageProps> & React.RefAttributes<HTMLImageElement & ImageMethods>
> &
  Pick<
    typeof RNImage,
    'abortPrefetch' | 'prefetch' | 'prefetchWithMetadata' | 'queryCache' | 'resolveAssetSource'
  > & {
    getSize: (uri: string) => Promise<ImageSize>;
    getSizeWithHeaders: (uri: string, headers: Record<string, string>) => Promise<ImageSize>;
  };
