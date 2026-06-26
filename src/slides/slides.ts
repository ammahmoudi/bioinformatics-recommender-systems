import { methods } from '../presentationData';
import type { Slide } from '../types';

export const slides: Slide[] = [
  { id: 'title', title: 'Start', kind: 'title' },
  { id: 'terminology', title: 'Terminology', kind: 'terminology' },
  ...methods.flatMap((method) => [
    { id: `${method.id}-intro`, title: `${method.shortTitle} Examples`, kind: 'method-intro' as const, method },
    { id: `${method.id}-math`, title: `${method.shortTitle} Math`, kind: 'method-math' as const, method }
  ]),
  { id: 'appendix', title: 'Appendix', kind: 'appendix' }
];
