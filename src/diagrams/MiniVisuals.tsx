import type { FlowVisual } from '../types';

type MatrixVariant = Extract<FlowVisual, 'rating-matrix' | 'noisy-profile' | 'dti-matrix' | 'fingerprint' | 'latent-vector' | 'latent-space' | 'content-features' | 'movie-profile' | 'tfidf-vector' | 'als-factorization' | 'similarity-score' | 'cosine-score' | 'tanimoto-score' | 'target-transfer' | 'graph-path' | 'node-graph' | 'walk-path' | 'rwr-transition' | 'rwr-restart' | 'adjacency' | 'degree' | 'message-passing' | 'actor-message' | 'director-message' | 'bond-message' | 'node-feature-matrix' | 'graph-pooling' | 'multi-omics-stack' | 'encoder' | 'bottleneck' | 'decoder' | 'reconstruction' | 'agent-policy' | 'action-step' | 'policy-update' | 'policy'>;
type MoleculeVariant = Extract<FlowVisual, 'drug-a' | 'drug-b' | 'drug-new' | 'molecular-graph'>;
type OmicsVariant = Extract<FlowVisual, 'rna-noisy' | 'denoise' | 'omics-profile' | 'multi-omics'>;
type ProteinVariant = Extract<FlowVisual, 'protein-target' | 'ppi-network'>;
type ScoreVariant = Extract<FlowVisual, 'binding-score' | 'toxicity-score' | 'qed-score' | 'watch-reward'>;

const matrixValues: Record<MatrixVariant, string[][]> = {
  'rating-matrix': [['5', '1', '5', '?'], ['5', '2', '4', '1'], ['1', '5', '1', '5']],
  'noisy-profile': [['5', '?', '5', 'x'], ['?', '2', 'x', '1']],
  'dti-matrix': [['1', '1', '1', '?'], ['1', '1', '1', '1'], ['0', '1', '0', '0']],
  fingerprint: [['1', '0', '1', '1', '0', '0', '1', '0']],
  'latent-vector': [['.8', '.1', '.6', '.3', '.9']],
  'latent-space': [['z1'], ['z2'], ['z3']],
  'content-features': [['G'], ['A'], ['K']],
  'movie-profile': [['genre'], ['dir'], ['key']],
  'tfidf-vector': [['tf'], ['idf'], ['w']],
  'als-factorization': [['R'], ['='], ['P'], ['x'], ['Q']],
  'similarity-score': [['A'], ['·'], ['B'], ['='], ['.95']],
  'cosine-score': [['cos'], ['θ']],
  'tanimoto-score': [['A'], ['∩'], ['B']],
  'target-transfer': [['drug'], ['→'], ['target']],
  'graph-path': [['U'], ['M'], ['A'], ['M']],
  'node-graph': [['U'], ['M'], ['A']],
  'walk-path': [['1'], ['2'], ['3']],
  'rwr-transition': [['p'], ['W'], ['p'], ['+'], ['p0']],
  'rwr-restart': [['walk'], ['↻'], ['p0']],
  adjacency: [['1', '1', '0'], ['1', '1', '1'], ['0', '1', '1']],
  degree: [['2', '0', '0'], ['0', '3', '0'], ['0', '0', '2']],
  'message-passing': [['m'], ['Σ'], ['h']],
  'actor-message': [['actor'], ['→'], ['movie']],
  'director-message': [['dir'], ['→'], ['movie']],
  'bond-message': [['atom'], ['bond'], ['atom']],
  'node-feature-matrix': [['1', '0', '1'], ['0', '1', '0'], ['0', '0', '1']],
  'graph-pooling': [['h1'], ['h2'], ['Σ'], ['z']],
  'multi-omics-stack': [['DNA'], ['RNA'], ['P']],
  encoder: [['x'], ['→'], ['z']],
  bottleneck: [['z']],
  decoder: [['z'], ['→'], ['x']],
  reconstruction: [['x'], ['≈'], ['x̂']],
  'agent-policy': [['s'], ['π']],
  'action-step': [['a']],
  'policy-update': [['π'], ['↑']],
  policy: [['s'], ['a'], ['r'], ['Q']]
};

const matrixLabels: Record<MatrixVariant, string> = {
  'rating-matrix': 'R',
  'noisy-profile': 'noise',
  'dti-matrix': 'DTI',
  fingerprint: 'FP',
  'latent-vector': 'z',
  'latent-space': 'space',
  'content-features': 'feat',
  'movie-profile': 'profile',
  'tfidf-vector': 'tfidf',
  'als-factorization': 'ALS',
  'similarity-score': 'sim',
  'cosine-score': 'cos',
  'tanimoto-score': 'tan',
  'target-transfer': 'target',
  'graph-path': 'path',
  'node-graph': 'graph',
  'walk-path': 'walk',
  'rwr-transition': 'RWR',
  'rwr-restart': 'RWR',
  adjacency: 'A+I',
  degree: 'D',
  'message-passing': 'msg',
  'actor-message': 'actor',
  'director-message': 'dir',
  'bond-message': 'bond',
  'node-feature-matrix': 'H',
  'graph-pooling': 'pool',
  'multi-omics-stack': 'omics',
  encoder: 'enc',
  bottleneck: 'z',
  decoder: 'dec',
  reconstruction: 'recon',
  'agent-policy': 'agent',
  'action-step': 'act',
  'policy-update': 'update',
  policy: 'pi'
};

export function MiniMolecule({ variant = 'molecular-graph' }: { variant?: MoleculeVariant }) {
  const points: Record<MoleculeVariant, [number, number, string][]> = {
    'drug-a': [[20, 40, 'C'], [48, 21, 'O'], [78, 38, 'N'], [103, 22, 'S']],
    'drug-b': [[18, 24, 'N'], [44, 46, 'C'], [73, 23, 'O'], [101, 45, 'Cl']],
    'drug-new': [[22, 40, 'C'], [52, 24, 'N'], [82, 40, 'C'], [104, 22, '+']],
    'molecular-graph': [[24, 38, 'C'], [55, 20, 'O'], [88, 38, 'N'], [54, 56, 'H']]
  };
  const atoms = points[variant];

  return (
    <svg viewBox="0 0 120 70" className={`miniSvg moleculeSvg ${variant}`} aria-hidden="true">
      {atoms.slice(0, -1).map((point, i) => <line key={i} x1={point[0]} y1={point[1]} x2={atoms[i + 1][0]} y2={atoms[i + 1][1]} />)}
      {variant === 'drug-a' && <line x1="48" y1="21" x2="48" y2="56" />}
      {variant === 'drug-b' && <line x1="44" y1="46" x2="101" y2="45" />}
      {atoms.map(([x, y, label], i) => (
        <g key={`${label}-${i}`}>
          <circle cx={x} cy={y} r={label === '+' ? 11 : 12} className={`atom atom${i}`} />
          <text x={x} y={y + 5} textAnchor="middle">{label}</text>
        </g>
      ))}
    </svg>
  );
}

export function MiniProtein({ variant = 'protein-target' }: { variant?: ProteinVariant }) {
  return (
    <svg viewBox="0 0 120 70" className={`miniSvg proteinSvg ${variant}`} aria-hidden="true">
      {variant === 'protein-target' && <path d="M18 44 C34 10, 50 60, 66 30 S98 24, 104 48" />}
      {variant === 'ppi-network' && <>
        <line x1="28" y1="38" x2="58" y2="22" />
        <line x1="58" y1="22" x2="90" y2="42" />
        <line x1="28" y1="38" x2="90" y2="42" />
      </>}
      <circle cx="28" cy="36" r={variant === 'ppi-network' ? 10 : 5} />
      <circle cx="58" cy="38" r={variant === 'ppi-network' ? 10 : 5} />
      <circle cx="88" cy="34" r={variant === 'ppi-network' ? 10 : 5} />
    </svg>
  );
}

export function MiniOmics({ variant = 'omics-profile' }: { variant?: OmicsVariant }) {
  const noisy = variant === 'rna-noisy';
  const denoise = variant === 'denoise';
  const multi = variant === 'multi-omics';
  const bars = [18, 34, 50, 66, 82, 98];
  return (
    <svg viewBox="0 0 120 70" className={`miniSvg omicsSvg ${variant}`} aria-hidden="true">
      {multi && <rect x="12" y="12" width="92" height="44" rx="10" className="omicsLayer layerBack" />}
      {multi && <rect x="18" y="18" width="92" height="44" rx="10" className="omicsLayer layerFront" />}
      {bars.map((x, i) => (
        <rect key={x} x={x} y={18 + (i % 3) * 7 + (noisy && i % 2 ? 7 : 0)} width="10" height={36 - (i % 3) * 8} rx="4" />
      ))}
      {noisy && <polyline points="13,45 24,18 37,55 50,24 63,50 76,20 89,48 104,22" className="noiseLine" />}
      {denoise && <>
        <polyline points="14,50 28,42 42,38 56,34 70,30 86,27 104,24" />
        <path d="M22 18 H44 M30 10 V30 M76 45 H98 M86 35 V55" className="cleanMark" />
      </>}
      {!noisy && !denoise && <polyline points="16,52 34,34 52,40 70,24 88,32 106,18" />}
    </svg>
  );
}

export function MiniScore({ variant = 'binding-score' }: { variant?: ScoreVariant }) {
  const label = variant === 'binding-score' ? 'Kd'
    : variant === 'toxicity-score' ? 'tox'
    : variant === 'qed-score' ? 'QED'
    : 'watch';
  const alert = variant === 'toxicity-score';

  return (
    <svg viewBox="0 0 120 70" className={`miniSvg scoreSvg ${variant}`} aria-hidden="true">
      <path d="M24 50 A36 36 0 0 1 96 50" />
      <line x1="60" y1="50" x2={alert ? 84 : 76} y2={alert ? 29 : 34} />
      <circle cx="60" cy="50" r="4" />
      <rect x="32" y="7" width="56" height="18" rx="8" />
      <text x="60" y="20" textAnchor="middle">{label}</text>
      {alert && <path d="M96 20 L106 39 H86 Z" className="scoreAlert" />}
    </svg>
  );
}

export function MiniMatrix({ variant = 'rating-matrix' }: { variant?: MatrixVariant }) {
  const values = matrixValues[variant];
  const columns = values[0].length;
  const rows = values.length;
  const isWide = columns > 5;
  const isMediumWide = columns === 5;
  const isTall = rows > 3;
  const cellW = isWide ? 10 : isMediumWide ? 14 : 18;
  const cellH = isTall ? 10 : 13;
  const colGap = isWide ? 12 : isMediumWide ? 17 : 23;
  const rowGap = isTall ? 12 : 17;
  const startX = isWide ? 28 : isMediumWide ? 32 : 30;
  const startY = rows === 1 ? 28 : isTall ? 7 : 11;

  return (
    <svg viewBox="0 0 132 70" className={`miniSvg matrixSvg ${variant}`} aria-hidden="true">
      <text x="7" y="14" className="matrixLabel">{matrixLabels[variant]}</text>
      {variant === 'als-factorization' && <AlsVisual />}
      {variant === 'latent-space' && <LatentSpaceVisual />}
      {variant === 'noisy-profile' && <NoisyProfileVisual />}
      {variant === 'content-features' && <ContentFeatureVisual />}
      {variant === 'movie-profile' && <MovieProfileVisual />}
      {variant === 'tfidf-vector' && <TfidfVisual />}
      {variant === 'cosine-score' && <CosineVisual />}
      {variant === 'tanimoto-score' && <TanimotoVisual />}
      {variant === 'target-transfer' && <TargetTransferVisual />}
      {variant === 'node-graph' && <NodeGraphVisual />}
      {variant === 'walk-path' && <WalkPathVisual />}
      {variant === 'rwr-restart' && <RwrRestartVisual />}
      {variant === 'message-passing' && <MessagePassingVisual kind="generic" />}
      {variant === 'actor-message' && <MessagePassingVisual kind="actor" />}
      {variant === 'director-message' && <MessagePassingVisual kind="director" />}
      {variant === 'bond-message' && <MessagePassingVisual kind="bond" />}
      {variant === 'graph-pooling' && <GraphPoolingVisual />}
      {variant === 'node-feature-matrix' && <FeatureMatrixVisual />}
      {variant === 'multi-omics-stack' && <MultiOmicsStackVisual />}
      {variant === 'encoder' && <AutoencoderVisual kind="encoder" />}
      {variant === 'bottleneck' && <AutoencoderVisual kind="bottleneck" />}
      {variant === 'decoder' && <AutoencoderVisual kind="decoder" />}
      {variant === 'reconstruction' && <ReconstructionVisual />}
      {variant === 'agent-policy' && <RlVisual kind="agent" />}
      {variant === 'action-step' && <RlVisual kind="action" />}
      {variant === 'policy-update' && <RlVisual kind="update" />}
      {variant !== 'als-factorization' && values.map((row, rowIndex) => row.map((value, colIndex) => {
        if (customMatrixVisuals.has(variant)) return null;
        const x = startX + colIndex * colGap;
        const y = startY + rowIndex * rowGap;
        const missing = value === '?';
        return (
          <g key={`${rowIndex}-${colIndex}`}>
            <rect x={x} y={y} width={cellW} height={cellH} rx="4" className={missing ? 'matrixMissing' : `matrixCell cell${colIndex}`} />
            <text x={x + cellW / 2} y={y + (isTall ? 7.5 : 9.5)} textAnchor="middle">{value}</text>
          </g>
        );
      }))}
      {!customMatrixVisuals.has(variant) && variant !== 'als-factorization' && <path d="M20 7 H124 M20 60 H124 M18 7 V60 M126 7 V60" />}
    </svg>
  );
}

const customMatrixVisuals = new Set<MatrixVariant>([
  'latent-space',
  'noisy-profile',
  'content-features',
  'movie-profile',
  'tfidf-vector',
  'cosine-score',
  'tanimoto-score',
  'target-transfer',
  'node-graph',
  'walk-path',
  'rwr-restart',
  'message-passing',
  'actor-message',
  'director-message',
  'bond-message',
  'graph-pooling',
  'node-feature-matrix',
  'multi-omics-stack',
  'encoder',
  'bottleneck',
  'decoder',
  'reconstruction',
  'agent-policy',
  'action-step',
  'policy-update'
]);

function AlsVisual() {
  return (
    <g className="alsVisual">
      <rect x="22" y="18" width="24" height="34" rx="6" />
      <text x="34" y="38" textAnchor="middle">R</text>
      <text x="52" y="38" textAnchor="middle">~</text>
      <rect x="62" y="12" width="15" height="46" rx="5" />
      <text x="69.5" y="38" textAnchor="middle">P</text>
      <text x="82" y="38" textAnchor="middle">x</text>
      <rect x="91" y="24" width="30" height="16" rx="5" />
      <text x="106" y="36" textAnchor="middle">Q</text>
    </g>
  );
}

function LatentSpaceVisual() {
  const points = [[39, 44], [56, 30], [73, 42], [90, 24], [102, 47]];
  return (
    <g className="customVisual latentSpaceVisual">
      <path d="M28 55 H108 M28 55 V16" />
      <ellipse cx="66" cy="36" rx="35" ry="18" className="softRegion" />
      {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" className={`point p${i}`} />)}
    </g>
  );
}

function NoisyProfileVisual() {
  const cells = [
    [31, 18, '5', 'clean'],
    [52, 18, '?', 'missing'],
    [73, 18, '1', 'clean'],
    [94, 18, 'x', 'bad'],
    [31, 39, '?', 'missing'],
    [52, 39, '4', 'clean'],
    [73, 39, 'x', 'bad'],
    [94, 39, '2', 'clean']
  ] as const;
  return (
    <g className="customVisual noisyProfileVisual">
      {cells.map(([x, y, label, klass]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="15" height="13" rx="4" className={klass} />
          <text x={x + 7.5} y={y + 9.5} textAnchor="middle">{label}</text>
        </g>
      ))}
      <polyline points="24,55 39,12 56,58 73,15 93,56 110,20" className="noiseLine" />
    </g>
  );
}

function ContentFeatureVisual() {
  return (
    <g className="customVisual contentFeatureVisual">
      <rect x="26" y="17" width="26" height="18" rx="7" />
      <rect x="56" y="26" width="26" height="18" rx="7" />
      <rect x="86" y="17" width="26" height="18" rx="7" />
      <path d="M39 36 C50 48, 74 51, 99 36" />
      <text x="39" y="30" textAnchor="middle">G</text>
      <text x="69" y="39" textAnchor="middle">A</text>
      <text x="99" y="30" textAnchor="middle">K</text>
    </g>
  );
}

function MovieProfileVisual() {
  return (
    <g className="customVisual movieProfileVisual">
      <rect x="27" y="14" width="78" height="42" rx="10" />
      <path d="M27 25 H105 M45 14 V56" />
      <circle cx="36" cy="20" r="3" />
      <circle cx="36" cy="32" r="3" />
      <circle cx="36" cy="44" r="3" />
      <rect x="53" y="22" width="37" height="6" rx="3" />
      <rect x="53" y="34" width="28" height="6" rx="3" />
      <rect x="53" y="46" width="44" height="6" rx="3" />
    </g>
  );
}

function TfidfVisual() {
  const bars = [18, 31, 47, 25, 40];
  return (
    <g className="customVisual tfidfVisual">
      <path d="M28 55 H109" />
      {bars.map((h, i) => <rect key={i} x={34 + i * 14} y={55 - h} width="9" height={h} rx="4" className={`bar b${i}`} />)}
      <path d="M34 20 C50 38, 69 18, 94 32" className="weightLine" />
    </g>
  );
}

function CosineVisual() {
  return (
    <g className="customVisual cosineVisual">
      <circle cx="64" cy="42" r="23" className="softRegion" />
      <path d="M64 42 L101 26" />
      <path d="M64 42 L93 54" />
      <path d="M75 38 A15 15 0 0 1 78 47" className="angleArc" />
      <text x="81" y="42" textAnchor="middle">θ</text>
    </g>
  );
}

function TanimotoVisual() {
  return (
    <g className="customVisual tanimotoVisual">
      <circle cx="56" cy="36" r="22" className="setA" />
      <circle cx="78" cy="36" r="22" className="setB" />
      <rect x="45" y="55" width="47" height="5" rx="3" />
      <text x="67" y="40" textAnchor="middle">∩</text>
    </g>
  );
}

function TargetTransferVisual() {
  return (
    <g className="customVisual targetTransferVisual">
      <circle cx="34" cy="36" r="11" className="drugDot" />
      <circle cx="56" cy="24" r="8" className="drugDot small" />
      <line x1="44" y1="32" x2="77" y2="32" />
      <path d="M77 32 L69 27 M77 32 L69 37" />
      <path d="M86 48 C76 22, 103 17, 106 42" className="proteinStroke" />
      <circle cx="96" cy="37" r="5" className="targetPocket" />
    </g>
  );
}

function NodeGraphVisual() {
  const nodes = [[36, 38, 'U'], [65, 22, 'M'], [94, 42, 'A']];
  return (
    <g className="customVisual nodeGraphVisual">
      <line x1="36" y1="38" x2="65" y2="22" />
      <line x1="65" y1="22" x2="94" y2="42" />
      <line x1="36" y1="38" x2="94" y2="42" />
      {nodes.map(([x, y, label]) => <g key={label}><circle cx={x} cy={y} r="11" /><text x={x} y={Number(y) + 4} textAnchor="middle">{label}</text></g>)}
    </g>
  );
}

function WalkPathVisual() {
  const points = [[28, 44], [50, 22], [73, 38], [101, 24]];
  return (
    <g className="customVisual walkPathVisual">
      <polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')} />
      {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 5} />)}
      <path d="M96 24 L88 20 M96 24 L91 31" />
    </g>
  );
}

function RwrRestartVisual() {
  return (
    <g className="customVisual rwrRestartVisual">
      <circle cx="35" cy="42" r="8" />
      <circle cx="62" cy="26" r="8" />
      <circle cx="91" cy="42" r="8" />
      <path d="M43 39 L54 30 M70 30 L83 38" />
      <path d="M91 51 C73 65, 43 63, 35 51" className="restartPath" />
      <path d="M35 51 L43 54 M35 51 L38 43" />
      <text x="63" y="58" textAnchor="middle">restart</text>
    </g>
  );
}

function MessagePassingVisual({ kind }: { kind: 'generic' | 'actor' | 'director' | 'bond' }) {
  const label = kind === 'actor' ? 'A' : kind === 'director' ? 'D' : kind === 'bond' ? 'B' : 'h';
  const center = kind === 'bond' ? 'C' : 'M';
  const className = `customVisual gnnVisual messageVisual ${kind}`;
  return (
    <g className={className}>
      {kind === 'director' && <rect x="25" y="12" width="23" height="23" rx="6" className="messageNode" />}
      {kind !== 'director' && <circle cx="36" cy="19" r="10" className="messageNode" />}
      {kind === 'bond' ? <line x1="36" y1="51" x2="61" y2="51" className="bondLine" /> : <circle cx="36" cy="51" r="10" className="messageNode alt" />}
      <path d="M47 23 C57 24, 65 28, 73 32" />
      <path d="M47 47 C57 46, 65 42, 73 38" />
      <circle cx="88" cy="35" r="13" className="focusNode" />
      <text x="36" y="23" textAnchor="middle">{label}</text>
      <text x="36" y="55" textAnchor="middle">{kind === 'bond' ? 'e' : 'n'}</text>
      <text x="88" y="39" textAnchor="middle">{center}</text>
      <text x="62" y="38" textAnchor="middle" className="sigmaText">Σ</text>
    </g>
  );
}

function GraphPoolingVisual() {
  return (
    <g className="gnnVisual poolingVisual">
      <circle cx="29" cy="20" r="8" />
      <circle cx="29" cy="49" r="8" />
      <circle cx="54" cy="35" r="8" />
      <path d="M39 22 C52 23, 66 27, 78 32" />
      <path d="M39 48 C52 47, 66 43, 78 38" />
      <path d="M62 35 H78" />
      <rect x="82" y="22" width="30" height="26" rx="9" className="poolBox" />
      <text x="97" y="39" textAnchor="middle">z</text>
      <text x="65" y="19" textAnchor="middle" className="sigmaText">pool</text>
    </g>
  );
}

function FeatureMatrixVisual() {
  const rows = [
    ['C', '1', '0', '1'],
    ['O', '0', '1', '0'],
    ['N', '0', '0', '1']
  ];
  return (
    <g className="featureMatrixVisual">
      {rows.map((row, rowIndex) => row.map((value, colIndex) => {
        const x = 25 + colIndex * 24;
        const y = 10 + rowIndex * 17;
        return (
          <g key={`${rowIndex}-${colIndex}`}>
            <rect x={x} y={y} width={18} height={13} rx="4" className={colIndex === 0 ? 'featureHeader' : `matrixCell cell${colIndex}`} />
            <text x={x + 9} y={y + 9.5} textAnchor="middle">{value}</text>
          </g>
        );
      }))}
      <path d="M21 7 H121 M21 61 H121 M19 7 V61 M123 7 V61" />
    </g>
  );
}

function MultiOmicsStackVisual() {
  const layers = [
    [25, 16, 'dna'],
    [34, 25, 'rna'],
    [43, 34, 'protein']
  ] as const;
  return (
    <g className="customVisual multiOmicsStackVisual">
      {layers.map(([x, y, klass]) => <rect key={klass} x={x} y={y} width="61" height="18" rx="7" className={klass} />)}
      <path d="M99 20 C112 32, 111 47, 99 56" />
      <circle cx="101" cy="38" r="8" className="patientNode" />
    </g>
  );
}

function AutoencoderVisual({ kind }: { kind: 'encoder' | 'bottleneck' | 'decoder' }) {
  if (kind === 'bottleneck') {
    return (
      <g className="customVisual autoencoderVisual bottleneckVisual">
        <path d="M31 16 C54 20, 54 50, 31 54" />
        <path d="M101 16 C78 20, 78 50, 101 54" />
        <circle cx="66" cy="35" r="10" />
        <text x="66" y="39" textAnchor="middle">z</text>
      </g>
    );
  }

  const encoder = kind === 'encoder';
  const left = encoder ? [28, 22, 28, 46] : [33, 35];
  const right = encoder ? [96, 35] : [85, 22, 85, 46];
  return (
    <g className={`customVisual autoencoderVisual ${kind}`}>
      {encoder ? <>
        <rect x="25" y="17" width="10" height="12" rx="4" />
        <rect x="25" y="34" width="10" height="18" rx="4" />
        <circle cx="96" cy="35" r="10" />
      </> : <>
        <circle cx="33" cy="35" r="10" />
        <rect x="84" y="17" width="10" height="12" rx="4" />
        <rect x="84" y="34" width="10" height="18" rx="4" />
      </>}
      <path d={`M${left[0]} ${left[1]} C58 22, 65 22, ${right[0]} ${right[1]}`} />
      <path d={`M${left.length > 2 ? left[2] : left[0]} ${left.length > 2 ? left[3] : left[1]} C58 48, 65 48, ${right.length > 2 ? right[2] : right[0]} ${right.length > 2 ? right[3] : right[1]}`} />
    </g>
  );
}

function ReconstructionVisual() {
  return (
    <g className="customVisual reconstructionVisual">
      <rect x="25" y="20" width="11" height="11" rx="4" className="noisy" />
      <rect x="25" y="39" width="11" height="11" rx="4" className="noisy" />
      <path d="M43 35 H72" />
      <path d="M72 35 L64 30 M72 35 L64 40" />
      <rect x="84" y="18" width="11" height="11" rx="4" className="clean" />
      <rect x="99" y="18" width="11" height="11" rx="4" className="clean" />
      <rect x="84" y="37" width="11" height="11" rx="4" className="clean" />
      <rect x="99" y="37" width="11" height="11" rx="4" className="clean" />
    </g>
  );
}

function RlVisual({ kind }: { kind: 'agent' | 'action' | 'update' }) {
  return (
    <g className={`customVisual rlVisual ${kind}`}>
      {kind === 'agent' && <>
        <rect x="36" y="20" width="48" height="30" rx="12" />
        <circle cx="50" cy="34" r="3" />
        <circle cx="70" cy="34" r="3" />
        <path d="M55 44 H65" />
      </>}
      {kind === 'action' && <>
        <circle cx="39" cy="36" r="10" />
        <path d="M54 36 H92" />
        <path d="M92 36 L83 30 M92 36 L83 42" />
        <rect x="96" y="25" width="13" height="22" rx="5" />
      </>}
      {kind === 'update' && <>
        <path d="M35 47 C43 23, 73 17, 95 31" />
        <path d="M95 31 L84 28 M95 31 L88 40" />
        <rect x="43" y="40" width="43" height="10" rx="5" />
        <text x="64" y="49" textAnchor="middle">π</text>
      </>}
    </g>
  );
}
