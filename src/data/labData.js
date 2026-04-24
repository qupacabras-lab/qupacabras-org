export const personnel = [
  {
    role: "Principal Investigator",
    name: "Dr. Carlos M. Ortiz Marrero",
    summary: "Quantum algorithms, benchmarking, and machine learning.",
    focus:
      "Assistant Professor at Colorado State University and Joint Appointee at Pacific Northwest National Laboratory. PI within the DOE Co-design Center for Quantum Advantage (C2QA) at Brookhaven National Laboratory. His research spans quantum benchmarking via nonlocal games, the theory of barren plateaus in variational circuits, and quantum generative machine learning.",
    contact: [
      { label: "carlos.ortiz.marrero@colostate.edu", href: "mailto:carlos.ortiz.marrero@colostate.edu", type: "email" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=dQNjXX8AAAAJ", type: "scholar" },
      { label: "GitHub", href: "https://github.com/cmortiz", type: "github" },
    ],
    image: "/headshots/carlos-ortiz-marrero.jpg",
  },
  {
    role: "PhD Student",
    name: "Leo Rodolico",
    summary: "Quantum error correction and algorithms.",
    focus:
      "PhD student at Colorado State University. Working on quantum error correction protocols and quantum algorithm design under Dr. Ortiz Marrero.",
    contact: [
      { label: "leonardo.rodolico@colostate.edu", href: "mailto:leonardo.rodolico@colostate.edu", type: "email" },
      { label: "GitHub", href: "https://github.com/elredl", type: "github" },
    ],
    image: "/headshots/leo-rodolico.jpg",
  },
  {
    role: "Undergraduate Researcher",
    name: "Marco Rodriguez",
    summary: "Quantum benchmarking and lab outreach.",
    focus:
      "Undergraduate researcher at CSU contributing to quantum benchmarking experiments and science outreach programs run by the lab.",
    contact: [
      { label: "marco.rodriguez@colostate.edu", href: "mailto:marco.rodriguez@colostate.edu", type: "email" },
    ],
  },
  {
    role: "Research Collaborator",
    name: "Jim Furches",
    summary: "Quantum benchmarking and generative ML at PNNL.",
    focus:
      "Research collaborator at Pacific Northwest National Laboratory (PNNL), U.S. Department of Energy. Co-author on nonlocal game benchmarking (Quantum Science and Technology, 2025) and adaptive quantum generative training (IEEE QCE Best Paper, 2024).",
    image: "/headshots/jim-furches.jpg",
  },
];

export const formerPersonnel = [];

export const researchThrusts = [
  {
    title: "Quantum Benchmarking",
    summary:
      "We develop application-level benchmarks for quantum hardware using nonlocal game strategies. These benchmarks probe genuine quantum advantage by exceeding unconditional classical bounds, enabling rigorous cross-platform comparison across trapped-ion, superconducting, and neutral-atom processors.",
    topics: [
      "Nonlocal games as quantum advantage witnesses",
      "Cross-platform hardware validation",
      "Application-level quantum benchmarking protocols",
    ],
  },
  {
    title: "Variational Algorithms & Trainability",
    summary:
      "We study the theoretical foundations of variational quantum algorithms, with a focus on barren plateaus — exponential loss of gradient signal that makes training infeasible at scale. Our work includes a Lie algebraic characterization of barren plateaus and entanglement-induced trainability barriers.",
    topics: [
      "Lie algebraic theory of barren plateaus",
      "Entanglement-induced gradient vanishing",
      "ADAPT variational algorithms and unbounded loss functions",
    ],
  },
  {
    title: "Quantum Machine Learning",
    summary:
      "We design and analyze quantum generative models, including Rényi divergence-based training objectives and adaptive quantum generative training (ADAPT). Applications include generating approximate molecular ground states and evaluating quantum model quality.",
    topics: [
      "Quantum generative models with Rényi divergences",
      "Adaptive quantum generative training",
      "Quantum approaches to molecular ground state preparation",
    ],
  },
  {
    title: "Hybrid Quantum-Classical Computing",
    summary:
      "We develop software and theoretical frameworks for hybrid continuous-discrete variable (CV-DV) quantum computing systems, including the HybridLane SDK. This work bridges bosonic modes and qubit-based computation toward near-term quantum utility.",
    topics: [
      "Continuous-discrete variable quantum computing",
      "HybridLane SDK for hybrid quantum systems",
      "Quantum signal processing and Heisenberg-limited metrology",
    ],
  },
];

export const initiatives = [
  "Nonlocal games as cross-platform quantum benchmarks (trapped-ion, superconducting, neutral-atom)",
  "HybridLane SDK for hybrid continuous-discrete variable quantum computation",
  "Adaptive quantum generative training with unbounded loss objectives",
];

export const fundingPrograms = [
  {
    source: "U.S. Department of Energy",
    program: "Co-design Center for Quantum Advantage (C2QA)",
    details:
      "Carlos serves as PI within C2QA, a DOE National Quantum Information Science Research Center headquartered at Brookhaven National Laboratory. C2QA unites national labs, universities, and industry to advance superconducting qubit technology toward practical quantum advantage.",
  },
  {
    source: "Pacific Northwest National Laboratory",
    program: "Joint Appointee — Quantum Algorithms & ML Group",
    details:
      "Carlos holds a joint appointment at PNNL (U.S. Department of Energy), where he has collaborated on quantum benchmarking, quantum generative models, the HybridLane SDK, and several data science projects. This affiliation supports cross-disciplinary research bridging national lab infrastructure and university-led theory.",
  },
  {
    source: "Colorado State University",
    program: "Department of Computer Science — Startup & Research Support",
    details:
      "CSU Department of Computer Science supports Qupacabras as the lab's home institution, providing infrastructure, graduate student funding, and research facilities in Fort Collins, CO.",
  },
];

export const publications = [
  {
    year: 2025,
    venue: "Quantum Science and Technology",
    title:
      "Application-level Benchmarking of Quantum Computers using Nonlocal Game Strategies",
    summary:
      "We introduce a family of application-level benchmarks for quantum hardware based on nonlocal game strategies. The benchmarks certify quantum advantage by testing whether devices can exceed unconditional classical bounds, and are demonstrated on trapped-ion and superconducting platforms.",
    href: "https://iopscience.iop.org/article/10.1088/2058-9565/adf1c0",
    funders: ["U.S. Department of Energy", "Pacific Northwest National Laboratory"],
  },
  {
    year: 2024,
    venue: "IEEE QCE (Best Paper Award)",
    title: "Adaptive Quantum Generative Training using an Unbounded Loss Function",
    summary:
      "We propose an adaptive variational approach to quantum generative training using an unbounded Rényi divergence loss. The method avoids barren plateaus by growing the ansatz adaptively, achieving better convergence than fixed-circuit alternatives on generative tasks.",
    href: "https://ieeexplore.ieee.org/abstract/document/10821301",
    funders: ["U.S. Department of Energy", "Pacific Northwest National Laboratory"],
  },
  {
    year: 2024,
    venue: "Nature Communications",
    title:
      "A Lie Algebraic Theory of Barren Plateaus for Deep Parameterized Quantum Circuits",
    summary:
      "We develop a unified Lie algebraic framework that predicts the presence or absence of barren plateaus in parameterized quantum circuits. The theory unifies and extends prior results, providing design principles for trainable variational architectures.",
    href: "https://www.nature.com/articles/s41467-024-49909-3",
    funders: ["U.S. Department of Energy"],
  },
  {
    year: 2023,
    venue: "Transactions on Machine Learning Research",
    title: "Using Skew to Assess the Quality of GAN-generated Image Features",
    summary:
      "We show that skewness of feature distributions provides a reliable signal for evaluating generative adversarial network quality, complementing existing metrics such as FID. The measure is computationally lightweight and correlates with perceptual quality.",
    href: "https://openreview.net/pdf?id=Io3jDUC4DP",
    funders: ["Pacific Northwest National Laboratory"],
  },
  {
    year: 2021,
    venue: "PRX Quantum",
    title: "Entanglement Induced Barren Plateaus",
    summary:
      "We prove that highly entangled quantum states lead to exponentially vanishing gradients in variational quantum algorithms, establishing entanglement as a fundamental source of barren plateaus. The result provides rigorous guidance for ansatz design in near-term quantum computing.",
    href: "https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.2.040316",
    funders: ["Pacific Northwest National Laboratory"],
  },
  {
    year: 2020,
    venue: "EPJ Data Science",
    title: "Hypernetwork Science via High-Order Hypergraph Walks",
    summary:
      "We generalize network science tools to hypergraphs using high-order walks, enabling analysis of multi-way relationships in complex systems. The framework is applied to co-authorship, biological, and social hypergraph data.",
    href: "https://doi.org/10.1140/epjds/s13688-020-00231-0",
    funders: ["Pacific Northwest National Laboratory"],
  },
];
