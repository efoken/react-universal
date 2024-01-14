'use client';

import { SxProps, styled } from '@universal-ui/styles';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';

export interface FlatListProps<T = any> extends RNFlatListProps<T> {
  sx?: SxProps;
}

export const FlatList = styled(RNFlatList, {
  shouldForwardProp: (prop) => prop !== 'sx',
})() as <T = any>(
  props: FlatListProps<T> & React.RefAttributes<RNFlatList<T>>,
) => React.ReactNode;
