import React, { useState } from 'react';
import { ArrowRight, RotateCw } from 'lucide-react';
import theme from '../styles/theme';

const FlashcardView = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleNext = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleShuffle = () => {
    setShowDefinition(false);
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: theme.spacing.lg 
    }}>
      {/* Flashcard */}
      <div 
        onClick={() => setShowDefinition(!showDefinition)}
        style={{
          width: '100%',
          maxWidth: '600px',
          minHeight: '350px',
          background: showDefinition 
            ? theme.gradients.dark
            : theme.gradients.primary,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: theme.shadows.large,
          transition: 'all 0.3s ease',
          color: theme.colors.white,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative corner badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.fonts.sizes.xs,
          fontWeight: '600',
          backdropFilter: 'blur(10px)'
        }}>
          {showDefinition ? 'Definition' : 'Term'}
        </div>

        <div style={{ 
          fontSize: showDefinition ? theme.fonts.sizes.lg : theme.fonts.sizes.xxl,
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '1.5',
          marginBottom: theme.spacing.md,
          transition: 'font-size 0.3s'
        }}>
          {showDefinition ? currentCard.definition : currentCard.term}
        </div>

        <div style={{ 
          marginTop: 'auto',
          fontSize: theme.fonts.sizes.sm,
          opacity: 0.8,
          textAlign: 'center'
        }}>
          Click to flip
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        gap: theme.spacing.sm, 
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={handlePrevious}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            background: theme.colors.white,
            color: theme.colors.mediumBlue,
            border: `2px solid ${theme.colors.mediumBlue}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.base,
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: theme.fonts.body,
            transition: 'all 0.2s'
          }}
        >
          ← Previous
        </button>

        <div style={{ 
          color: theme.colors.darkNavy, 
          fontSize: theme.fonts.sizes.base,
          fontWeight: '600',
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          background: `${theme.colors.lightBlue}20`,
          borderRadius: theme.borderRadius.sm
        }}>
          {currentIndex + 1} of {flashcards.length}
        </div>

        <button
          onClick={handleNext}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            background: theme.colors.mediumBlue,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.base,
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: theme.fonts.body,
            transition: 'all 0.2s'
          }}
        >
          Next
          <ArrowRight size={18} />
        </button>

        <button
          onClick={handleShuffle}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            background: theme.colors.yellow,
            color: theme.colors.darkNavy,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.base,
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: theme.fonts.body,
            transition: 'all 0.2s'
          }}
        >
          <RotateCw size={18} />
          Shuffle
        </button>
      </div>

      {/* Progress indicator */}
      <div style={{ 
        width: '100%', 
        maxWidth: '600px',
        height: '4px',
        background: `${theme.colors.lightBlue}40`,
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
          height: '100%',
          background: theme.colors.mediumBlue,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default FlashcardView;