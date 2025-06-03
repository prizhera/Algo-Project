import { Language, Question, LanguageRecommendation } from '../types/types';

export const evaluatePath = (
  currentQuestionId: string,
  questions: Question[],
  selectedOptions: Record<string, string>,
  languages: Language[],
  currentScores: Record<string, number> = {}
): LanguageRecommendation[] => {

  const scores = Object.keys(currentScores).length === 0
    ? Object.fromEntries(languages.map(lang => [lang.id, 0]))
    : { ...currentScores };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  if (!currentQuestion) return [];

  const selectedOptionKey = selectedOptions[currentQuestionId];
  if (!selectedOptionKey) return [];

  const selectedOption = currentQuestion.options.find(opt => opt.text === selectedOptionKey);
  if (!selectedOption) return [];

  for (const [langId, weight] of Object.entries(selectedOption.languageWeights)) {
    if (scores.hasOwnProperty(langId)) {
      scores[langId] += weight || 0;
    }
  }

  if (!selectedOption.nextQuestionId) {
    return Object.entries(scores)
      .map(([id, score]) => ({
        language: languages.find(l => l.id === id)!,
        score
      }))
      .sort((a, b) => b.score - a.score);
  }

  return evaluatePath(
    selectedOption.nextQuestionId,
    questions,
    selectedOptions,
    languages,
    scores
  );
};