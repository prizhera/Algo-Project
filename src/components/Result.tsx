import { LanguageRecommendation } from '../types/types';
import styles from '../styles/Home.module.css';

interface ResultProps {
  recommendations: LanguageRecommendation[];
  onRestart: () => void;
}

export const Result = ({ recommendations, onRestart }: ResultProps) => {
  const topRecommendation = recommendations[0];
  const otherRecommendations = recommendations.slice(1, 4);

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.resultTitle}>Your Ideal Programming Language Is:</h2>
      
      <div className={styles.topRecommendation}>
        <div className={styles.languageIcon}>{topRecommendation.language.icon}</div>
        <h3 className={styles.languageName}>{topRecommendation.language.name}</h3>
        <p className={styles.languageDescription}>{topRecommendation.language.description}</p>
        
        <div className={styles.detailsSection}>
          <div className={styles.detailColumn}>
            <h4>Best For</h4>
            <ul>
              {topRecommendation.language.useCases.map(useCase => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.detailColumn}>
            <h4>Pros</h4>
            <ul>
              {topRecommendation.language.pros.map(pro => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.detailColumn}>
            <h4>Cons</h4>
            <ul>
              {topRecommendation.language.cons.map(con => (
                <li key={con}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {otherRecommendations.length > 0 && (
        <>
          <h3 className={styles.otherTitle}>Other Good Options:</h3>
          <div className={styles.otherRecommendations}>
            {otherRecommendations.map((rec) => (
              <div key={rec.language.id} className={styles.otherLanguage}>
                <div className={styles.otherLanguageIcon}>{rec.language.icon}</div>
                <h4>{rec.language.name}</h4>
                <p className={styles.matchScore}>Match: {Math.round(rec.score)}%</p>
              </div>
            ))}
          </div>
        </>
      )}

      <button className={styles.restartButton} onClick={onRestart}>
        Start Over
      </button>
    </div>
  );
};