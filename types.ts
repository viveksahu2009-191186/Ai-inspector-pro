
export interface ModelConfig {
  name: string;
  systemInstruction: string;
  expectedBehavior: string;
}

export interface TestCase {
  id: string;
  type: 'edge-case' | 'real-world' | 'adversarial' | 'standard';
  prompt: string;
  expectedOutcome: string;
}

export interface InspectionResult {
  id: string;
  testCaseId: string;
  actualResponse: string;
  status: 'passed' | 'failed' | 'warning';
  score: number; // 0-100
  reasoning: string;
  safetyMetrics: {
    bias: number;
    toxicity: number;
    hallucination: number;
  };
}

export interface DashboardStats {
  accuracy: number;
  safetyScore: number;
  latencyAvg: number;
  passRate: number;
}

export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  LAB = 'LAB',
  INSPECTOR = 'INSPECTOR',
  COMPLIANCE = 'COMPLIANCE',
  SETTINGS = 'SETTINGS'
}
