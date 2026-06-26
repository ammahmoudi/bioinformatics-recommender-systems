import type { ComponentType } from 'react';
import type { MethodSlide } from './presentationData';

export type Icon = ComponentType<{ size?: number; strokeWidth?: number }>;

export type FlowTone = 'cyan' | 'mint' | 'amber' | 'rose' | 'violet' | 'blue';

export type FlowMedia = 'poster' | 'person' | 'matrix' | 'molecule' | 'omics' | 'protein' | 'reward';

export type FlowVisual =
  | 'rating-matrix'
  | 'noisy-profile'
  | 'dti-matrix'
  | 'als-factorization'
  | 'latent-vector'
  | 'latent-space'
  | 'content-features'
  | 'movie-profile'
  | 'tfidf-vector'
  | 'fingerprint'
  | 'similarity-score'
  | 'cosine-score'
  | 'tanimoto-score'
  | 'target-transfer'
  | 'graph-path'
  | 'node-graph'
  | 'walk-path'
  | 'rwr-transition'
  | 'rwr-restart'
  | 'adjacency'
  | 'degree'
  | 'message-passing'
  | 'actor-message'
  | 'director-message'
  | 'bond-message'
  | 'node-feature-matrix'
  | 'graph-pooling'
  | 'multi-omics-stack'
  | 'encoder'
  | 'bottleneck'
  | 'decoder'
  | 'reconstruction'
  | 'agent-policy'
  | 'action-step'
  | 'policy-update'
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
