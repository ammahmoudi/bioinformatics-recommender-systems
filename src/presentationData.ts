export type TableData = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type FormulaData = {
  title: string;
  latex: string;
  explanation?: string;
  symbols?: { symbol: string; meaning: string }[];
};

export type GlossaryEntry = {
  definition: string;
  example?: string;
  formula?: string;
  table?: TableData;
  visual?: import('./types').FlowVisual;
};

export type MethodSlide = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  terms: string[];
  movie: {
    intuition: string;
    chartTitle: string;
    table?: TableData;
    details: string[];
  };
  bio: {
    intuition: string;
    context: string;
    chartTitle: string;
    table?: TableData;
    details: string[];
  };
  formulas: FormulaData[];
  tools: string[];
};

export const terminology = {
  title: 'General Terminology Mapping',
  summary:
    'Traditional recommendation entities map cleanly to biological prediction entities: users become drugs, diseases, or patients; items become proteins, genes, or microbes; ratings become biological interactions.',
  table: {
    title: 'Core mapping',
    headers: ['E-Commerce / Movies', 'Bioinformatics Translation', 'Brief Biological Definition'],
    rows: [
      ['User', 'Drug, Disease, or Patient', 'The primary entity we want to make a prediction for.'],
      ['Item (Movie)', 'Target Protein, Gene, or Microbe', 'The secondary entity that interacts with the primary one.'],
      ['Rating (1-5 Stars)', 'Binding Affinity (Kd/IC50), DTI, association score', 'A score showing whether, or how strongly, a biological interaction exists.'],
      ['Movie Genre / Actor', 'SMILES, Morgan Fingerprint, sequence', 'Features that describe the item/entity. SMILES is chemical text; fingerprints are binary feature vectors.'],
      ['User History', 'Multi-omics profile', 'Comprehensive biological data for a specific patient or cell.']
    ]
  }
};

export const methods: MethodSlide[] = [
  {
    id: 'cf',
    number: '2',
    title: 'Collaborative Filtering (CF) & Matrix Factorization',
    shortTitle: 'Collaborative Filtering',
    summary:
      'Predict missing preferences or drug-target interactions from shared matrix patterns rather than item content.',
    terms: ['DTI: Drug-Target Interaction', 'Binding Affinity, Kd, and IC50', 'LMF, RLMF, and NRLMF', 'Drug Repurposing'],
    movie: {
      intuition:
        '"People who liked the movies you liked also liked this movie." It does not care what the movie is about; it cares about who interacted with what.',
      chartTitle: 'Movie CF algorithm flow',
      table: {
        title: 'Simple rating matrix',
        headers: ['User', 'Inception', 'Toy Story', 'The Matrix', 'Shrek'],
        rows: [
          ['User A', '5', '1', '5', '?'],
          ['User B', '5', '2', '4', '1'],
          ['User C', '1', '5', '1', '5']
        ]
      },
      details: [
        'The missing ? is the value the recommender predicts.',
        'r_ui means the observed rating from user u for item i.',
        'A learned user vector and movie vector are compared with a dot product.',
        'Sparse matrix R is factorized into dense matrices P and Q.'
      ]
    },
    bio: {
      intuition:
        '"Drugs that interact with the same proteins as Drug A may also interact with Drug A\'s other targets."',
      context:
        'Drug-target interaction matrix: rows are drugs, columns are proteins, 1 means bind, 0 means do not bind, and ? means untested.',
      chartTitle: 'Bioinformatics CF algorithm flow',
      table: {
        title: 'Sample DTI matrix',
        headers: ['Drug', 'Protein T1', 'Protein T2', 'Protein T3', 'Protein T4'],
        rows: [
          ['Drug A', '1', '1', '1', '?'],
          ['Drug B', '1', '1', '1', '1'],
          ['Drug C', '0', '1', '0', '0']
        ]
      },
      details: [
        'The model learns drug vectors and protein vectors.',
        'The missing question is whether Drug A binds Protein T4.',
        'RLMF/NRLMF predict probabilities for binary binding data.',
        'BPR and PMF are related ranking/factorization approaches for sparse interaction data.'
      ]
    },
    formulas: [
      {
        title: 'Prediction',
        latex: String.raw`\hat{r}_{ui} = p_u \cdot q_i^T`,
        explanation:
          'The predicted rating or interaction is calculated from the dot product of the learned user/drug vector and item/protein vector.',
        symbols: [
          { symbol: 'R', meaning: 'Original user-item or drug-target matrix.' },
          { symbol: String.raw`r_{ui}`, meaning: 'Known rating/interactions for user u and item i.' },
          { symbol: String.raw`\hat{r}_{ui}`, meaning: 'Predicted rating/interactions for user u and item i.' },
          { symbol: String.raw`p_u`, meaning: 'Learned vector for one user or drug.' },
          { symbol: String.raw`q_i`, meaning: 'Learned vector for one item or protein.' }
        ]
      },
      {
        title: 'Training objective',
        latex: String.raw`\min_{P,Q} \sum_{(u,i)} (r_{ui} - p_u \cdot q_i^T)^2 + \lambda(||p_u||^2 + ||q_i||^2)`,
        symbols: [
          { symbol: String.raw`r_{ui}`, meaning: 'Actual observed rating or interaction.' },
          { symbol: String.raw`\hat{r}_{ui}`, meaning: 'Predicted value from the dot product.' },
          { symbol: String.raw`P`, meaning: 'Matrix of learned user/drug vectors.' },
          { symbol: String.raw`Q`, meaning: 'Matrix of learned item/protein vectors.' },
          { symbol: String.raw`p_u, q_i`, meaning: 'One row/vector taken from P and Q.' },
          { symbol: String.raw`\lambda`, meaning: 'Regularization strength to prevent overfitting.' }
        ]
      }
    ],
    tools: ['Netflix Prize SVD', 'Apache Spark MLlib ALS', 'Surprise', 'implicit', 'LightFM', 'PMF', 'BPR', 'LMF', 'RLMF', 'NRLMF', 'PyDTI', 'DeepPurpose', 'Yamanishi datasets']
  },
  {
    id: 'cbf',
    number: '3',
    title: 'Content-Based Filtering (CBF)',
    shortTitle: 'Content-Based Filtering',
    summary:
      'Compare item features directly: movie profiles in media recommendation, chemical fingerprints in target prediction.',
    terms: ['SMILES', 'Morgan Fingerprint', 'Tanimoto Coefficient', 'TF-IDF'],
    movie: {
      intuition:
        '"Because you watched a sci-fi movie directed by Christopher Nolan, we recommend another sci-fi movie directed by Christopher Nolan."',
      chartTitle: 'Movie CBF algorithm flow',
      table: {
        title: 'Simple feature table',
        headers: ['Movie', 'Genre', 'Director', 'Keywords'],
        rows: [
          ['Inception', 'Sci-Fi', 'C. Nolan', 'dreams, mind-bending'],
          ['Interstellar', 'Sci-Fi', 'C. Nolan', 'space, time-travel'],
          ['Toy Story', 'Animation', 'John Lasseter', 'toys, kids']
        ]
      },
      details: [
        'No other users are required.',
        'The model compares feature vectors.',
        'TF-IDF can turn keywords into weighted vectors.',
        'Modern catalog search can also use content embeddings.'
      ]
    },
    bio: {
      intuition:
        '"Because Drug A inhibits Target X, Drug B, which has a similar chemical structure, may also inhibit Target X."',
      context:
        'Structural homology: molecules with similar shapes often perform similar biological functions.',
      chartTitle: 'Bioinformatics CBF algorithm flow',
      table: {
        title: 'Sample chemical feature table',
        headers: ['Drug', 'SMILES', 'Morgan bits', 'Known target'],
        rows: [
          ['Aspirin-like A', 'CC(=O)Oc1...', '10110010', 'COX'],
          ['Drug B', 'CC(=O)Nc1...', '10110011', '?'],
          ['Drug C', 'NCC(O)c1...', '01000110', 'ADRB']
        ]
      },
      details: [
        'SMILES is a text representation of a molecule.',
        'Morgan fingerprints convert molecules into binary vectors.',
        'Tanimoto similarity compares shared fingerprint bits.'
      ]
    },
    formulas: [
      {
        title: 'Cosine similarity',
        latex: String.raw`\text{Cosine}(A, B) = \frac{A \cdot B}{||A|| ||B||}`,
        symbols: [
          { symbol: 'A', meaning: 'Feature vector for the first item, such as Inception.' },
          { symbol: 'B', meaning: 'Feature vector for the second item, such as Interstellar.' },
          { symbol: String.raw`A \cdot B`, meaning: 'Dot product: high when features overlap.' },
          { symbol: String.raw`||A||, ||B||`, meaning: 'Vector lengths used for normalization.' },
          { symbol: String.raw`\text{Cosine}(A,B)`, meaning: 'Similarity score, usually 0 to 1 for non-negative TF-IDF vectors.' }
        ]
      },
      {
        title: 'Tanimoto coefficient',
        latex: String.raw`T(A, B) = \frac{A \cdot B}{||A||^2 + ||B||^2 - A \cdot B}`,
        symbols: [
          { symbol: 'A', meaning: 'Binary fingerprint vector for Drug A.' },
          { symbol: 'B', meaning: 'Binary fingerprint vector for Drug B.' },
          { symbol: String.raw`A \cdot B`, meaning: 'Number of 1 bits shared by both molecules.' },
          { symbol: String.raw`||A||^2`, meaning: 'Number of 1 bits in Drug A fingerprint.' },
          { symbol: String.raw`||B||^2`, meaning: 'Number of 1 bits in Drug B fingerprint.' },
          { symbol: String.raw`||A||^2 + ||B||^2 - A \cdot B`, meaning: 'Union of 1-bit positions across both fingerprints.' },
          { symbol: String.raw`T(A,B)`, meaning: 'Similarity score, usually between 0 and 1.' }
        ]
      }
    ],
    tools: ['TF-IDF', 'content embeddings', 'scikit-learn nearest neighbors', 'Elasticsearch more-like-this', 'RDKit Morgan fingerprints', 'Open Babel', 'PubChem similarity', 'ChEMBL similarity', 'SwissSimilarity', 'DeepPurpose']
  },
  {
    id: 'graph',
    number: '4',
    title: 'Graph-Based Methods',
    shortTitle: 'Graph Methods',
    summary:
      'Use network paths to score proximity: user-movie-actor links in media, disease-gene-protein links in biology.',
    terms: ['PPI Network', 'Random Walk with Restart (RWR)'],
    movie: {
      intuition:
        '"Everything is connected in a web." A user is connected to movies, movies to actors, and actors to other movies.',
      chartTitle: 'Movie graph algorithm flow',
      table: {
        title: 'Sample movie graph edges',
        headers: ['From', 'Relation', 'To'],
        rows: [
          ['User A', 'watched', 'Inception'],
          ['Inception', 'stars', 'Leonardo'],
          ['Leonardo', 'starred in', 'Titanic']
        ]
      },
      details: [
        'The recommender follows paths through the network.',
        'A short path can imply high recommendation relevance.',
        'Random-walk methods turn graph proximity into scores.',
        'Restart prevents the walk from drifting toward generally popular nodes.'
      ]
    },
    bio: {
      intuition:
        '"Disease X is caused by Gene Y, which physically interacts with Protein Z. Recommend targets in the nearby biological neighborhood."',
      context:
        'PPI networks show which proteins physically or functionally interact in a cell.',
      chartTitle: 'Bioinformatics graph algorithm flow',
      table: {
        title: 'Sample bio network edges',
        headers: ['From', 'Relation', 'To'],
        rows: [
          ['Drug A', 'treats', 'Disease X'],
          ['Disease X', 'associated gene', 'Gene Y'],
          ['Gene Y', 'encodes', 'Protein Y']
        ]
      },
      details: [
        'Disease-gene prioritization uses Random Walk on Heterogeneous Networks.',
        'Restart keeps the score local to the starting node.',
        'Steady state is the stable final probability distribution.',
        'RWR-HN applies the same restart idea on heterogeneous drug-disease-gene-protein networks.'
      ]
    },
    formulas: [
      {
        title: 'Random Walk with Restart',
        latex: String.raw`p_{t+1} = (1-c) W p_t + c p_0`,
        symbols: [
          { symbol: String.raw`p_0`, meaning: 'Starting probability vector.' },
          { symbol: String.raw`p_t`, meaning: 'Probability distribution after t steps.' },
          { symbol: String.raw`p_{t+1}`, meaning: 'Updated probability distribution after one more step.' },
          { symbol: 'W', meaning: 'Transition matrix over graph edges.' },
          { symbol: 'c', meaning: 'Restart probability.' },
          { symbol: String.raw`(1-c)Wp_t`, meaning: 'The part that walks through the graph.' },
          { symbol: String.raw`cp_0`, meaning: 'The part that jumps back to the start node.' },
          { symbol: 'Steady state', meaning: 'Final stable distribution; high-score nodes are close or strongly connected.' }
        ]
      }
    ],
    tools: ['PageRank', 'Personalized PageRank', 'RWR-HN', 'Neo4j Graph Data Science', 'NetworkX', 'igraph', 'STRING', 'BioGRID', 'Cytoscape', 'Hetionet', 'OpenTargets']
  },
  {
    id: 'autoencoder',
    number: '5',
    title: 'Deep Learning (Autoencoders)',
    shortTitle: 'Autoencoders',
    summary:
      'Compress incomplete or noisy profiles into latent vectors, then reconstruct dense predictions.',
    terms: ['Omics Profile', 'RNA-seq', 'Multi-Omics', 'DTI: Drug-Target Interaction'],
    movie: {
      intuition:
        '"Compress a user\'s messy, incomplete watch history into a dense hidden code, then decode it to reconstruct missing ratings."',
      chartTitle: 'Movie autoencoder algorithm flow',
      table: {
        title: 'Noisy watch vector',
        headers: ['User', 'Inception', 'Toy Story', 'Matrix', 'Shrek'],
        rows: [
          ['User A input', '5', '?', '5', '?'],
          ['Decoder output', '5', '1', '5', '1']
        ]
      },
      details: [
        'The model is trained to copy input to output through a bottleneck.',
        'Masked or corrupted entries teach reconstruction.',
        'The decoder fills missing ratings after training.',
        'The reconstructed output estimates entries that were hidden, noisy, or never observed.'
      ]
    },
    bio: {
      intuition:
        '"Biological lab tests are noisy and incomplete. Map profiles into latent cell-state space and decode missing associations."',
      context:
        'Omics data such as RNA-seq is high-dimensional, noisy, sparse, and highly correlated.',
      chartTitle: 'Bioinformatics autoencoder algorithm flow',
      table: {
        title: 'Example RNA-seq profile',
        headers: ['Sample', 'TP53', 'EGFR', 'MYC', 'BRCA1'],
        rows: [['Patient 1', '8.2', '2.1', '10.5', '4.4']]
      },
      details: [
        'Multi-omics layers have different units, missing values, noise, and batch effects.',
        'The model aligns DNA, RNA, proteins, metabolites, clinical variables, and drug response.',
        'Stacked Denoising Autoencoders reduce dimensionality while filtering noise.',
        'Training makes the reconstruction close to reliable observed values, then uses that structure to estimate missing entries.'
      ]
    },
    formulas: [
      {
        title: 'Autoencoder reconstruction loss',
        latex: String.raw`L(x, \hat{x}) = ||x - \sigma(W' \sigma(Wx + b) + b')||^2`,
        symbols: [
          { symbol: 'x', meaning: 'Noisy or incomplete input profile.' },
          { symbol: String.raw`\hat{x}`, meaning: 'Reconstructed profile.' },
          { symbol: 'W, b', meaning: 'Learned neural-network parameters.' },
          { symbol: String.raw`\sigma`, meaning: 'Nonlinear activation function.' }
        ]
      }
    ],
    tools: ['AutoRec', 'Variational Autoencoders', 'RecVAE', 'PyTorch', 'TensorFlow/Keras', 'NVIDIA Merlin', 'DeepDR', 'scVI/scANVI', 'DCA', 'MOFA+', 'Scanpy workflows']
  },
  {
    id: 'gnn',
    number: '6',
    title: 'Graph Neural Networks (GNN)',
    shortTitle: 'Graph Neural Networks',
    summary:
      'Update node embeddings by aggregating neighbor messages in movie graphs, molecule graphs, and protein networks.',
    terms: ['Morgan Fingerprint', 'PPI Network', 'Toxicity', 'Graph Convolution / Message Passing', 'Adjacency Matrix (A)', 'Self-Looped Adjacency (A + I)', 'Node Feature Matrix (H)', 'Degree Matrix (D)', 'Global Pooling'],
    movie: {
      intuition:
        '"Nodes update their own identity vectors by listening to and aggregating information from neighbors."',
      chartTitle: 'Movie GNN message passing',
      table: {
        title: 'GNN message-passing pseudocode',
        headers: ['Step', 'Movie graph example', 'Operation'],
        rows: [
          ['1', 'Actor + director nodes', 'neighbor_messages = SUM(features of neighbors)'],
          ['2', 'Inception node', 'combined = node.features + neighbor_messages'],
          ['3', 'Updated movie vector', 'node.features = NeuralNet(combined)'],
          ['4', 'Recommendation', 'rank graph-neighbor movie embeddings']
        ]
      },
      details: [
        'Graph Convolution / Message Passing means each node updates from nearby nodes.',
        'Actor and director nodes pass information into a movie node.',
        'The movie embedding updates after aggregation.',
        'Updated embeddings support graph-neighbor recommendations.'
      ]
    },
    bio: {
      intuition:
        '"A drug is a graph of atoms and bonds. Aggregate information across this graph to predict toxicity, binding, or side effects."',
      context:
        'Polypharmacy: multiple drugs can cause unexpected side effects because they interact with overlapping protein networks.',
      chartTitle: 'Bioinformatics GNN message passing',
      table: {
        title: 'Bio GNN message-passing example',
        headers: ['Step', 'Molecular graph example', 'Operation'],
        rows: [
          ['1', 'Carbon + nitrogen atoms -> oxygen', 'bond edges pass messages'],
          ['2', 'Oxygen atom', 'aggregate neighbor atom vectors'],
          ['3', 'Updated oxygen vector', 'apply ReLU / neural layer'],
          ['4', 'Whole molecule', 'global pooling -> toxicity prediction']
        ]
      },
      details: [
        'A is the adjacency matrix: which atoms are bonded.',
        'A self-looped adjacency matrix is usually A + I, so each node keeps its own information.',
        'H is the node feature matrix; D is the degree matrix.',
        'Global pooling turns all final atom embeddings into one drug embedding.',
        'Decagon-style GCNs use molecular and protein-network structure for side-effect prediction.'
      ]
    },
    formulas: [
      {
        title: 'GCN layer update',
        latex: String.raw`H^{(l+1)} = \sigma\left(\tilde{D}^{-\frac{1}{2}} \tilde{A} \tilde{D}^{-\frac{1}{2}} H^{(l)} W^{(l)}\right)`,
        symbols: [
          { symbol: 'A', meaning: 'Adjacency matrix: which nodes are connected by edges.' },
          { symbol: 'I', meaning: 'Identity matrix added to create self-connections.' },
          { symbol: String.raw`\tilde{A}`, meaning: 'Self-looped adjacency matrix, usually A + I.' },
          { symbol: 'D', meaning: 'Degree matrix: diagonal counts of node neighbors.' },
          { symbol: String.raw`\tilde{D}`, meaning: 'Degree matrix computed from self-looped adjacency.' },
          { symbol: String.raw`H^{(l)}`, meaning: 'Feature matrix at layer l.' },
          { symbol: String.raw`W^{(l)}`, meaning: 'Trainable weight matrix.' },
          { symbol: String.raw`\sigma`, meaning: 'Nonlinear activation such as ReLU.' },
          { symbol: String.raw`H^{(l+1)}`, meaning: 'Updated node features after message passing.' }
        ]
      }
    ],
    tools: ['PinSage-style graph recommenders', 'GraphSAGE', 'LightGCN', 'PyTorch Geometric', 'DGL', 'StellarGraph', 'Decagon', 'DeepChem', 'DGL-LifeSci', 'Chemprop', 'RDKit-backed pipelines']
  },
  {
    id: 'rl',
    number: '7',
    title: 'Reinforcement Learning (RL)',
    shortTitle: 'Reinforcement Learning',
    summary:
      'An agent takes actions, observes rewards, and updates its strategy, either for recommendation sequences or molecule generation.',
    terms: ['QED Score', 'Toxicity', 'Binding Affinity, Kd, and IC50', 'De Novo Drug Design'],
    movie: {
      intuition:
        '"The system is an agent playing a game. It recommends a sequence of items, observes engagement, and maximizes reward."',
      chartTitle: 'Movie RL algorithm flow',
      table: {
        title: 'Sample recommendation reward',
        headers: ['State', 'Action', 'Reward'],
        rows: [
          ['Sci-Fi profile', 'Show Inception', '+40 min'],
          ['Sci-Fi profile', 'Show Toy Story', '+2 min']
        ]
      },
      details: [
        'Action: show a recommendation.',
        'Reward: watch time or engagement.',
        'Policy updates toward better long-term recommendations.',
        'This is usually framed as Q-learning, contextual bandits, or a Markov Decision Process.'
      ]
    },
    bio: {
      intuition:
        '"Instead of recommending an existing drug, build a new one atom by atom and reward molecules that bind well and are not toxic."',
      context:
        'De novo drug design creates new molecular structures from scratch.',
      chartTitle: 'Bioinformatics RL algorithm flow',
      table: {
        title: 'Sample molecule reward',
        headers: ['State', 'Action', 'Reward terms'],
        rows: [
          ['Partial molecule', 'Add ring', 'affinity + QED - toxicity'],
          ['Partial molecule', 'Add atom', 'affinity - toxicity']
        ]
      },
      details: [
        'State can be the current molecule.',
        'Action can add an atom or bond.',
        'Reward can combine binding affinity, toxicity, synthetic accessibility, and QED.',
        'PPO-style systems such as GCPN optimize molecule-building policies with docking or property rewards.'
      ]
    },
    formulas: [
      {
        title: 'Bellman equation',
        latex: String.raw`Q(s, a) = \mathbb{E} [r_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a') | s_t = s, a_t = a]`,
        symbols: [
          { symbol: 's', meaning: 'Current state, such as the current partial molecule.' },
          { symbol: 'a', meaning: 'Current action, such as adding an atom.' },
          { symbol: String.raw`Q(s,a)`, meaning: 'Expected long-term value of action a in state s.' },
          { symbol: String.raw`\mathbb{E}`, meaning: 'Expected value; average over possible future paths.' },
          { symbol: String.raw`r_{t+1}`, meaning: 'Immediate reward after taking the action.' },
          { symbol: String.raw`\gamma`, meaning: 'Discount factor for future rewards.' },
          { symbol: String.raw`s_{t+1}`, meaning: 'Next state after the action.' },
          { symbol: String.raw`a'`, meaning: 'A possible next action from the next state.' },
          { symbol: String.raw`\max_{a'} Q(s_{t+1}, a')`, meaning: 'Best predicted future value after reaching the next state.' },
          { symbol: String.raw`s_t=s, a_t=a`, meaning: 'Condition: evaluate the case where current state and action match s and a.' }
        ]
      }
    ],
    tools: ['Contextual bandits', 'LinUCB', 'Thompson Sampling', 'Q-learning', 'MDP', 'DQN-style recommenders', 'Vowpal Wabbit', 'Ray RLlib', 'Microsoft Recommenders', 'PPO', 'GCPN', 'REINVENT', 'MolDQN', 'RationaleRL', 'GuacaMol', 'MOSES', 'RDKit', 'AutoDock Vina docking rewards']
  }
];

export const glossary: Record<string, GlossaryEntry> = {
  'DTI: Drug-Target Interaction': {
    definition: 'Whether a drug interacts with a biological target, usually a protein. It can be binary or continuous.',
    example: 'Drug A with Protein T4 is unknown, so the model predicts whether the missing matrix cell should be 1 or 0.',
    table: {
      title: 'Toy DTI matrix',
      headers: ['Drug', 'T1', 'T2', 'T3', 'T4'],
      rows: [['Drug A', '1', '1', '1', '?'], ['Drug B', '1', '1', '1', '1']]
    },
    visual: 'dti-matrix'
  },
  'Protein Target': {
    definition: 'A protein that a drug tries to bind, block, activate, or modify.',
    example: 'EGFR can be treated as a target node when predicting whether a molecule affects cell-growth signaling.',
    visual: 'protein-target'
  },
  Gene: {
    definition: 'A DNA instruction that can be used to make RNA and often a protein.',
    example: 'A disease-gene graph can connect Disease X -> Gene Y -> Protein Y.',
    visual: 'omics-profile'
  },
  'Binding Affinity, Kd, and IC50': {
    definition: 'Binding affinity describes drug-target strength. Lower Kd means tighter binding. Lower IC50 usually means stronger assay effect.',
    example: 'A lower Kd for Drug A and Protein T4 means stronger physical binding.',
    formula: String.raw`K_d = \frac{[D][T]}{[DT]}`,
    table: {
      title: 'Simple interpretation',
      headers: ['Measure', 'Meaning'],
      rows: [['Low Kd', 'Strong binding'], ['High Kd', 'Weak binding'], ['Low IC50', 'Strong assay effect']]
    },
    visual: 'binding-score'
  },
  SMILES: {
    definition: 'A text string for a molecule.',
    example: 'Ethanol is CCO, benzene is c1ccccc1, and aspirin is CC(=O)Oc1ccccc1C(=O)O.',
    table: {
      title: 'Example SMILES',
      headers: ['Molecule', 'Example SMILES'],
      rows: [
        ['Ethanol', 'CCO'],
        ['Benzene', 'c1ccccc1'],
        ['Aspirin', 'CC(=O)Oc1ccccc1C(=O)O']
      ]
    },
    visual: 'drug-a'
  },
  'Morgan Fingerprint': {
    definition: 'A binary vector describing circular atom neighborhoods, often computed with RDKit.',
    example: 'Toy fingerprint: 10110010, where each bit marks whether a chemical substructure is present.',
    table: {
      title: 'Toy fingerprint',
      headers: ['Bit', '0', '1', '2', '3', '4', '5', '6', '7'],
      rows: [['Drug A', '1', '0', '1', '1', '0', '0', '1', '0']]
    },
    visual: 'fingerprint'
  },
  'Tanimoto Coefficient': {
    definition: 'Similarity between binary chemical fingerprints: shared 1 bits divided by 1 bits in either vector.',
    example: 'If Drug A = 10110010 and Drug B = 10100010, they share 2 active bits and have 3 active bits in the union, so Tanimoto is 2/3 = 0.67.',
    formula: String.raw`T(A,B)=\frac{A \cdot B}{||A||^2 + ||B||^2 - A \cdot B}`,
    table: {
      title: 'Worked toy example',
      headers: ['Vector', 'Bits'],
      rows: [
        ['Drug A', '10110010'],
        ['Drug B', '10100010'],
        ['Shared 1 bits', '2'],
        ['Union 1 bits', '3'],
        ['Tanimoto', '2/3 = 0.67']
      ]
    },
    visual: 'similarity-score'
  },
  'TF-IDF': {
    definition: 'Term Frequency-Inverse Document Frequency. It weights words common in one document but uncommon across all documents.',
    example: 'In movie text, "dreams" may be important for Inception if it appears rarely in other movie profiles.',
    formula: String.raw`\text{tfidf}(t,d)=\text{tf}(t,d)\log\frac{N}{df(t)}`,
    table: {
      title: 'Movie keyword example',
      headers: ['Movie', 'Keywords', 'TF-IDF-like feature'],
      rows: [
        ['Inception', 'dreams, mind, Nolan', 'high weight on dreams'],
        ['Interstellar', 'space, time, Nolan', 'high weight on space']
      ]
    },
    visual: 'latent-vector'
  },
  'Omics Profile': {
    definition: 'A vector of biological measurements for a sample, patient, or cell.',
    example: 'TP53 = 8.2, EGFR = 2.1, MYC = 10.5, BRCA1 = 4.4.',
    table: {
      title: 'Mini profile',
      headers: ['Gene', 'TP53', 'EGFR', 'MYC', 'BRCA1'],
      rows: [['Patient 1', '8.2', '2.1', '10.5', '4.4']]
    },
    visual: 'omics-profile'
  },
  'RNA-seq': {
    definition: 'A sequencing method that measures which genes are active by counting RNA molecules.',
    example: 'A noisy RNA-seq vector can be denoised and reconstructed by an autoencoder.',
    visual: 'rna-noisy'
  },
  'Multi-Omics': {
    definition: 'Combines genomics, transcriptomics, proteomics, metabolomics, and clinical variables despite different scales and missing values.',
    example: 'One model may align DNA mutations, RNA expression, protein abundance, metabolites, and drug response.',
    table: {
      title: 'Layers',
      headers: ['Layer', 'What it measures', 'Example feature'],
      rows: [
        ['Genomics', 'DNA variants', 'BRAF V600E mutation'],
        ['Transcriptomics', 'RNA expression', 'EGFR expression = 2.1'],
        ['Proteomics', 'Protein abundance', 'Protein X high'],
        ['Metabolomics', 'Small molecules', 'Lactate high'],
        ['Clinical', 'Patient information', 'Age, stage, survival']
      ]
    },
    visual: 'multi-omics'
  },
  'PPI Network': {
    definition: 'Protein-protein interaction graph: proteins are nodes, physical or functional interactions are edges.',
    example: 'If Protein A interacts with Protein B, and Protein B is disease-related, graph methods can spread disease or drug relevance across that edge.',
    table: {
      title: 'Tiny PPI edge list',
      headers: ['Protein', 'Interaction', 'Protein'],
      rows: [
        ['Protein A', 'binds / regulates', 'Protein B'],
        ['Protein B', 'pathway neighbor', 'Protein C']
      ]
    },
    visual: 'ppi-network'
  },
  'Graph Convolution / Message Passing': {
    definition: 'A GNN update rule where each node receives messages from neighbors, aggregates them, and computes a new embedding.',
    example: 'In a molecule, an oxygen atom updates its vector after receiving messages from bonded carbon and nitrogen atoms.',
    table: {
      title: 'One message-passing layer',
      headers: ['Loop step', 'Meaning'],
      rows: [
        ['collect', 'read neighbor node features'],
        ['aggregate', 'sum or average neighbor messages'],
        ['update', 'combine old node state with aggregated message']
      ]
    },
    visual: 'message-passing'
  },
  'Adjacency Matrix (A)': {
    definition: 'A square matrix showing graph edges. A[i,j] = 1 means node i connects to node j.',
    example: 'For atoms C-O-N, A marks the C-O and O-N bonds before the GNN layer starts.',
    table: {
      title: 'Tiny adjacency',
      headers: ['Node', 'C', 'O', 'N'],
      rows: [
        ['C', '0', '1', '0'],
        ['O', '1', '0', '1'],
        ['N', '0', '1', '0']
      ]
    },
    visual: 'adjacency'
  },
  'Self-Looped Adjacency (A + I)': {
    definition: 'The adjacency matrix after adding identity matrix I, so every node keeps a connection to itself.',
    example: 'Without the self-loop, oxygen only receives neighbor messages. With A + I, oxygen also keeps its own oxygen feature vector during the update.',
    formula: String.raw`\tilde{A}=A+I`,
    visual: 'adjacency'
  },
  'Node Feature Matrix (H)': {
    definition: 'A table of node features. Each row is one node, and each column is a numeric feature used by the GNN.',
    example: 'An atom feature row may encode atom type, aromaticity, charge, and hydrogen count.',
    table: {
      title: 'Toy H matrix',
      headers: ['Node', 'is C', 'is O', 'is aromatic'],
      rows: [
        ['Atom C', '1', '0', '1'],
        ['Atom O', '0', '1', '0']
      ]
    },
    visual: 'node-feature-matrix'
  },
  'Degree Matrix (D)': {
    definition: 'A diagonal matrix where D[i,i] is the number of edges connected to node i. It normalizes neighbor aggregation.',
    example: 'If oxygen has two bonded neighbors, its degree entry is 2 before self-looping or 3 after adding its self-loop.',
    table: {
      title: 'Tiny degree matrix',
      headers: ['Node', 'C', 'O', 'N'],
      rows: [
        ['C', '1', '0', '0'],
        ['O', '0', '2', '0'],
        ['N', '0', '0', '1']
      ]
    },
    visual: 'degree'
  },
  'Global Pooling': {
    definition: 'A readout step that compresses all final node embeddings into one graph-level embedding.',
    example: 'After atom embeddings are updated, global pooling creates one drug vector for toxicity or side-effect prediction.',
    formula: String.raw`z_G=\text{POOL}(h_1,h_2,\ldots,h_n)`,
    visual: 'graph-pooling'
  },
  'Random Walk with Restart (RWR)': {
    definition: 'Repeatedly walks to neighboring nodes and restarts at the original node to keep rankings local.',
    example: 'RWR mixes two behaviors: with probability 1-c it walks through graph edges, and with probability c it jumps back to the start node. Restart prevents drift away from the disease or query protein.',
    formula: String.raw`p_{t+1}=(1-c)Wp_t+cp_0`,
    visual: 'rwr-transition'
  },
  'LMF, RLMF, and NRLMF': {
    definition: 'Logistic matrix factorization predicts binary interaction probabilities; RLMF regularizes it; NRLMF adds neighborhood regularization.',
    example: 'A sparse DTI matrix is decomposed into drug and protein latent vectors, then recombined into probabilities.',
    formula: String.raw`\hat{r}_{ui}=p_u q_i^T`,
    visual: 'als-factorization'
  },
  'QED Score': {
    definition: 'A score estimating how drug-like a molecule is from chemistry properties.',
    example: 'In RL drug design, QED can be one term in the reward along with binding and toxicity.',
    visual: 'qed-score'
  },
  Toxicity: {
    definition: 'The chance that a molecule causes harmful biological effects.',
    example: 'A GNN can predict toxicity or side effects from atom-bond structure.',
    visual: 'toxicity-score'
  },
  'Drug Repurposing': {
    definition: 'Finding a new disease use for an existing drug.',
    example: 'A matrix or graph model may suggest a known drug for a disease it was not originally developed for.',
    visual: 'binding-score'
  },
  'De Novo Drug Design': {
    definition: 'Designing a new molecule from scratch instead of selecting an existing one.',
    example: 'An RL agent starts from a partial molecule and adds atoms or bonds to improve reward.',
    visual: 'drug-new'
  }
};

