import { Question as QuestionType } from '../types/types';
import styles from '../styles/Home.module.css';

interface QuestionProps {
  question: QuestionType;
  onSelect: (option: string) => void;
  selectedOption?: string;
}

export const Question = ({ question, onSelect, selectedOption }: QuestionProps) => {
  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.questionText}>{question.text}</h2>
      <div className={styles.optionsContainer}>
        {question.options.map((option) => (
          <button
            key={option.text}
            className={`${styles.optionButton} ${selectedOption === option.text ? styles.selected : ''}`}
            onClick={() => onSelect(option.text)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};