import React from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';
import theme from '../styles/theme';

const ProgressTracker = ({ progress }) => {
  const completedDays = Object.keys(progress).length;
  const totalDays = 21;
  const completionPercentage = Math.round((completedDays / totalDays) * 100);
  
  const averageScore = completedDays > 0
    ? Math.round(
        Object.values(progress).reduce((sum, p) => sum + (p.score || 0), 0) / completedDays
      )
    : 0;

  return (
    <div style={{
      background: theme.gradients.primary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      color: theme.colors.white,
      marginBottom: theme.spacing.lg
    }}>
      <h2 style={{
        margin: '0 0 1.5rem 0',
        fontSize: theme.fonts.sizes.xl,
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Award size={28} />
        Your Progress
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: theme.spacing.md
      }}>
        {/* Days Completed */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            opacity: 0.9
          }}>
            <Target size={18} />
            <span style={{ fontSize: theme.fonts.sizes.sm }}>Days Completed</span>
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.xxl,
            fontWeight: '700'
          }}>
            {completedDays} / {totalDays}
          </div>
        </div>

        {/* Average Score */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            opacity: 0.9
          }}>
            <TrendingUp size={18} />
            <span style={{ fontSize: theme.fonts.sizes.sm }}>Average Score</span>
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.xxl,
            fontWeight: '700'
          }}>
            {averageScore}%
          </div>
        </div>

        {/* Completion */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            opacity: 0.9
          }}>
            <Award size={18} />
            <span style={{ fontSize: theme.fonts.sizes.sm }}>Completion</span>
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.xxl,
            fontWeight: '700'
          }}>
            {completionPercentage}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginTop: theme.spacing.lg }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: theme.fonts.sizes.sm,
          opacity: 0.9
        }}>
          <span>Overall Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '12px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${completionPercentage}%`,
            height: '100%',
            background: theme.colors.yellow,
            transition: 'width 0.5s ease',
            borderRadius: '6px'
          }} />
        </div>
      </div>

      {/* Motivational Message */}
      {completionPercentage > 0 && (
        <div style={{
          marginTop: theme.spacing.md,
          padding: theme.spacing.md,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.fonts.sizes.sm,
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          {completionPercentage === 100 
            ? "🎉 Congratulations! You've completed all modules!"
            : completionPercentage >= 75
            ? "🔥 You're in the home stretch! Keep going!"
            : completionPercentage >= 50
            ? "💪 Great progress! You're halfway there!"
            : completionPercentage >= 25
            ? "🚀 You're building momentum! Keep it up!"
            : "🌟 Great start! Every day counts!"}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;