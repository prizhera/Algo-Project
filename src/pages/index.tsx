import { useState } from 'react';
import { Question } from '../components/Question';
import { Result } from '../components/Result';
import { evaluatePath } from '../utils/dfs';
import { Language, LanguageRecommendation, Question as QuestionType } from '../types/types';
import styles from '../styles/Home.module.css';


 // all languages
const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'A versatile, high-level programming language known for its readability and extensive libraries.',
    pros: ['Easy to learn', 'Large community', 'Extensive libraries'],
    cons: ['Slower than compiled languages', 'Not ideal for mobile development'],
    useCases: ['Data Science', 'Web Development', 'Automation'],
    difficulty: 'Beginner',
    popularity: 1,
    icon: '🐍',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'The language of the web, essential for front-end development and increasingly used on the server-side.',
    pros: ['Runs everywhere', 'Huge ecosystem', 'Asynchronous by nature'],
    cons: ['Dynamic typing can lead to errors', 'Browser inconsistencies'],
    useCases: ['Web Development', 'Mobile Apps', 'Server-side'],
    difficulty: 'Beginner',
    popularity: 2,
    icon: '📜',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript with optional static typing.',
    pros: ['Type safety', 'Better tooling', 'Gradual adoption'],
    cons: ['Additional compilation step', 'Learning curve for types'],
    useCases: ['Large-scale applications', 'Enterprise development', 'Teams'],
    difficulty: 'Intermediate',
    popularity: 5,
    icon: '🅰️',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'A mature, object-oriented language known for its "write once, run anywhere" capability.',
    pros: ['Platform independent', 'Strong typing', 'Huge ecosystem'],
    cons: ['Verbose syntax', 'Memory intensive'],
    useCases: ['Enterprise applications', 'Android apps', 'Big Data'],
    difficulty: 'Intermediate',
    popularity: 3,
    icon: '☕',
  },
  {
    id: 'csharp',
    name: 'C#',
    description: 'A modern, object-oriented language developed by Microsoft with a strong type system.',
    pros: ['Great for Windows development', 'Excellent tooling', 'Versatile'],
    cons: ['Less cross-platform than others', 'Microsoft ecosystem'],
    useCases: ['Game Development', 'Enterprise Software', 'Windows Apps'],
    difficulty: 'Intermediate',
    popularity: 6,
    icon: '#️⃣',
  },
  {
    id: 'rust',
    name: 'Rust',
    description: 'A systems programming language focused on safety, speed, and concurrency.',
    pros: ['Memory safety', 'Blazing fast', 'Great concurrency'],
    cons: ['Steep learning curve', 'Long compile times'],
    useCases: ['System programming', 'Game engines', 'Blockchain'],
    difficulty: 'Advanced',
    popularity: 14,
    icon: '🦀',
  },
  {
    id: 'go',
    name: 'Go',
    description: 'A statically typed, compiled language developed by Google with a focus on simplicity and efficiency.',
    pros: ['Fast compilation', 'Great for concurrency', 'Simple syntax'],
    cons: ['Less expressive', 'Younger ecosystem'],
    useCases: ['Cloud services', 'CLI tools', 'Networking'],
    difficulty: 'Intermediate',
    popularity: 9,
    icon: '🚀',
  },
  {
    id: 'swift',
    name: 'Swift',
    description: 'A modern, fast language developed by Apple for iOS and macOS development.',
    pros: ['Clean syntax', 'Great performance', 'Apple ecosystem'],
    cons: ['Limited to Apple platforms', 'Frequent changes'],
    useCases: ['iOS Apps', 'macOS Apps', 'Mobile Development'],
    difficulty: 'Intermediate',
    popularity: 10,
    icon: '🐦',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    description: 'A modern language that runs on the JVM, fully interoperable with Java and great for Android.',
    pros: ['Concise syntax', 'Java interoperability', 'Official Android language'],
    cons: ['Smaller community than Java', 'JVM limitations'],
    useCases: ['Android Development', 'Backend Services', 'Cross-platform'],
    difficulty: 'Intermediate',
    popularity: 11,
    icon: '🅺',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    description: 'A dynamic, open source language with a focus on simplicity and productivity.',
    pros: ['Elegant syntax', 'Great for prototyping', 'Strong community'],
    cons: ['Performance limitations', 'Less popular than Python'],
    useCases: ['Web Development', 'Scripting', 'DevOps'],
    difficulty: 'Beginner',
    popularity: 12,
    icon: '♦️',
  },
  {
    id: 'php',
    name: 'PHP',
    description: 'A server-side scripting language especially suited to web development.',
    pros: ['Huge web ecosystem', 'Easy deployment', 'Many CMS options'],
    cons: ['Inconsistent standard library', 'Security concerns'],
    useCases: ['Web Development', 'WordPress', 'Server-side'],
    difficulty: 'Beginner',
    popularity: 7,
    icon: '🐘',
  },
  {
    id: 'r',
    name: 'R',
    description: 'A language and environment for statistical computing and graphics.',
    pros: ['Excellent for statistics', 'Great visualization', 'Many packages'],
    cons: ['Slow performance', 'Steep learning curve'],
    useCases: ['Data Analysis', 'Statistics', 'Academic Research'],
    difficulty: 'Intermediate',
    popularity: 15,
    icon: '📊',
  },
  {
    id: 'scala',
    name: 'Scala',
    description: 'A modern multi-paradigm language combining object-oriented and functional programming.',
    pros: ['Concise syntax', 'Functional features', 'JVM compatibility'],
    cons: ['Complex type system', 'Steep learning curve'],
    useCases: ['Big Data', 'Distributed Systems', 'Backend Services'],
    difficulty: 'Advanced',
    popularity: 13,
    icon: '⚡',
  },
  {
    id: 'dart',
    name: 'Dart',
    description: 'A client-optimized language for fast apps on multiple platforms, developed by Google.',
    pros: ['Great for Flutter', 'Fast development', 'Cross-platform'],
    cons: ['Smaller community', 'Limited outside Flutter'],
    useCases: ['Mobile Apps', 'Cross-platform', 'Web Apps'],
    difficulty: 'Intermediate',
    popularity: 8,
    icon: '🎯',
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'A powerful general-purpose programming language with low-level memory manipulation capabilities.',
    pros: ['High performance', 'Close to hardware', 'Widely used'],
    cons: ['Complex syntax', 'Memory management'],
    useCases: ['Game Development', 'System Programming', 'High-performance Apps'],
    difficulty: 'Advanced',
    popularity: 4,
    icon: '➕➕',
  }
];

const questions: QuestionType[] = [
  {
    id: '1',
    text: 'What is your primary goal for learning programming?',
    options: [
      {
        text: 'Build websites or web applications',
        nextQuestionId: '2',
        languageWeights: { javascript: 5, typescript: 4, python: 3, php: 4, ruby: 3 }
      },
      {
        text: 'Develop mobile applications',
        nextQuestionId: '3',
        languageWeights: { javascript: 4, swift: 5, kotlin: 5, dart: 4 }
      },
      {
        text: 'Work with data science/AI',
        nextQuestionId: '4',
        languageWeights: { python: 5, r: 4}
      },
      {
        text: 'Create system/performance-critical applications',
        nextQuestionId: '5',
        languageWeights: { rust: 5, cpp: 5, go: 4 }
      },
      {
        text: 'General purpose programming',
        nextQuestionId: '6',
        languageWeights: { python: 4, java: 4, csharp: 4, go: 3 }
      }
    ]
  },
  // web dev paths
  {
    id: '2',
    text: 'What aspect of web development interests you most?',
    options: [
      {
        text: 'Front-end (user interfaces)',
        nextQuestionId: '2a',
        languageWeights: { javascript: 5, typescript: 4 }
      },
      {
        text: 'Back-end (server logic)',
        nextQuestionId: '2b',
        languageWeights: { python: 4, java: 4, php: 3, ruby: 3 }
      },
      {
        text: 'Full-stack (both front and back end)',
        nextQuestionId: '2c',
        languageWeights: { javascript: 4, typescript: 4, python: 3 }
      }
    ]
  },
  {
    id: '2a',
    text: 'How important is type safety for your project?',
    options: [
      {
        text: 'Very important',
        nextQuestionId: null,
        languageWeights: { typescript: 5 }
      },
      {
        text: 'Somewhat important',
        nextQuestionId: null,
        languageWeights: { typescript: 3, javascript: 4 }
      },
      {
        text: 'Not important',
        nextQuestionId: null,
        languageWeights: { javascript: 5 }
      }
    ]
  },
  {
    id: '2b',
    text: 'What kind of back-end performance do you need?',
    options: [
      {
        text: 'High performance is critical',
        nextQuestionId: null,
        languageWeights: { go: 5, java: 4, rust: 4 }
      },
      {
        text: 'Moderate performance is fine',
        nextQuestionId: null,
        languageWeights: { python: 4, ruby: 3, php: 3 }
      },
      {
        text: 'Developer productivity is more important',
        nextQuestionId: null,
        languageWeights: { python: 5, ruby: 4 }
      }
    ]
  },
  {
    id: '2c',
    text: 'Do you prefer static or dynamic typing?',
    options: [
      {
        text: 'Static typing',
        nextQuestionId: null,
        languageWeights: { typescript: 5, java: 4 }
      },
      {
        text: 'Dynamic typing',
        nextQuestionId: null,
        languageWeights: { javascript: 5, python: 4 }
      },
      {
        text: 'Not sure',
        nextQuestionId: null,
        languageWeights: { typescript: 3, javascript: 3, python: 3 }
      }
    ]
  },
  // mobile dev paths
  {
    id: '3',
    text: 'Which mobile platforms are you targeting?',
    options: [
      {
        text: 'iOS only',
        nextQuestionId: null,
        languageWeights: { swift: 5 }
      },
      {
        text: 'Android only',
        nextQuestionId: null,
        languageWeights: { kotlin: 5, java: 4 }
      },
      {
        text: 'Both iOS and Android',
        nextQuestionId: '3a',
        languageWeights: { javascript: 4, dart: 4 }
      },
      {
        text: 'Cross-platform (including web/desktop)',
        nextQuestionId: null,
        languageWeights: { dart: 5, javascript: 4 }
      }
    ]
  },
  {
    id: '3a',
    text: 'For cross-platform, do you prefer native-like performance?',
    options: [
      {
        text: 'Yes, performance is critical',
        nextQuestionId: null,
        languageWeights: { dart: 5 }
      },
      {
        text: 'No, developer experience is more important',
        nextQuestionId: null,
        languageWeights: { javascript: 5 }
      }
    ]
  },
  // data science stuff
  {
    id: '4',
    text: 'What kind of data work interests you most?',
    options: [
      {
        text: 'Machine Learning/AI',
        nextQuestionId: null,
        languageWeights: { python: 5, julia: 3 }
      },
      {
        text: 'Statistical analysis',
        nextQuestionId: null,
        languageWeights: { r: 6, python: 4 }
      },
      {
        text: 'Data engineering',
        nextQuestionId: null,
        languageWeights: { python: 5, java: 4, scala: 3 }
      },
      {
        text: 'Data visualization',
        nextQuestionId: null,
        languageWeights: { python: 4, r: 5, javascript: 3 }
      }
    ]
  },
  // sys programming pathsd 
  {
    id: '5',
    text: 'What level of control do you need over system resources?',
    options: [
      {
        text: 'Maximum control (e.g., OS development)',
        nextQuestionId: null,
        languageWeights: { rust: 5, cpp: 5 }
      },
      {
        text: 'High performance with safety',
        nextQuestionId: null,
        languageWeights: { rust: 5, go: 4 }
      },
      {
        text: 'Concurrent systems',
        nextQuestionId: null,
        languageWeights: { go: 5, rust: 4 }
      }
    ]
  },
  // general purpose paths
  {
    id: '6',
    text: 'What kind of projects do you envision working on?',
    options: [
      {
        text: 'Enterprise/business applications',
        nextQuestionId: null,
        languageWeights: { java: 5, csharp: 5, python: 3 }
      },
      {
        text: 'Game development',
        nextQuestionId: null,
        languageWeights: { csharp: 5, cpp: 4 }
      },
      {
        text: 'Cloud/distributed systems',
        nextQuestionId: null,
        languageWeights: { go: 5, java: 4, python: 3 }
      },
      {
        text: 'Scripting/automation',
        nextQuestionId: null,
        languageWeights: { python: 5, ruby: 4 }
      }
    ]
  }
];

export default function Home() {
  const [currentQuestionId, setCurrentQuestionId] = useState('1');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<LanguageRecommendation[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  const handleSelectOption = (optionText: string) => {
    if (!currentQuestion) return;

    const selectedOption = currentQuestion.options.find(opt => opt.text === optionText);
    if (!selectedOption) return;

    const newSelectedOptions = {
      ...selectedOptions,
      [currentQuestionId]: optionText,
    };

    if (!selectedOption.nextQuestionId) {
      const results = evaluatePath(
        '1', 
        questions,
        newSelectedOptions,
        languages
      );
      setRecommendations(results);
      setShowResult(true);
    } else {
      setCurrentQuestionId(selectedOption.nextQuestionId);
      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionId('1');
    setSelectedOptions({});
    setRecommendations([]);
    setShowResult(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Programming Language Recommender</h1>
        <p className={styles.subtitle}>Find your perfect programming language match</p>
      </header>

      <main className={styles.main}>
        {showResult ? (
          <Result recommendations={recommendations} onRestart={handleRestart} />
        ) : currentQuestion ? (
          <Question
            question={currentQuestion}
            onSelect={handleSelectOption}
            selectedOption={selectedOptions[currentQuestionId]}
          />
        ) : (
          <p>No questions available</p>
        )}
      </main>
    </div>
  );
}