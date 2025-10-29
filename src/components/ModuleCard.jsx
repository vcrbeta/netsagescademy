import React from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import theme from '../styles/theme';

const ModuleCard = ({ day, title, topics, isCompleted, isLocked, onClick, score }) => {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      style={{
        background: isLocked ? `${theme.colors.lightBlue}10` : theme.colors.white,
        border: `2px solid ${isCompleted ? theme.colors.mediumBlue : theme.colors.lightBlue}`,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: isLocked ? 0.6 : 1,
        position: 'relative',
        boxShadow: theme.shadows.card
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.boxShadow = theme.shadows.cardHover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLocked) {
          e.currentTarget.style.boxShadow = theme.shadows.card;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem'
      }}>
        {isCompleted ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: theme.colors.mediumBlue,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: '600'
          }}>
            <CheckCircle size={18} />
          </div>
        ) : isLocked ? (
          <Lock size={18} color={theme.colors.darkNavy} opacity={0.5} />
        ) : null}
      </div>

      {/* Day Number */}
      <div style={{
        fontSize: theme.fonts.sizes.xs,
        color: theme.colors.mediumBlue,
        fontWeight: '600',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Day {day}
      </div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 0.75rem 0',
        fontSize: theme.fonts.sizes.lg,
        color: isLocked ? theme.colors.darkNavy : theme.colors.navy,
        fontWeight: '600',
        lineHeight: '1.3',
        paddingRight: '2rem'
      }}>
        {title}
      </h3>

      {/* Topics */}
      {topics && topics.length > 0 && (
        <div style={{ marginBottom: '0.75rem' }}>
          {topics.map((topic, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                background: isLocked ? `${theme.colors.lightBlue}20` : `${theme.colors.lightBlue}30`,
                color: theme.colors.darkNavy,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.xs,
                marginRight: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Score Badge */}
      {isCompleted && score !== undefined && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.5rem 0.75rem',
          background: theme.colors.yellow,
          color: theme.colors.darkNavy,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.fonts.sizes.sm,
          fontWeight: '600',
          display: 'inline-block'
        }}>
          Score: {score}%
        </div>
      )}
    </div>
  );
};

export default ModuleCard;