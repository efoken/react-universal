import { sortOrder } from 'sort-package-json';
import type { RcFile } from 'syncpack';

export default {
  indent: '  ',
  sortFirst: sortOrder,
  sortExports: ['source', 'react-native', 'types', 'import', 'require', 'default'],
} satisfies RcFile;
