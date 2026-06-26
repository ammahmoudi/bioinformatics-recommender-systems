import { motion } from 'framer-motion';
import type { FlowNode, FlowVisual } from '../types';
import { MiniMatrix, MiniMolecule, MiniOmics, MiniProtein, MiniScore } from './MiniVisuals';

type MoleculeVisual = Extract<FlowVisual, 'drug-a' | 'drug-b' | 'drug-new' | 'molecular-graph'>;
type MatrixVisual = Extract<FlowVisual, 'rating-matrix' | 'dti-matrix' | 'fingerprint' | 'latent-vector' | 'als-factorization' | 'similarity-score' | 'graph-path' | 'rwr-transition' | 'adjacency' | 'degree' | 'message-passing' | 'node-feature-matrix' | 'graph-pooling' | 'policy'>;
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

function imageSlotAsset(node: FlowNode) {
  const title = node.title.toLowerCase();
  const detail = node.detail.toLowerCase();

  if (node.media === 'person') {
    if (title === 'user a') return 'user-a-node.png';
    if (title === 'user b') return 'user-b-node.png';
    if (title === 'leonardo') return 'actor-bridge-node.png';
    return undefined;
  }

  if (node.media === 'poster') {
    const text = `${title} ${detail}`;
    if (text.includes('inception')) return 'movie-inception-node.png';
    if (text.includes('interstellar')) return 'movie-interstellar-node.png';
    if (text.includes('the matrix')) return 'movie-matrix-node.png';
    if (text.includes('shrek')) return 'movie-shrek-node.png';
    if (text.includes('titanic')) return 'movie-titanic-node.png';
  }

  if (node.media === 'molecule') {
    if (node.visual === 'drug-a') return 'drug-a-node.png';
    if (node.visual === 'drug-b') return 'drug-b-node.png';
    if (node.visual === 'drug-new') return 'generated-molecule-node.png';
  }

  if (node.media === 'protein') {
    if (node.visual === 'protein-target') return 'protein-target-node.png';
  }

  if (node.media === 'omics') {
    if (title.includes('gene')) return 'gene-node.png';
    if (node.visual === 'rna-noisy') return 'rna-seq-node.png';
    if (node.visual === 'multi-omics') return 'multi-omics-node.png';
  }

  return undefined;
}

function MediaMark({ media, title, visual, assetFile }: { media?: FlowNode['media']; title: string; visual?: FlowNode['visual']; assetFile?: string }) {
  const label = media === 'person' ? 'AI image slot'
    : media === 'poster' ? 'poster slot'
    : media === 'molecule' ? 'molecular graph'
    : media === 'omics' ? 'omics vector'
    : media === 'protein' ? 'protein node'
    : media === 'reward' ? 'reward score'
    : media === 'matrix' ? 'matrix'
    : 'node';
  const assetStyle = assetFile
    ? { backgroundImage: `url("${import.meta.env.BASE_URL}assets/${assetFile}")` }
    : undefined;

  return (
    <div className={`mediaMark ${media ?? 'node'} ${assetFile ? 'hasAsset' : ''}`} style={assetStyle} aria-label={`${label}: ${title}`}>
      {!assetFile && media === 'molecule' && <MiniMolecule variant={isMoleculeVisual(visual) ? visual : 'molecular-graph'} />}
      {!assetFile && media === 'omics' && <MiniOmics variant={isOmicsVisual(visual) ? visual : 'omics-profile'} />}
      {!assetFile && media === 'protein' && <MiniProtein variant={isProteinVisual(visual) ? visual : 'protein-target'} />}
      {!assetFile && media === 'matrix' && <MiniMatrix variant={isMatrixVisual(visual) ? visual : 'rating-matrix'} />}
      {!assetFile && media === 'reward' && <MiniScore variant={isScoreVisual(visual) ? visual : 'binding-score'} />}
      {!assetFile && (media === 'poster' || media === 'person' || !media) && <span>{label}</span>}
    </div>
  );
}

function FlowCard({ node, index }: { node: FlowNode; index: number }) {
  const Icon = node.icon;
  const assetFile = imageSlotAsset(node);
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
      <MediaMark media={node.media} title={node.title} visual={node.visual} assetFile={assetFile} />
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
