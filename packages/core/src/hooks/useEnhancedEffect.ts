import { isServer } from '@tamagui/constants';
import { useEffect, useLayoutEffect } from 'react';

export const useEnhancedEffect = isServer ? useEffect : useLayoutEffect;
