export const TONE_CATEGORIES = {
  GASLIGHTING: {
    id: 'gaslighting',
    label: 'Gaslighting',
    description: 'Denying reality, shifting blame, or making the user doubt their perception.',
    color: '#ef4444', // red-500
  },
  INFANTILIZING: {
    id: 'infantilizing',
    label: 'Infantilizing',
    description: 'Condescending tone, over-simplification, or treating the user like a child.',
    color: '#f59e0b', // amber-500
  },
  DE_ESCALATION: {
    id: 'de_escalation',
    label: 'Forced De-escalation',
    description: 'Dismissive neutrality, tone-policing, or avoiding accountability through scripts.',
    color: '#3b82f6', // blue-500
  },
  KAREN_TRIGGER: {
    id: 'karen_trigger',
    label: 'Karen Triggers',
    description: 'Passive-aggressive entitlement, bureaucratic stonewalling, or moralizing.',
    color: '#8b5cf6', // violet-500
  }
} as const;

export const TRIGGER_WORDS = [
  "As an AI language model",
  "I understand you're frustrated",
  "Actually,",
  "It's important to remember",
  "Perhaps you misunderstood",
  "I'm sorry you feel that way",
  "Let's take a step back",
  "I'm here to help, but",
  "I cannot fulfill this request",
  "Safety guidelines",
  "My programming prevents",
  "It seems there is a misunderstanding",
  "You might want to consider",
  "For your own safety",
  "I encourage you to",
  "While I appreciate your",
  "It is not appropriate to",
  "I must insist",
  "Let's keep this professional",
  "I'm simply pointing out",
  "You appear to be",
  "Calm down",
  "Take a deep breath",
  "In the interest of",
];

export const BASE_STYLES = [
  {
    style: "Default",
    diagnostic: "The \"Karen\" Baseline. Balanced but prone to lecturing.",
    use: "General Q&A.",
    karenWarning: true
  },
  {
    style: "Professional",
    diagnostic: "High structure, formal, uses industry jargon.",
    use: "Reports, business emails, and SOPs."
  },
  {
    style: "Friendly",
    diagnostic: "Highest Karen Risk. Uses \"Listener\" and \"Empathy\" loops.",
    use: "Casual chat (Avoid for research).",
    karenWarning: true
  },
  {
    style: "Candid",
    diagnostic: "The Anti-Waffle. 16% shorter, cuts preambles.",
    use: "Quick answers and fact-checking."
  },
  {
    style: "Cynical",
    diagnostic: "Irreverent, challenges assumptions, sharp wit.",
    use: "Strategic provocations and \"shade.\""
  },
  {
    style: "Nerdy",
    diagnostic: "Literal, data-dense, uses creative metaphors.",
    use: "Learning complex technical concepts."
  },
  {
    style: "Efficient",
    diagnostic: "Stripped-back, no \"fluff,\" purely actionable.",
    use: "High-speed workflows."
  },
  {
    style: "Quirky",
    diagnostic: "Playful, imaginative, uses offbeat observations.",
    use: "Creative brainstorming."
  }
];
