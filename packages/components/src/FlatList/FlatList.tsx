'use client';

import type { SxProps } from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import type { FlatListProps as RNFlatListProps } from 'react-native';
import { FlatList as RNFlatList } from 'react-native';

export interface FlatListProps<T = any> extends RNFlatListProps<T> {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export const FlatList = styled(RNFlatList, {
  label: 'FlatList',
  shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'sx',
})() as <T = any>(
  props: FlatListProps<T> & React.RefAttributes<RNFlatList<T>>,
) => React.ReactNode;
