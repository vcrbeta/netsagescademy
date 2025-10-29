import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCw } from 'lucide-react';
import theme from '../styles/theme';

const QuizView = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_answer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmitted(true);
    if (onComplete) onComplete(score);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div>
      {submitted && (
        <div style={{
          background: theme.gradients.primary,
          color: theme.colors.white,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.md,
          marginBottom: theme.spacing.lg,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: theme.fonts.sizes.xl }}>
            Quiz Complete!
          </h3>
          <p style={{ margin: 0, fontSize: theme.fonts.sizes.lg, fontWeight: '600' }}>
            Your Score: {calculateScore()}%
          </p>
        </div>
      )}

      {questions.map((q, idx) => {
        const userAnswer = answers[idx];
        const showResult = submitted;

        return (
          <div 
            key={idx}
            style={{ 
              background: `${theme.colors.lightBlue}14`,
              borderRadius: theme.borderRadius.md,
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: `1px solid ${theme.colors.lightBlue}`
            }}
          >
            <h4 style={{ 
              color: theme.colors.darkNavy, 
              marginTop: 0,
              fontSize: theme.fonts.sizes.base
            }}>
              Question {idx + 1}
            </h4>
            <p style={{ 
              color: theme.colors.black, 
              fontSize: theme.fonts.sizes.md, 
              marginBottom: theme.spacing.md,
              lineHeight: '1.6'
            }}>
              {q.question}
            </p>
            
            {q.options.map((option, optIdx) => {
              const isThisSelected = userAnswer === option;
              const isThisCorrect = option === q.correct_answer;
              
              let borderColor = theme.colors.lightBlue;
              let backgroundColor = theme.colors.white;
              
              if (showResult) {
                if (isThisCorrect) {
                  borderColor = '#10b981';
                  backgroundColor = '#ecfdf5';
                } else if (isThisSelected) {
                  borderColor = '#ef4444';
                  backgroundColor = '#fee2e2';
                }
              } else if (isThisSelected) {
                borderColor = theme.colors.mediumBlue;
                backgroundColor = '#e0f2fe';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => !submitted && setAnswers({...answers, [idx]: option})}
                  disabled={submitted}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: theme.spacing.sm,
                    marginBottom: '0.75rem',
                    border: `2px solid ${borderColor}`,
                    background: backgroundColor,
                    borderRadius: theme.borderRadius.sm,
                    cursor: submitted ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: theme.fonts.sizes.base,
                    color: theme.colors.black,
                    transition: 'all 0.2s',
                    fontFamily: theme.fonts.body
                  }}
                >
                  {showResult && isThisCorrect && <CheckCircle size={20} color="#10b981" />}
                  {showResult && isThisSelected && !isThisCorrect && <XCircle size={20} color="#ef4444" />}
                  {option}
                </button>
              );
            })}
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.lg }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              background: allAnswered ? theme.colors.mediumBlue : theme.colors.lightBlue,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '600',
              cursor: allAnswered ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: theme.fonts.body,
              transition: 'all 0.2s'
            }}
          >
            Submit Quiz
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              background: theme.colors.lightBlue,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: theme.fonts.body
            }}
          >
            <RotateCw size={20} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;