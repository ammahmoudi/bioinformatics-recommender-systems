import { Binary, Clapperboard, Eye, Film, Gauge, Layers3, Pill, Star, Target, UserRound } from 'lucide-react';
import type { FlowNode } from '../types';
import { RichFlow } from './RichFlow';

export function MappingDiagram({ domain }: { domain: 'movie' | 'bio' }) {
  const movieNodes: FlowNode[] = [
    { title: 'User A', detail: 'Taste profile', icon: UserRound, media: 'person', tone: 'cyan' },
    { title: 'Inception', detail: 'Movie item', icon: Film, media: 'poster', tone: 'violet' },
    { title: '5 stars', detail: 'Observed rating', icon: Star, media: 'reward', visual: 'watch-reward', tone: 'amber' },
    { title: 'Genre + actor', detail: 'Content features', icon: Clapperboard, media: 'poster', tone: 'rose' },
    { title: 'Watch history', detail: 'User context', icon: Eye, media: 'matrix', visual: 'rating-matrix', tone: 'blue' }
  ];
  const bioNodes: FlowNode[] = [
    { title: 'Drug A', detail: 'Primary entity', icon: Pill, media: 'molecule', visual: 'drug-a', tone: 'mint' },
    { title: 'EGFR protein', detail: 'Target item', icon: Target, media: 'protein', visual: 'protein-target', tone: 'cyan' },
    { title: 'Kd / IC50', detail: 'Interaction score', icon: Gauge, media: 'reward', visual: 'binding-score', tone: 'amber' },
    { title: 'SMILES bits', detail: 'Chemical features', icon: Binary, media: 'molecule', visual: 'drug-b', tone: 'violet' },
    { title: 'Omics profile', detail: 'Patient/cell context', icon: Layers3, media: 'omics', visual: 'omics-profile', tone: 'rose' }
  ];

  return <RichFlow nodes={domain === 'movie' ? movieNodes : bioNodes} className="mappingFlow" />;
}
