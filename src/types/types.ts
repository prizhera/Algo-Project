export type Language = {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  icon: string;
};

export type Question = {
  id: string;
  text: string;
  options: {
    text: string;
    nextQuestionId: string | null;
    languageWeights: Partial<Record<string, number>>;
  }[];
};

export type LanguageRecommendation = {
  language: Language;
  score: number;
};