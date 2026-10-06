import { createTV } from 'tailwind-variants-02';
export type { VariantProps, ClassValue } from 'tailwind-variants-02';

import { twMergeConfig } from '@/libs/alignui/utils/cn';

export const tv = createTV({
  twMergeConfig,
});
