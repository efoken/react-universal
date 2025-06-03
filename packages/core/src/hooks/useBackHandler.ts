import { noop } from '@react-universal/utils';

export const useBackHandler: (handler: () => boolean) => void = noop;
