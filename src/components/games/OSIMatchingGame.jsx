import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCw, Trophy } from 'lucide-react';
import theme from '../../styles/theme';

const OSIMatchingGame = () => {
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const layers = [
    { id: 7, name: 'Application', color: '#e74c3c' },
    { id: 6, name: 'Presentation', color: '#e67e22' },
    { id: 5, name: 'Session', color: '#f39c12' },
    { id: 4, name: 'Transport', color: '#2ecc71' },
    { id: 3, name: 'Network', color: '#3498db' },
    { id: 2, name: 'Data Link', color: '#9b59b6' },
    { id: 1, name: 'Physical', color: '#34495e' }
  ];

  const items = [
    { id: 'http', text: 'HTTP/HTTPS', correctLayer: 7 },
    { id: 'ssl', text: 'SSL/TLS Encryption', correctLayer: 6 },
    { id: 'auth', text: 'Session Management', correctLayer: 5 },
    { id: 'tcp', text: 'TCP/UDP', correctLayer: 4 },
    { id: 'ip', text: 'IP Addressing', correctLayer: 3 },
    { id: 'mac', text: 'MAC Addresses', correctLayer: 2 },
    { id: 'cable', text: 'Ethernet Cables', correctLayer: 1 },
    { id: 'dns', text: 'DNS', correctLayer: 7 },
    { id: 'port', text: 'Port Numbers', correctLayer: 4 },
    { id: 'router', text: 'Routers', correctLayer: 3 },
    { id: 'switch', text: 'Switches', correctLayer: 2 },
    { id: 'bits', text: 'Raw Bits', correctLayer: 1 }
  ];

  const handleMatch = (itemId, layerId) => {
    setMatches(prev => ({
      ...prev,
      [itemId]: layerId
    }));
  };

  const checkAnswers = () => {
    let correct = 0;
    items.forEach(item => {
      if (matches[item.id] === item.correctLayer) {
        correct++;
      }
    });
    setScore(correct);
    setShowFeedback(true);
    if (correct === items.length) {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setShowFeedback(false);
    setCompleted(false);
  };

  const allMatched = Object.keys(matches).length === items.length;

  return (
    <div style={{
      padding: theme.spacing.lg,
      background: theme.colors.white,
      borderRadius: theme.borderRadius.md,
      border: `2px solid ${theme.colors.mediumBlue}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg
      }}>
        <h3 style={{
          margin: 0,
          color: theme.colors.navy,
          fontSize: theme.fonts.sizes.lg
        }}>
          🎮 OSI Layer Matching Game
        </h3>
        <button
          onClick={resetGame}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: theme.colors.lightBlue,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: theme.fonts.body
          }}
        >
          <RotateCw size={16} />
          Reset
        </button>
      </div>

      <p style={{
        margin: '0 0 1.5rem 0',
        color: theme.colors.darkNavy,
        fontSize: theme.fonts.sizes.sm
      }}>
        Match each protocol or device to its correct OSI layer. Select an item, then click the layer it belongs to.
      </p>

      {/* Score Display */}
      {showFeedback && (
        <div style={{
          padding: theme.spacing.md,
          background: completed ? theme.colors.yellow : `${theme.colors.lightBlue}30`,
          borderRadius: theme.borderRadius.sm,
          marginBottom: theme.spacing.lg,
          textAlign: 'center'
        }}>
          {completed ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.lg,
              fontWeight: '600'
            }}>
              <Trophy size={24} />
              Perfect Score! 🎉 You matched all {items.length} correctly!
            </div>
          ) : (
            <div style={{
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '600'
            }}>
              Score: {score} / {items.length} correct
              {score < items.length && " - Try again!"}
            </div>
          )}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.lg
      }}>
        {/* OSI Layers */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.base
          }}>
            OSI Layers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {layers.map(layer => {
              const matchedItems = Object.entries(matches)
                .filter(([_, layerId]) => layerId === layer.id)
                .map(([itemId]) => items.find(i => i.id === itemId));

              return (
                <div
                  key={layer.id}
                  style={{
                    padding: theme.spacing.sm,
                    background: layer.color,
                    color: theme.colors.white,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.sm,
                    fontWeight: '600',
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div>Layer {layer.id}: {layer.name}</div>
                  {matchedItems.length > 0 && (
                    <div style={{
                      fontSize: theme.fonts.sizes.xs,
                      opacity: 0.9,
                      marginTop: '0.25rem'
                    }}>
                      {matchedItems.map((item, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          {showFeedback && (
                            item.correctLayer === layer.id ? 
                              <CheckCircle size={12} /> : 
                              <XCircle size={12} />
                          )}
                          {item.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Items to Match */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.base
          }}>
            Drag or Click Items to Match
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '0.75rem'
          }}>
            {items.map(item => {
              const isMatched = matches[item.id] !== undefined;
              const isCorrect = showFeedback && matches[item.id] === item.correctLayer;
              const isWrong = showFeedback && matches[item.id] !== item.correctLayer;

              return (
                <div
                  key={item.id}
                  style={{
                    padding: theme.spacing.sm,
                    background: isMatched 
                      ? (isCorrect ? '#ecfdf5' : isWrong ? '#fee2e2' : theme.colors.white)
                      : theme.colors.white,
                    border: `2px solid ${
                      isCorrect ? '#10b981' : 
                      isWrong ? '#ef4444' : 
                      theme.colors.lightBlue
                    }`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.sm,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    opacity: isMatched ? 0.7 : 1,
                    fontFamily: theme.fonts.body,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMatched) e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {showFeedback && isCorrect && (
                    <CheckCircle 
                      size={16} 
                      color="#10b981" 
                      style={{ position: 'absolute', top: '4px', right: '4px' }}
                    />
                  )}
                  {showFeedback && isWrong && (
                    <XCircle 
                      size={16} 
                      color="#ef4444" 
                      style={{ position: 'absolute', top: '4px', right: '4px' }}
                    />
                  )}
                  <div>{item.text}</div>
                  {isMatched && (
                    <div style={{
                      fontSize: theme.fonts.sizes.xs,
                      marginTop: '0.25rem',
                      opacity: 0.7
                    }}>
                      → Layer {matches[item.id]}
                    </div>
                  )}
                  {/* Click to assign layer */}
                  {!showFeedback && (
                    <select
                      value={matches[item.id] || ''}
                      onChange={(e) => handleMatch(item.id, parseInt(e.target.value))}
                      style={{
                        marginTop: '0.5rem',
                        width: '100%',
                        padding: '0.25rem',
                        border: `1px solid ${theme.colors.lightBlue}`,
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.fonts.sizes.xs,
                        fontFamily: theme.fonts.body
                      }}
                    >
                      <option value="">Select Layer</option>
                      {layers.map(layer => (
                        <option key={layer.id} value={layer.id}>
                          {layer.id} - {layer.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Check Answers Button */}
      {!showFeedback && (
        <button
          onClick={checkAnswers}
          disabled={!allMatched}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            background: allMatched ? theme.colors.mediumBlue : theme.colors.lightBlue,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.base,
            fontWeight: '600',
            cursor: allMatched ? 'pointer' : 'not-allowed',
            fontFamily: theme.fonts.body,
            transition: 'all 0.2s'
          }}
        >
          {allMatched ? 'Check Answers' : `Match All Items (${Object.keys(matches).length}/${items.length})`}
        </button>
      )}
    </div>
  );
};

export default OSIMatchingGame;