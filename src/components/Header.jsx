import React from 'react';
import theme from '../styles/theme';

const Header = ({ currentDay, weekInfo }) => {
  return (
    <div style={{ 
      background: theme.colors.navy, 
      color: theme.colors.white, 
      padding: '1.5rem 2rem',
      boxShadow: theme.shadows.card
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: theme.fonts.sizes.xl, 
              fontWeight: '600' 
            }}>
              NetSage Academy
            </h1>
            <p style={{ 
              margin: '0.5rem 0 0 0', 
              opacity: 0.9, 
              fontSize: theme.fonts.sizes.sm 
            }}>
              CompTIA Network+ Certification Prep
            </p>
          </div>
          
          {weekInfo && (
            <div style={{ 
              textAlign: 'right',
              padding: '0.75rem 1.25rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: theme.borderRadius.sm,
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ 
                fontSize: theme.fonts.sizes.xs, 
                opacity: 0.9,
                marginBottom: '0.25rem'
              }}>
                Week {weekInfo.weekNumber}
              </div>
              <div style={{ 
                fontSize: theme.fonts.sizes.sm,
                fontWeight: '600'
              }}>
                Day {currentDay} of 21
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;