export interface Person {
  id: number;
  name: string;
  role: string;
}

export interface Evaluation {
  ratings: Record<number, number>;
  openAnswers: Record<number, string>;
  isComplete: boolean;
}

export type Step = 'landing' | 'selector' | 'rating' | 'open' | 'completion';