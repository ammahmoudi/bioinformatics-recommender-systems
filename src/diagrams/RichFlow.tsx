import { motion } from 'framer-motion';
import type { FlowNode, FlowVisual } from '../types';
import { MiniMatrix, MiniMolecule, MiniOmics, MiniProtein, MiniScore } from './MiniVisuals';

type MoleculeVisual = Extract<FlowVisual, 'drug-a' | 'drug-b' | 'drug-new' | 'molecular-graph'>;
type MatrixVisual = Extract<FlowVisual, 'rating-matrix' | 'dti-matrix' | 'fingerprint' | 'latent-vector' | 'als-factorization' | 'similarity-score' | 'graph-path' | 'rwr-transition' | 'adjacency' | 'degree' | 'policy'>;
type OmicsVisual = Extract<FlowVisual, 'rna-noisy' | 'denoise' | 'omics-profile' | 'multi-omics'>;
type ProteinVisual = Extract<FlowVisual, 'protein-target' | 'ppi-network'>;
type ScoreVisual = Extract<FlowVisual, 'binding-score' | 'toxicity-score' | 'qed-score' | 'watch-reward'>;

function isMoleculeVisual(visual?: FlowVisual): visual is MoleculeVisual {
  return visual === 'drug-a' || visual === 'drug-b' || visual === 'drug-new' || visual === 'molecular-graph';
}

function isMatrixVisual(visual?: FlowVisual): visual is MatrixVisual {
  return visual !== undefined && !isMoleculeVisual(visual) && !isOmicsVisual(visual) && !isProteinVisual(visual) && !isScoreVisual(visual);
}

function isOmicsVisual(visual?: FlowVisual): visual is OmicsVisual {
  return visual === 'rna-noisy' || visual === 'denoise' || visual === 'omics-profile' || visual === 'multi-omics';
}

function isProteinVisual(visual?: FlowVisual): visual is ProteinVisual {
  return visual === 'protein-target' || visual === 'ppi-network';
}

function isScoreVisual(visual?: FlowVisual): visual is ScoreVisual {
  return visual === 'binding-score' || visual === 'toxicity-score' || visual === 'qed-score' || visual === 'watch-reward';
}

function MediaMark({ media, title, visual }: { media?: FlowNode['media']; title: string; visual?: FlowNode['visual'] }) {
  const label = media === 'person' ? 'AI image slot'
    : media === 'poster' ? 'poster slot'
    : media === 'molecule' ? 'molecular graph'
    : media === 'omics' ? 'omics vector'
    : media === 'protein' ? 'protein node'
    : media === 'reward' ? 'reward score'
    : media === 'matrix' ? 'matrix'
    : 'node';

  return (
    <div className={`mediaMark ${media ?? 'node'}`} aria-label={`${label}: ${title}`}>
      {media === 'molecule' && <MiniMolecule variant={isMoleculeVisual(visual) ? visual : 'molecular-graph'} />}
      {media === 'omics' && <MiniOmics variant={isOmicsVisual(visual) ? visual : 'omics-profile'} />}
      {media === 'protein' && <MiniProtein variant={isProteinVisual(visual) ? visual : 'protein-target'} />}
      {media === 'matrix' && <MiniMatrix variant={isMatrixVisual(visual) ? visual : 'rating-matrix'} />}
      {media === 'reward' && <MiniScore variant={isScoreVisual(visual) ? visual : 'binding-score'} />}
      {(media === 'poster' || media === 'person' || !media) && <span>{label}</span>}
    </div>
  );
}

function FlowCard({ node, index }: { node: FlowNode; index: number }) {
  const Icon = node.icon;
  return (
    <motion.article
      className={`flowCard ${node.tone ?? 'cyan'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045, duration: 0.2 }}
    >
      <div className="flowCardTop">
        <div className="nodeIcon"><Icon size={22} strokeWidth={2.35} /></div>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <MediaMark media={node.media} title={node.title} visual={node.visual} />
      <h4>{node.title}</h4>
      <p>{node.detail}</p>
    </motion.article>
  );
}

export function RichFlow({ nodes, className = '' }: { nodes: FlowNode[]; className?: string }) {
  return (
    <div className={`richFlow ${className}`}>
      {nodes.map((node, index) => (
        <div className="flowStep" key={`${node.title}-${index}`}>
          <FlowCard node={node} index={index} />
          {index < nodes.length - 1 && <div className="flowArrow" aria-hidden="true"><span /></div>}
        </div>
      ))}
    </div>
  );
}
