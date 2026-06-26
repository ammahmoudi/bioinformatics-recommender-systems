import type { FlowVisual } from '../types';

type MatrixVariant = Extract<FlowVisual, 'rating-matrix' | 'dti-matrix' | 'fingerprint' | 'latent-vector' | 'als-factorization' | 'similarity-score' | 'graph-path' | 'rwr-transition' | 'adjacency' | 'degree' | 'policy'>;
type MoleculeVariant = Extract<FlowVisual, 'drug-a' | 'drug-b' | 'drug-new' | 'molecular-graph'>;
type OmicsVariant = Extract<FlowVisual, 'rna-noisy' | 'denoise' | 'omics-profile' | 'multi-omics'>;
type ProteinVariant = Extract<FlowVisual, 'protein-target' | 'ppi-network'>;
type ScoreVariant = Extract<FlowVisual, 'binding-score' | 'toxicity-score' | 'qed-score' | 'watch-reward'>;

const matrixValues: Record<MatrixVariant, string[][]> = {
  'rating-matrix': [['5', '1', '5', '?'], ['5', '2', '4', '1'], ['1', '5', '1', '5']],
  'dti-matrix': [['1', '1', '1', '?'], ['1', '1', '1', '1'], ['0', '1', '0', '0']],
  fingerprint: [['1', '0', '1', '1', '0', '0', '1', '0']],
  'latent-vector': [['.8', '.1', '.6', '.3', '.9']],
  'als-factorization': [['R'], ['='], ['P'], ['x'], ['Q']],
  'similarity-score': [['A'], ['·'], ['B'], ['='], ['.95']],
  'graph-path': [['U'], ['M'], ['A'], ['M']],
  'rwr-transition': [['p'], ['W'], ['p'], ['+'], ['p0']],
  adjacency: [['1', '1', '0'], ['1', '1', '1'], ['0', '1', '1']],
  degree: [['2', '0', '0'], ['0', '3', '0'], ['0', '0', '2']],
  policy: [['s'], ['a'], ['r'], ['Q']]
};

const matrixLabels: Record<MatrixVariant, string> = {
  'rating-matrix': 'R',
  'dti-matrix': 'DTI',
  fingerprint: 'FP',
  'latent-vector': 'z',
  'als-factorization': 'ALS',
  'similarity-score': 'sim',
  'graph-path': 'path',
  'rwr-transition': 'RWR',
  adjacency: 'A+I',
  degree: 'D',
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
      <circle cx="60" cy="50" r="6" />
      <rect x="38" y="13" width="44" height="18" rx="8" />
      <text x="60" y="26" textAnchor="middle">{label}</text>
      {alert && <path d="M94 16 L108 42 H80 Z" className="scoreAlert" />}
    </svg>
  );
}

export function MiniMatrix({ variant = 'rating-matrix' }: { variant?: MatrixVariant }) {
  const values = matrixValues[variant];
  const isWide = values[0].length > 5;
  const cellW = isWide ? 10 : 18;
  const gap = isWide ? 12 : 23;
  const startX = isWide ? 28 : 30;
  const startY = values.length === 1 ? 28 : 11;

  return (
    <svg viewBox="0 0 132 70" className={`miniSvg matrixSvg ${variant}`} aria-hidden="true">
      <text x="7" y="14" className="matrixLabel">{matrixLabels[variant]}</text>
      {variant === 'als-factorization' && <AlsVisual />}
      {variant !== 'als-factorization' && values.map((row, rowIndex) => row.map((value, colIndex) => {
        const x = startX + colIndex * gap;
        const y = startY + rowIndex * 17;
        const missing = value === '?';
        return (
          <g key={`${rowIndex}-${colIndex}`}>
            <rect x={x} y={y} width={cellW} height="13" rx="4" className={missing ? 'matrixMissing' : `matrixCell cell${colIndex}`} />
            <text x={x + cellW / 2} y={y + 9.5} textAnchor="middle">{value}</text>
          </g>
        );
      }))}
      {variant !== 'als-factorization' && <path d="M20 7 H124 M20 60 H124 M18 7 V60 M126 7 V60" />}
    </svg>
  );
}

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
