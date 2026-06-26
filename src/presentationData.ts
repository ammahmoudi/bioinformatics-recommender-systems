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
      ['Rating (1-5 Stars)', 'Binding Affinity (Kd/IC50)', 'A score of how strongly a drug physically attaches to a protein. Lower Kd means stronger binding.'],
      ['Movie Genre / Actor', 'SMILES, Morgan Fingerprint', 'SMILES is a chemical string. A fingerprint is a binary feature vector.'],
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
        'A learned user vector and movie vector are compared with a dot product.'
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
        'RLMF/NRLMF predict probabilities for binary binding data.'
      ]
    },
    formulas: [
      {
        title: 'Prediction',
        latex: String.raw`\hat{r}_{ui} = p_u \cdot q_i^T`,
        explanation:
          'The predicted rating or interaction is calculated from the dot product of the learned user/drug vector and item/protein vector.',
        symbols: [
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
          { symbol: String.raw`P`, meaning: 'Matrix of learned user/drug vectors.' },
          { symbol: String.raw`Q`, meaning: 'Matrix of learned item/protein vectors.' },
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
        'TF-IDF can turn keywords into weighted vectors.'
      ]
    },
    bio: {
      intuition:
        '"Because Drug A inhibits Target X, Drug B, which has a similar chemical structure, may also inhibit Target X."',
      context:
        'Structural homology: molecules with similar shapes often perform similar biological functions.',
      chartTitle: 'Bioinformatics CBF algorithm flow',
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
          { symbol: String.raw`||A||, ||B||`, meaning: 'Vector lengths used for normalization.' }
        ]
      },
      {
        title: 'Tanimoto coefficient',
        latex: String.raw`T(A, B) = \frac{A \cdot B}{||A||^2 + ||B||^2 - A \cdot B}`,
        symbols: [
          { symbol: 'A', meaning: 'Binary fingerprint vector for Drug A.' },
          { symbol: 'B', meaning: 'Binary fingerprint vector for Drug B.' },
          { symbol: String.raw`A \cdot B`, meaning: 'Number of 1 bits shared by both molecules.' },
          { symbol: String.raw`T(A,B)`, meaning: 'Similarity score, usually between 0 and 1.' }
        ]
      }
    ],
    tools: ['TF-IDF', 'scikit-learn nearest neighbors', 'Elasticsearch more-like-this', 'RDKit Morgan fingerprints', 'Open Babel', 'PubChem similarity', 'ChEMBL similarity', 'SwissSimilarity', 'DeepPurpose']
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
      details: [
        'The recommender follows paths through the network.',
        'A short path can imply high recommendation relevance.',
        'Random-walk methods turn graph proximity into scores.'
      ]
    },
    bio: {
      intuition:
        '"Disease X is caused by Gene Y, which physically interacts with Protein Z. Recommend targets in the nearby biological neighborhood."',
      context:
        'PPI networks show which proteins physically or functionally interact in a cell.',
      chartTitle: 'Bioinformatics graph algorithm flow',
      details: [
        'Disease-gene prioritization uses Random Walk on Heterogeneous Networks.',
        'Restart keeps the score local to the starting node.',
        'Steady state is the stable final probability distribution.'
      ]
    },
    formulas: [
      {
        title: 'Random Walk with Restart',
        latex: String.raw`p_{t+1} = (1-c) W p_t + c p_0`,
        symbols: [
          { symbol: String.raw`p_0`, meaning: 'Starting probability vector.' },
          { symbol: String.raw`p_t`, meaning: 'Probability distribution after t steps.' },
          { symbol: 'W', meaning: 'Transition matrix over graph edges.' },
          { symbol: 'c', meaning: 'Restart probability.' },
          { symbol: 'Steady state', meaning: 'Final stable distribution; high-score nodes are close or strongly connected.' }
        ]
      }
    ],
    tools: ['PageRank', 'Personalized PageRank', 'Neo4j Graph Data Science', 'NetworkX', 'igraph', 'STRING', 'BioGRID', 'Cytoscape', 'Hetionet', 'OpenTargets']
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
      details: [
        'The model is trained to copy input to output through a bottleneck.',
        'Masked or corrupted entries teach reconstruction.',
        'The decoder fills missing ratings after training.'
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
        'Stacked Denoising Autoencoders reduce dimensionality while filtering noise.'
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
    terms: ['Morgan Fingerprint', 'PPI Network', 'Toxicity'],
    movie: {
      intuition:
        '"Nodes update their own identity vectors by listening to and aggregating information from neighbors."',
      chartTitle: 'Movie GNN message passing',
      details: [
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
      details: [
        'A is the adjacency matrix: which atoms are bonded.',
        'A self-looped adjacency matrix is usually A + I, so each node keeps its own information.',
        'H is the node feature matrix; D is the degree matrix.'
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
          { symbol: String.raw`H^{(l)}`, meaning: 'Feature matrix at layer l.' },
          { symbol: String.raw`W^{(l)}`, meaning: 'Trainable weight matrix.' }
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
      details: [
        'Action: show a recommendation.',
        'Reward: watch time or engagement.',
        'Policy updates toward better long-term recommendations.'
      ]
    },
    bio: {
      intuition:
        '"Instead of recommending an existing drug, build a new one atom by atom and reward molecules that bind well and are not toxic."',
      context:
        'De novo drug design creates new molecular structures from scratch.',
      chartTitle: 'Bioinformatics RL algorithm flow',
      details: [
        'State can be the current molecule.',
        'Action can add an atom or bond.',
        'Reward can combine binding affinity, toxicity, synthetic accessibility, and QED.'
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
          { symbol: String.raw`r_{t+1}`, meaning: 'Immediate reward after taking the action.' },
          { symbol: String.raw`\gamma`, meaning: 'Discount factor for future rewards.' },
          { symbol: String.raw`\max_{a'}`, meaning: 'Best predicted future action value.' }
        ]
      }
    ],
    tools: ['Contextual bandits', 'LinUCB', 'Thompson Sampling', 'DQN-style recommenders', 'Vowpal Wabbit', 'Ray RLlib', 'Microsoft Recommenders', 'PPO', 'GCPN', 'REINVENT', 'MolDQN', 'RationaleRL', 'GuacaMol', 'MOSES', 'RDKit', 'AutoDock Vina']
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
    example: 'If two molecules share many fingerprint bits, Tanimoto moves closer to 1.',
    formula: String.raw`T(A,B)=\frac{A \cdot B}{||A||^2 + ||B||^2 - A \cdot B}`,
    visual: 'similarity-score'
  },
  'TF-IDF': {
    definition: 'Term Frequency-Inverse Document Frequency. It weights words common in one document but uncommon across all documents.',
    example: 'In movie text, "dreams" may be important for Inception if it appears rarely in other movie profiles.',
    formula: String.raw`\text{tfidf}(t,d)=\text{tf}(t,d)\log\frac{N}{df(t)}`,
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
      headers: ['Layer', 'Example'],
      rows: [['Genomics', 'mutation'], ['Transcriptomics', 'RNA-seq'], ['Proteomics', 'protein abundance'], ['Clinical', 'drug response']]
    },
    visual: 'multi-omics'
  },
  'PPI Network': {
    definition: 'Protein-protein interaction graph: proteins are nodes, physical or functional interactions are edges.',
    example: 'If Protein A interacts with Protein B, a graph method can spread disease or drug relevance across that edge.',
    visual: 'ppi-network'
  },
  'Random Walk with Restart (RWR)': {
    definition: 'Repeatedly walks to neighboring nodes and restarts at the original node to keep rankings local.',
    example: 'Restart prevents the walk from drifting too far away from the disease or query protein.',
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

