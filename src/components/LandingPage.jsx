import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Award, TrendingUp, Zap } from 'lucide-react';
import theme from '../styles/theme';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.mediumBlue} 100%)`,
      color: theme.colors.white
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          margin: '0 0 1rem 0',
          background: `linear-gradient(135deg, ${theme.colors.white} 0%, ${theme.colors.lightBlue} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          NetSage Academy
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          opacity: 0.9,
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Master CompTIA Network+ with interactive lessons, quizzes, flashcards, and games
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '1.25rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              background: theme.colors.yellow,
              color: theme.colors.darkNavy,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontFamily: theme.fonts.body
            }}
          >
            Get Started Free
          </button>
          
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '1.25rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              background: 'transparent',
              color: theme.colors.white,
              border: `3px solid ${theme.colors.white}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: theme.fonts.body
            }}
          >
            Sign In
          </button>
        </div>
      </div>

      <div style={{
        background: theme.colors.white,
        padding: '4rem 2rem',
        color: theme.colors.darkNavy
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '3rem',
            color: theme.colors.navy
          }}>
            Everything You Need to Pass Network+
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              background: `${theme.colors.lightBlue}15`,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.lightBlue}`,
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: theme.gradients.primary,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <BookOpen size={40} color={theme.colors.white} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                marginBottom: '1rem',
                color: theme.colors.navy
              }}>
                21-Day Study Plan
              </h3>
              <p style={{ 
                fontSize: '1rem',
                lineHeight: '1.6',
                color: theme.colors.darkNavy
              }}>
                Structured curriculum covering all Network+ objectives
              </p>
            </div>

            <div style={{
              padding: '2rem',
              background: `${theme.colors.mediumBlue}15`,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.mediumBlue}`,
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: theme.gradients.dark,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <Target size={40} color={theme.colors.white} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                marginBottom: '1rem',
                color: theme.colors.navy
              }}>
                Interactive Quizzes
              </h3>
              <p style={{ 
                fontSize: '1rem',
                lineHeight: '1.6',
                color: theme.colors.darkNavy
              }}>
                300+ practice questions with instant feedback
              </p>
            </div>

            <div style={{
              padding: '2rem',
              background: `${theme.colors.yellow}20`,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.yellow}`,
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: theme.colors.yellow,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <Award size={40} color={theme.colors.darkNavy} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                marginBottom: '1rem',
                color: theme.colors.navy
              }}>
                Flashcards & Games
              </h3>
              <p style={{ 
                fontSize: '1rem',
                lineHeight: '1.6',
                color: theme.colors.darkNavy
              }}>
                Interactive flashcards and gamified activities
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '2rem',
        textAlign: 'center',
        background: theme.colors.darkNavy,
        fontSize: '0.9rem',
        opacity: 0.8
      }}>
        © 2025 NetSage Academy
      </div>
    </div>
  );
};

export default LandingPage;