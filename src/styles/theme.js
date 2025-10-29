// NetSage Academy Theme
// Your custom color scheme

export const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    lightBlue: '#8ECEE7',
    mediumBlue: '#3A8CC5',
    navy: '#19396B',
    darkNavy: '#12224A',
    yellow: '#FBC671'
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #8ECEE7 0%, #3A8CC5 100%)',
    dark: 'linear-gradient(135deg, #3A8CC5 0%, #19396B 100%)',
    highlight: 'linear-gradient(135deg, #FBC671 0%, #f9b851 100%)'
  },

  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.15)',
    large: '0 10px 30px rgba(0, 0, 0, 0.15)'
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px'
  },

  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sizes: {
      xs: '0.85rem',
      sm: '0.95rem',
      base: '1rem',
      md: '1.05rem',
      lg: '1.25rem',
      xl: '1.75rem',
      xxl: '2rem'
    }
  }
};

export default theme;