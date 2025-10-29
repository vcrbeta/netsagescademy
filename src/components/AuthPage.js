import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn, signInWithGoogle } from '../services/firebase';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import theme from '../styles/theme';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.displayName);
      } else {
        await signIn(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.mediumBlue} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        background: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        padding: '3rem',
        boxShadow: theme.shadows.large
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: theme.colors.navy,
            margin: '0 0 0.5rem 0'
          }}>
            NetSage Academy
          </h1>
          <p style={{
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm
          }}>
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: theme.borderRadius.sm,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#991b1b'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: theme.fonts.sizes.sm }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: theme.colors.darkNavy,
                fontSize: theme.fonts.sizes.sm
              }}>
                Name
              </label>
              <div style={{ position: 'relative' }}>
                <User 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.colors.darkNavy,
                    opacity: 0.5
                  }}
                />
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: `2px solid ${theme.colors.lightBlue}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.base,
                    fontFamily: theme.fonts.body,
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.sm
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.colors.darkNavy,
                  opacity: 0.5
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: `2px solid ${theme.colors.lightBlue}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.base,
                  fontFamily: theme.fonts.body,
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.sm
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.colors.darkNavy,
                  opacity: 0.5
                }}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength="6"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: `2px solid ${theme.colors.lightBlue}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.base,
                  fontFamily: theme.fonts.body,
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: theme.gradients.primary,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: theme.fonts.body,
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '1.5rem 0',
          gap: '1rem'
        }}>
          <div style={{ flex: 1, height: '1px', background: theme.colors.lightBlue }} />
          <span style={{ color: theme.colors.darkNavy, fontSize: theme.fonts.sizes.sm }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: theme.colors.lightBlue }} />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: theme.colors.white,
            color: theme.colors.darkNavy,
            border: `2px solid ${theme.colors.lightBlue}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.base,
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: theme.fonts.body,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s'
          }}
        >
          <span>🔍</span>
          Continue with Google
        </button>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: theme.fonts.sizes.sm,
          color: theme.colors.darkNavy
        }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setFormData({ email: '', password: '', displayName: '' });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.mediumBlue,
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: theme.fonts.sizes.sm,
              fontFamily: theme.fonts.body
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.sm,
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              opacity: 0.7
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;