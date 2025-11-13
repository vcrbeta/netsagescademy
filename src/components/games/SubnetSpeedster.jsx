import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Zap, Target, Clock } from 'lucide-react';import theme from '../../styles/theme';

const SubnetSpeedster = () => {
  const [gameMode, setGameMode] = useState('menu'); // menu, playing, results
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState({ network: '', broadcast: '', firstHost: '', lastHost: '', hosts: '' });
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalQuestions] = useState(10);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);

  // Generate random subnetting question based on difficulty
  const generateQuestion = (diff) => {
    const difficulties = {
      easy: {
        classes: ['C'],
        masks: ['/24', '/25', '/26', '/27'],
        description: 'Class C networks with common masks'
      },
      medium: {
        classes: ['B', 'C'],
        masks: ['/20', '/21', '/22', '/23', '/24', '/25', '/26', '/27', '/28'],
        description: 'Mixed classes with various masks'
      },
      hard: {
        classes: ['A', 'B', 'C'],
        masks: ['/16', '/17', '/18', '/19', '/20', '/21', '/22', '/23', '/24', '/25', '/26', '/27', '/28', '/29', '/30'],
        description: 'All classes with challenging masks'
      }
    };

    const config = difficulties[diff];
    const mask = config.masks[Math.floor(Math.random() * config.masks.length)];
    const maskBits = parseInt(mask.substring(1));
    
    // Generate appropriate IP based on difficulty
    let baseIP;
    if (config.classes.includes('C')) {
      baseIP = `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    } else if (config.classes.includes('B')) {
      baseIP = `172.${16 + Math.floor(Math.random() * 16)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    } else {
      baseIP = `10.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    // Calculate correct answers
    const correctAnswers = calculateSubnet(baseIP, maskBits);

    return {
      ip: baseIP,
      mask: mask,
      maskBits: maskBits,
      correctAnswers: correctAnswers,
      difficulty: diff
    };
  };

  // Calculate subnet details
  const calculateSubnet = (ip, maskBits) => {
    const ipParts = ip.split('.').map(Number);
    const hostBits = 32 - maskBits;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = totalHosts - 2;
    
    // Calculate subnet mask
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.max(0, Math.min(8, maskBits - (i * 8)));
      mask.push(256 - Math.pow(2, 8 - bits));
    }

    // Calculate network address
    const network = ipParts.map((octet, i) => octet & mask[i]);
    
    // Calculate broadcast address
    const broadcast = network.map((octet, i) => {
      const hostMask = 255 - mask[i];
      return octet | hostMask;
    });

    // Calculate first and last host
    const firstHost = [...network];
    firstHost[3] += 1;
    
    const lastHost = [...broadcast];
    lastHost[3] -= 1;

    return {
      network: network.join('.'),
      broadcast: broadcast.join('.'),
      firstHost: firstHost.join('.'),
      lastHost: lastHost.join('.'),
      hosts: usableHosts.toString()
    };
  };

  // Start game
  const startGame = (diff) => {
    setDifficulty(diff);
    setGameMode('playing');
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setQuestionNumber(1);
    setQuestionsAnswered([]);
    setTimeLeft(diff === 'easy' ? 90 : diff === 'medium' ? 75 : 60);
    setCurrentQuestion(generateQuestion(diff));
    setAnswers({ network: '', broadcast: '', firstHost: '', lastHost: '', hosts: '' });
    setFeedback(null);
  };

  // Timer countdown
  useEffect(() => {
    if (gameMode === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameMode === 'playing') {
      endGame();
    }
  }, [timeLeft, gameMode]);

  // Check answer
  const checkAnswer = () => {
    if (!currentQuestion) return;

    const correct = 
      answers.network === currentQuestion.correctAnswers.network &&
      answers.broadcast === currentQuestion.correctAnswers.broadcast &&
      answers.firstHost === currentQuestion.correctAnswers.firstHost &&
      answers.lastHost === currentQuestion.correctAnswers.lastHost &&
      answers.hosts === currentQuestion.correctAnswers.hosts;

    const points = correct ? (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 25) : 0;
    const bonusPoints = correct && streak >= 3 ? 10 : 0;

    setQuestionsAnswered([...questionsAnswered, {
      question: currentQuestion,
      userAnswers: { ...answers },
      correct: correct,
      points: points + bonusPoints
    }]);

    if (correct) {
      setScore(score + points + bonusPoints);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      setFeedback({ type: 'success', message: `Correct! +${points + bonusPoints} points!` });
    } else {
      setStreak(0);
      setFeedback({ type: 'error', message: 'Not quite! Try the next one!' });
    }

    // Move to next question or end game
    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        endGame();
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  // Next question
  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
    setCurrentQuestion(generateQuestion(difficulty));
    setAnswers({ network: '', broadcast: '', firstHost: '', lastHost: '', hosts: '' });
    setFeedback(null);
  };

  // End game
  const endGame = () => {
    setGameMode('results');
  };

  // Input handlers
  const handleInputChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  // Render menu
  if (gameMode === 'menu') {
    return (
      <div style={{
        padding: theme.spacing.xl,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        border: `3px solid ${theme.colors.mediumBlue}`,
        boxShadow: theme.shadows.large
      }}>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
          <h2 style={{
            margin: 0,
            fontSize: theme.fonts.sizes.xxl,
            color: theme.colors.navy,
            marginBottom: '1rem'
          }}>
            Subnet Speedster Challenge
          </h2>
          <p style={{
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.base,
            marginBottom: theme.spacing.lg
          }}>
            Test your subnetting skills! Calculate network addresses, broadcast addresses, and host ranges.
            Race against time and build your streak!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.md
        }}>
          {/* Easy Mode */}
          <div
            onClick={() => startGame('easy')}
            style={{
              padding: theme.spacing.lg,
              background: `${theme.colors.lightBlue}20`,
              border: `3px solid ${theme.colors.lightBlue}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌱</div>
            <h3 style={{ color: theme.colors.navy, margin: '0 0 0.5rem 0' }}>Easy Mode</h3>
            <p style={{ color: theme.colors.darkNavy, fontSize: theme.fonts.sizes.sm, margin: 0 }}>
              Class C networks, /24-/27 masks
            </p>
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem',
              background: theme.colors.yellow,
              borderRadius: theme.borderRadius.sm,
              fontWeight: '600',
              color: theme.colors.darkNavy
            }}>
              90 seconds • 10 points per question
            </div>
          </div>

          {/* Medium Mode */}
          <div
            onClick={() => startGame('medium')}
            style={{
              padding: theme.spacing.lg,
              background: `${theme.colors.mediumBlue}20`,
              border: `3px solid ${theme.colors.mediumBlue}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚡</div>
            <h3 style={{ color: theme.colors.navy, margin: '0 0 0.5rem 0' }}>Medium Mode</h3>
            <p style={{ color: theme.colors.darkNavy, fontSize: theme.fonts.sizes.sm, margin: 0 }}>
              Class B/C networks, /20-/28 masks
            </p>
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem',
              background: theme.colors.yellow,
              borderRadius: theme.borderRadius.sm,
              fontWeight: '600',
              color: theme.colors.darkNavy
            }}>
              75 seconds • 15 points per question
            </div>
          </div>

          {/* Hard Mode */}
          <div
            onClick={() => startGame('hard')}
            style={{
              padding: theme.spacing.lg,
              background: `${theme.colors.navy}20`,
              border: `3px solid ${theme.colors.navy}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔥</div>
            <h3 style={{ color: theme.colors.navy, margin: '0 0 0.5rem 0' }}>Hard Mode</h3>
            <p style={{ color: theme.colors.darkNavy, fontSize: theme.fonts.sizes.sm, margin: 0 }}>
              All classes, /16-/30 masks
            </p>
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem',
              background: theme.colors.yellow,
              borderRadius: theme.borderRadius.sm,
              fontWeight: '600',
              color: theme.colors.darkNavy
            }}>
              60 seconds • 25 points per question
            </div>
          </div>
        </div>

        <div style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          background: `${theme.colors.lightBlue}10`,
          borderRadius: theme.borderRadius.sm,
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm
          }}>
            <strong>💡 Tip:</strong> Get 3+ correct in a row for streak bonuses! Each streak question gives +10 bonus points!
          </p>
        </div>
      </div>
    );
  }

  // Render game
  if (gameMode === 'playing' && currentQuestion) {
    const allFieldsFilled = Object.values(answers).every(val => val.trim() !== '');

    return (
      <div style={{
        padding: theme.spacing.lg,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        border: `2px solid ${theme.colors.mediumBlue}`
      }}>
        {/* Header with stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              padding: '0.5rem 1rem',
              background: theme.colors.mediumBlue,
              color: theme.colors.white,
              borderRadius: theme.borderRadius.sm,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Target size={20} />
              Score: {score}
            </div>
            
            {streak > 0 && (
              <div style={{
                padding: '0.5rem 1rem',
                background: streak >= 3 ? theme.colors.yellow : theme.colors.lightBlue,
                color: theme.colors.darkNavy,
                borderRadius: theme.borderRadius.sm,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: streak >= 3 ? 'pulse 1s infinite' : 'none'
              }}>
                <Zap size={20} />
                Streak: {streak} {streak >= 3 && '🔥'}
              </div>
            )}

            <div style={{
              padding: '0.5rem 1rem',
              background: timeLeft < 20 ? '#ef4444' : theme.colors.navy,
              color: theme.colors.white,
              borderRadius: theme.borderRadius.sm,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock size={20} />
              {timeLeft}s
            </div>
          </div>

          <div style={{
            color: theme.colors.darkNavy,
            fontWeight: '600'
          }}>
            Question {questionNumber} / {totalQuestions}
          </div>
        </div>

        {/* Question */}
        <div style={{
          padding: theme.spacing.lg,
          background: theme.gradients.primary,
          color: theme.colors.white,
          borderRadius: theme.borderRadius.md,
          marginBottom: theme.spacing.lg,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: theme.fonts.sizes.xl }}>
            Calculate Subnet Details
          </h3>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {currentQuestion.ip}{currentQuestion.mask}
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.sm,
            opacity: 0.9
          }}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
          </div>
        </div>

        {/* Input fields */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.lg
        }}>
          {[
            { key: 'network', label: 'Network Address', icon: '🌐', placeholder: '192.168.1.0' },
            { key: 'broadcast', label: 'Broadcast Address', icon: '📡', placeholder: '192.168.1.255' },
            { key: 'firstHost', label: 'First Host', icon: '🖥️', placeholder: '192.168.1.1' },
            { key: 'lastHost', label: 'Last Host', icon: '💻', placeholder: '192.168.1.254' },
            { key: 'hosts', label: 'Usable Hosts', icon: '📊', placeholder: '254' }
          ].map(field => (
            <div key={field.key}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: theme.colors.darkNavy,
                fontSize: theme.fonts.sizes.sm
              }}>
                {field.icon} {field.label}
              </label>
              <input
                type="text"
                value={answers[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                disabled={feedback !== null}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${theme.colors.lightBlue}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.base,
                  fontFamily: theme.fonts.body,
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.mediumBlue;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.lightBlue;
                }}
              />
            </div>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{
            padding: theme.spacing.md,
            background: feedback.type === 'success' ? '#ecfdf5' : '#fee2e2',
            border: `2px solid ${feedback.type === 'success' ? '#10b981' : '#ef4444'}`,
            borderRadius: theme.borderRadius.sm,
            marginBottom: theme.spacing.lg,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: feedback.type === 'success' ? '#065f46' : '#991b1b'
          }}>
            {feedback.type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
            <span style={{ fontSize: theme.fonts.sizes.base, fontWeight: '600' }}>
              {feedback.message}
            </span>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={checkAnswer}
          disabled={!allFieldsFilled || feedback !== null}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            background: allFieldsFilled && !feedback 
              ? theme.gradients.primary
              : theme.colors.lightBlue,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.lg,
            fontWeight: '700',
            cursor: allFieldsFilled && !feedback ? 'pointer' : 'not-allowed',
            fontFamily: theme.fonts.body,
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            if (allFieldsFilled && !feedback) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = theme.shadows.large;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <CheckCircle size={24} />
          {feedback ? 'Next Question...' : 'Submit Answer'}
        </button>
      </div>
    );
  }

  // Render results
  if (gameMode === 'results') {
    const accuracy = questionsAnswered.length > 0 
      ? Math.round((questionsAnswered.filter(q => q.correct).length / questionsAnswered.length) * 100)
      : 0;

    const grade = accuracy >= 90 ? 'A+' : accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : accuracy >= 60 ? 'C' : 'Keep Practicing!';
    const emoji = accuracy >= 90 ? '🏆' : accuracy >= 80 ? '🌟' : accuracy >= 70 ? '👍' : accuracy >= 60 ? '📚' : '💪';

    return (
      <div style={{
        padding: theme.spacing.xl,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        border: `3px solid ${theme.colors.mediumBlue}`,
        boxShadow: theme.shadows.large
      }}>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{emoji}</div>
          <h2 style={{
            margin: 0,
            fontSize: theme.fonts.sizes.xxl,
            color: theme.colors.navy,
            marginBottom: '0.5rem'
          }}>
            Game Over!
          </h2>
          <div style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: theme.colors.mediumBlue,
            marginBottom: '1rem'
          }}>
            {score} Points
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.lg,
            color: theme.colors.darkNavy,
            fontWeight: '600'
          }}>
            Grade: {grade}
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl
        }}>
          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.lightBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Accuracy
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              {accuracy}%
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.mediumBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Correct
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              {questionsAnswered.filter(q => q.correct).length} / {totalQuestions}
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.yellow}40`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Max Streak
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              {maxStreak}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => startGame(difficulty)}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              background: theme.gradients.primary,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              transition: 'all 0.3s'
            }}
          >
            🔄 Try Again ({difficulty})
          </button>

          <button
            onClick={() => setGameMode('menu')}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              background: theme.colors.white,
              color: theme.colors.mediumBlue,
              border: `2px solid ${theme.colors.mediumBlue}`,
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              transition: 'all 0.3s'
            }}
          >
            🏠 Main Menu
          </button>
        </div>

        {/* Encouragement message */}
        <div style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          background: `${theme.colors.lightBlue}10`,
          borderRadius: theme.borderRadius.sm,
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            lineHeight: '1.6'
          }}>
            {accuracy >= 90 && "🎉 Outstanding! You're a subnetting master!"}
            {accuracy >= 70 && accuracy < 90 && "👏 Great job! Keep practicing to reach mastery!"}
            {accuracy >= 50 && accuracy < 70 && "💪 Good effort! Review the material and try again!"}
            {accuracy < 50 && "📚 Don't give up! Practice makes perfect. Review Day 4 content and try again!"}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default SubnetSpeedster;