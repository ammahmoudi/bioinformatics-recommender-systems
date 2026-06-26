import {
  Activity,
  Atom,
  Binary,
  Bot,
  BrainCircuit,
  Calculator,
  Clapperboard,
  Database,
  Dna,
  Eye,
  Film,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Pill,
  RefreshCw,
  Route,
  ShieldAlert,
  Sigma,
  Sparkles,
  Star,
  Table2,
  Target,
  UserRound,
  Waypoints
} from 'lucide-react';
import type { MethodSlide } from '../presentationData';
import type { FlowNode, Icon } from '../types';

export const methodIcons: Record<string, Icon> = {
  cf: Table2,
  cbf: Binary,
  graph: Network,
  autoencoder: BrainCircuit,
  gnn: GitBranch,
  rl: Bot
};

export function methodConcreteNodes(method: MethodSlide, domain: 'movie' | 'bio'): FlowNode[] {
  const movie: Record<string, FlowNode[]> = {
    cf: [
      { title: 'User A', detail: 'Likes Inception + Matrix', icon: UserRound, media: 'person', tone: 'cyan' },
      { title: 'User B', detail: 'Similar taste pattern', icon: UserRound, media: 'person', tone: 'blue' },
      { title: 'Shrek = low', detail: 'User B dislikes it', icon: Film, media: 'poster', tone: 'rose' },
      { title: 'Predict ?', detail: 'User A likely low rating', icon: Star, media: 'matrix', visual: 'rating-matrix', tone: 'amber' }
    ],
    cbf: [
      { title: 'Inception', detail: 'Sci-Fi, Nolan, dreams', icon: Film, media: 'poster', tone: 'violet' },
      { title: 'TF-IDF vector', detail: 'Feature weights', icon: Binary, media: 'matrix', visual: 'latent-vector', tone: 'blue' },
      { title: 'Profile match', detail: 'Cosine similarity', icon: Sigma, media: 'matrix', visual: 'similarity-score', tone: 'cyan' },
      { title: 'Interstellar', detail: 'Recommend similar movie', icon: Clapperboard, media: 'poster', tone: 'amber' }
    ],
    graph: [
      { title: 'User A', detail: 'Watched', icon: UserRound, media: 'person', tone: 'cyan' },
      { title: 'Inception', detail: 'Movie node', icon: Film, media: 'poster', tone: 'violet' },
      { title: 'Leonardo', detail: 'Actor bridge', icon: UserRound, media: 'person', tone: 'rose' },
      { title: 'Titanic', detail: 'Short path recommend', icon: Clapperboard, media: 'poster', tone: 'amber' }
    ],
    autoencoder: [
      { title: 'Messy history', detail: 'Sparse ratings', icon: Table2, media: 'matrix', visual: 'rating-matrix', tone: 'rose' },
      { title: 'Encoder', detail: 'Compress taste', icon: BrainCircuit, media: 'matrix', visual: 'als-factorization', tone: 'cyan' },
      { title: 'Taste code', detail: 'Latent vector', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Decoder', detail: 'Fill missing ratings', icon: Sparkles, media: 'reward', visual: 'watch-reward', tone: 'amber' }
    ],
    gnn: [
      { title: 'Inception node', detail: 'Movie embedding', icon: Film, media: 'poster', tone: 'violet' },
      { title: 'Actor messages', detail: 'Neighbor information', icon: UserRound, media: 'person', tone: 'rose' },
      { title: 'Director messages', detail: 'More graph context', icon: Clapperboard, media: 'poster', tone: 'blue' },
      { title: 'Updated vector', detail: 'Recommend neighbors', icon: GitBranch, media: 'matrix', visual: 'latent-vector', tone: 'cyan' }
    ],
    rl: [
      { title: 'Show Inception', detail: 'Action', icon: Film, media: 'poster', tone: 'violet' },
      { title: '40 min watched', detail: 'Environment response', icon: Eye, media: 'person', tone: 'cyan' },
      { title: 'Positive reward', detail: 'Engagement signal', icon: Star, media: 'reward', visual: 'watch-reward', tone: 'amber' },
      { title: 'More sci-fi', detail: 'Policy update', icon: Route, media: 'matrix', visual: 'policy', tone: 'blue' }
    ]
  };

  const bio: Record<string, FlowNode[]> = {
    cf: [
      { title: 'Drug A', detail: 'Binds T1, T2, T3', icon: Pill, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'Drug B', detail: 'Similar target pattern', icon: FlaskConical, media: 'molecule', visual: 'drug-b', tone: 'cyan' },
      { title: 'Protein T4', detail: 'Known for Drug B', icon: Target, media: 'protein', visual: 'protein-target', tone: 'violet' },
      { title: 'Predict bind', detail: 'Drug A may bind T4', icon: Gauge, media: 'reward', visual: 'binding-score', tone: 'amber' }
    ],
    cbf: [
      { title: 'Known drug', detail: 'Approved target X', icon: Pill, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'SMILES', detail: 'CC(=O)Oc1...', icon: Binary, media: 'molecule', visual: 'drug-b', tone: 'violet' },
      { title: 'Morgan bits', detail: '10110010', icon: Database, media: 'matrix', visual: 'fingerprint', tone: 'blue' },
      { title: 'Same target', detail: 'High Tanimoto', icon: Target, media: 'protein', visual: 'protein-target', tone: 'amber' }
    ],
    graph: [
      { title: 'Drug A', detail: 'Treats disease X', icon: Pill, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'Disease X', detail: 'Associated node', icon: Activity, media: 'matrix', visual: 'graph-path', tone: 'rose' },
      { title: 'Gene Y', detail: 'Causal bridge', icon: Dna, media: 'omics', visual: 'omics-profile', tone: 'blue' },
      { title: 'Protein Y', detail: 'Candidate target', icon: Target, media: 'protein', visual: 'protein-target', tone: 'amber' }
    ],
    autoencoder: [
      { title: 'Noisy RNA-seq', detail: 'High-dimensional vector', icon: Layers3, media: 'omics', visual: 'rna-noisy', tone: 'rose' },
      { title: 'Denoise', detail: 'Mask/corrupt input', icon: BrainCircuit, media: 'omics', visual: 'denoise', tone: 'cyan' },
      { title: 'Cell-state code', detail: 'Latent vector', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Complete profile', detail: 'Missing associations', icon: Sparkles, media: 'reward', visual: 'binding-score', tone: 'amber' }
    ],
    gnn: [
      { title: 'Molecular graph', detail: 'Atoms are nodes', icon: Atom, media: 'molecule', visual: 'molecular-graph', tone: 'mint' },
      { title: 'Bond messages', detail: 'Edges pass context', icon: GitBranch, media: 'molecule', visual: 'drug-b', tone: 'cyan' },
      { title: 'Drug embedding', detail: 'Global pooling', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Toxicity', detail: 'Predict side effect', icon: ShieldAlert, media: 'reward', visual: 'toxicity-score', tone: 'rose' }
    ],
    rl: [
      { title: 'Start molecule', detail: 'Initial state', icon: Atom, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'Add atom/ring', detail: 'Action', icon: FlaskConical, media: 'molecule', visual: 'drug-new', tone: 'cyan' },
      { title: 'Score molecule', detail: 'Binding + QED + toxicity', icon: Gauge, media: 'reward', visual: 'qed-score', tone: 'amber' },
      { title: 'Improve policy', detail: 'Keep better actions', icon: RefreshCw, media: 'matrix', visual: 'policy', tone: 'blue' }
    ]
  };

  return (domain === 'movie' ? movie : bio)[method.id] ?? [];
}

export function methodAlgorithmNodes(method: MethodSlide, domain: 'movie' | 'bio'): FlowNode[] {
  const commonMovie: Record<string, FlowNode[]> = {
    cf: [
      { title: 'Sparse matrix', detail: 'User x movie ratings', icon: Table2, media: 'matrix', visual: 'rating-matrix', tone: 'cyan' },
      { title: 'ALS / SVD', detail: 'Factorize patterns', icon: Sigma, media: 'matrix', visual: 'als-factorization', tone: 'violet' },
      { title: 'Latent vectors', detail: 'User and movie codes', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'blue' },
      { title: 'Dot product', detail: 'Predicted rating', icon: Calculator, media: 'reward', visual: 'watch-reward', tone: 'amber' }
    ],
    cbf: [
      { title: 'Movie profile', detail: 'Genre, director, keywords', icon: Clapperboard, media: 'poster', tone: 'violet' },
      { title: 'TF-IDF', detail: 'Weighted text vector', icon: Binary, media: 'matrix', visual: 'latent-vector', tone: 'blue' },
      { title: 'Cosine score', detail: 'Compare profiles', icon: Sigma, media: 'reward', visual: 'watch-reward', tone: 'cyan' },
      { title: 'Rank similar', detail: 'Recommend nearest items', icon: Star, media: 'poster', tone: 'amber' }
    ],
    graph: [
      { title: 'Node graph', detail: 'User, movie, actor', icon: Network, media: 'matrix', visual: 'graph-path', tone: 'cyan' },
      { title: 'Walk paths', detail: 'Move through edges', icon: Route, media: 'person', tone: 'rose' },
      { title: 'Proximity', detail: 'Short paths score high', icon: Waypoints, media: 'matrix', visual: 'similarity-score', tone: 'blue' },
      { title: 'Recommend', detail: 'Rank high nodes', icon: Star, media: 'poster', tone: 'amber' }
    ],
    autoencoder: [
      { title: 'Input ratings', detail: 'Sparse/noisy vector', icon: Table2, media: 'matrix', visual: 'rating-matrix', tone: 'rose' },
      { title: 'Encoder NN', detail: 'Compress', icon: BrainCircuit, media: 'matrix', visual: 'als-factorization', tone: 'cyan' },
      { title: 'Bottleneck', detail: 'Latent taste code', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Decoder NN', detail: 'Reconstruct ratings', icon: Sparkles, media: 'reward', visual: 'watch-reward', tone: 'amber' }
    ],
    gnn: [
      { title: 'Graph features', detail: 'Movie and neighbor vectors', icon: Network, media: 'matrix', visual: 'adjacency', tone: 'cyan' },
      { title: 'Pass messages', detail: 'Actors/directors to movie', icon: GitBranch, media: 'person', tone: 'rose' },
      { title: 'Aggregate', detail: 'Update embedding', icon: Layers3, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Recommend', detail: 'Use graph-neighbor vectors', icon: Star, media: 'poster', tone: 'amber' }
    ],
    rl: [
      { title: 'Agent', detail: 'Recommender policy', icon: Bot, media: 'matrix', visual: 'policy', tone: 'cyan' },
      { title: 'Action', detail: 'Show movie', icon: Film, media: 'poster', tone: 'violet' },
      { title: 'Reward', detail: 'Watch time', icon: Star, media: 'reward', visual: 'watch-reward', tone: 'amber' },
      { title: 'Update', detail: 'Maximize long-term value', icon: RefreshCw, media: 'matrix', visual: 'policy', tone: 'blue' }
    ]
  };

  const commonBio: Record<string, FlowNode[]> = {
    cf: [
      { title: 'DTI matrix', detail: 'Drug x protein', icon: Table2, media: 'matrix', visual: 'dti-matrix', tone: 'mint' },
      { title: 'LMF / NRLMF', detail: 'Binary probability model', icon: Sigma, media: 'matrix', visual: 'als-factorization', tone: 'violet' },
      { title: 'Latent spaces', detail: 'Drug and protein vectors', icon: Database, media: 'protein', visual: 'protein-target', tone: 'blue' },
      { title: 'Binding score', detail: 'Predicted interaction', icon: Gauge, media: 'reward', visual: 'binding-score', tone: 'amber' }
    ],
    cbf: [
      { title: 'SMILES', detail: 'Molecule text', icon: Binary, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'Morgan FP', detail: 'Circular atom bits', icon: Database, media: 'matrix', visual: 'fingerprint', tone: 'blue' },
      { title: 'Tanimoto', detail: 'Shared bits / union bits', icon: Sigma, media: 'reward', visual: 'binding-score', tone: 'cyan' },
      { title: 'Target transfer', detail: 'Suggest same target', icon: Target, media: 'protein', visual: 'protein-target', tone: 'amber' }
    ],
    graph: [
      { title: 'Hetero graph', detail: 'Drug, disease, gene, protein', icon: Network, media: 'protein', visual: 'ppi-network', tone: 'mint' },
      { title: 'RWR', detail: 'Walk plus restart', icon: Route, media: 'matrix', visual: 'rwr-transition', tone: 'cyan' },
      { title: 'Steady state', detail: 'Stable probability vector', icon: Gauge, media: 'reward', visual: 'binding-score', tone: 'blue' },
      { title: 'Prioritize', detail: 'High-score targets', icon: Target, media: 'protein', visual: 'protein-target', tone: 'amber' }
    ],
    autoencoder: [
      { title: 'Multi-omics', detail: 'RNA, DNA, protein, drug response', icon: Layers3, media: 'omics', visual: 'multi-omics', tone: 'rose' },
      { title: 'Denoising AE', detail: 'Learns robust structure', icon: BrainCircuit, media: 'omics', visual: 'denoise', tone: 'cyan' },
      { title: 'Latent state', detail: 'Compact cell/patient vector', icon: Database, media: 'matrix', visual: 'latent-vector', tone: 'violet' },
      { title: 'Reconstruct', detail: 'Predict missing values', icon: Sparkles, media: 'reward', visual: 'binding-score', tone: 'amber' }
    ],
    gnn: [
      { title: 'A + I', detail: 'Self-looped adjacency', icon: Table2, media: 'matrix', visual: 'adjacency', tone: 'cyan' },
      { title: 'H features', detail: 'Atom/protein node features', icon: Atom, media: 'molecule', visual: 'molecular-graph', tone: 'mint' },
      { title: 'D degree matrix', detail: 'Neighbor counts', icon: Calculator, media: 'matrix', visual: 'degree', tone: 'violet' },
      { title: 'Prediction head', detail: 'Toxicity / side effect', icon: ShieldAlert, media: 'reward', visual: 'toxicity-score', tone: 'rose' }
    ],
    rl: [
      { title: 'State', detail: 'Current molecular graph', icon: Atom, media: 'molecule', visual: 'drug-a', tone: 'mint' },
      { title: 'Action', detail: 'Add atom, bond, ring', icon: FlaskConical, media: 'molecule', visual: 'drug-new', tone: 'cyan' },
      { title: 'Reward', detail: 'Affinity, QED, toxicity', icon: Gauge, media: 'reward', visual: 'qed-score', tone: 'amber' },
      { title: 'Policy', detail: 'Generate better molecules', icon: RefreshCw, media: 'matrix', visual: 'policy', tone: 'blue' }
    ]
  };

  return (domain === 'movie' ? commonMovie : commonBio)[method.id] ?? [];
}
