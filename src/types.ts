import type { ComponentType } from 'react';
import type { MethodSlide } from './presentationData';

export type Icon = ComponentType<{ size?: number; strokeWidth?: number }>;

export type FlowTone = 'cyan' | 'mint' | 'amber' | 'rose' | 'violet' | 'blue';

export type FlowMedia = 'poster' | 'person' | 'matrix' | 'molecule' | 'omics' | 'protein' | 'reward';

export type FlowVisual =
  | 'rating-matrix'
  | 'dti-matrix'
  | 'als-factorization'
  | 'latent-vector'
  | 'fingerprint'
  | 'similarity-score'
  | 'graph-path'
  | 'rwr-transition'
  | 'adjacency'
  | 'degree'
  | 'policy'
  | 'drug-a'
  | 'drug-b'
  | 'drug-new'
  | 'molecular-graph'
  | 'rna-noisy'
  | 'denoise'
  | 'omics-profile'
  | 'multi-omics'
  | 'protein-target'
  | 'ppi-network'
  | 'binding-score'
  | 'toxicity-score'
  | 'qed-score'
  | 'watch-reward';

export type FlowNode = {
  title: string;
  detail: string;
  icon: Icon;
  tone?: FlowTone;
  media?: FlowMedia;
  visual?: FlowVisual;
};

export type Slide =
  | { id: string; title: string; kind: 'title' | 'terminology' | 'appendix' }
  | { id: string; title: string; kind: 'method-intro' | 'method-math'; method: MethodSlide };
