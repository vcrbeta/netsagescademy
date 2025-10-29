import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCw, Trophy, Zap } from 'lucide-react';
import theme from '../../styles/theme';

const PortMatchingGame = () => {
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const portCategories = [
    { id: 'secure', name: 'Secure Protocols', color: '#10b981', emoji: '🔒' },
    { id: 'email', name: 'Email Protocols', color: '#3b82f6', emoji: '📧' },
    { id: 'web', name: 'Web Protocols', color: '#8b5cf6', emoji: '🌐' },
    { id: 'file', name: 'File Transfer', color: '#f59e0b', emoji: '📁' },
    { id: 'network', name: 'Network Services', color: '#ec4899', emoji: '⚙️' },
    { id: 'database', name: 'Database & Remote', color: '#06b6d4', emoji: '💾' }
  ];

  const protocols = [
    // Secure Protocols
    { id: 'ssh', name: 'SSH', port: '22', category: 'secure', hint: 'Secure Shell' },
    { id: 'https', name: 'HTTPS', port: '443', category: 'secure', hint: 'Secure Web' },
    { id: 'sftp', name: 'SFTP', port: '22', category: 'secure', hint: 'Secure FTP' },
    
    // Email
    { id: 'smtp', name: 'SMTP', port: '25', category: 'email', hint: 'Send Email' },
    { id: 'pop3', name: 'POP3', port: '110', category: 'email', hint: 'Receive Email' },
    { id: 'imap', name: 'IMAP', port: '143', category: 'email', hint: 'Email with Sync' },
    { id: 'smtps', name: 'SMTPS', port: '587', category: 'email', hint: 'Secure SMTP' },
    
    // Web
    { id: 'http', name: 'HTTP', port: '80', category: 'web', hint: 'Insecure Web' },
    { id: 'dns', name: 'DNS', port: '53', category: 'web', hint: 'Name Resolution' },
    
    // File Transfer
    { id: 'ftp-data', name: 'FTP Data', port: '20', category: 'file', hint: 'FTP Data Channel' },
    { id: 'ftp-control', name: 'FTP Control', port: '21', category: 'file', hint: 'FTP Control' },
    { id: 'tftp', name: 'TFTP', port: '69', category: 'file', hint: 'Trivial FTP' },
    { id: 'smb', name: 'SMB', port: '445', category: 'file', hint: 'Windows Sharing' },
    
    // Network Services
    { id: 'dhcp-server', name: 'DHCP Server', port: '67', category: 'network', hint: 'IP Assignment' },
    { id: 'dhcp-client', name: 'DHCP Client', port: '68', category: 'network', hint: 'IP Request' },
    { id: 'ntp', name: 'NTP', port: '123', category: 'network', hint: 'Time Sync' },
    { id: 'snmp', name: 'SNMP', port: '161', category: 'network', hint: 'Network Mgmt' },
    { id: 'ldap', name: 'LDAP', port: '389', category: 'network', hint: 'Directory' },
    { id: 'syslog', name: 'Syslog', port: '514', category: 'network', hint: 'Logging' },
    
    // Database & Remote
    { id: 'sql', name: 'SQL Server', port: '1433', category: 'database', hint: 'MS Database' },
    { id: 'mysql', name: 'MySQL', port: '3306', category: 'database', hint: 'MySQL DB' },
    { id: 'rdp', name: 'RDP', port: '3389', category: 'database', hint: 'Remote Desktop' },
    { id: 'sip', name: 'SIP', port: '5060', category: 'database', hint: 'VoIP Setup' }
  ];

  const handleMatch = (protocolId, port) => {
    setMatches(prev => ({
      ...prev,
      [protocolId]: port
    }));
  };

  const checkAnswers = () => {
    let correct = 0;
    protocols.forEach(protocol => {
      if (matches[protocol.id] === protocol.port) {
        correct++;
      }
    });
    setScore(correct);
    setShowFeedback(true);
    if (correct === protocols.length) {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setShowFeedback(false);
    setCompleted(false);
  };

  const allMatched = Object.keys(matches).length === protocols.length;

  const getCategoryColor = (categoryId) => {
    const category = portCategories.find(c => c.id === categoryId);
    return category ? category.color : theme.colors.lightBlue;
  };

  return (
    <div style={{
      padding: theme.spacing.lg,
      background: theme.colors.white,
      borderRadius: theme.borderRadius.md,
      border: `2px solid ${theme.colors.mediumBlue}`,
      marginTop: theme.spacing.lg
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h3 style={{
          margin: 0,
          color: theme.colors.navy,
          fontSize: theme.fonts.sizes.lg,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Zap size={24} color={theme.colors.yellow} />
          🎮 Port Number Challenge
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
            fontFamily: theme.fonts.body,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.mediumBlue;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.lightBlue;
          }}
        >
          <RotateCw size={16} />
          Reset
        </button>
      </div>

      <p style={{
        margin: '0 0 1.5rem 0',
        color: theme.colors.darkNavy,
        fontSize: theme.fonts.sizes.sm,
        lineHeight: '1.6'
      }}>
        Match each protocol to its correct port number! These are critical for the Network+ exam. 
        Select the correct port from the dropdown for each protocol.
      </p>

      {/* Score Display */}
      {showFeedback && (
        <div style={{
          padding: theme.spacing.md,
          background: completed ? theme.colors.yellow : `${theme.colors.lightBlue}30`,
          borderRadius: theme.borderRadius.sm,
          marginBottom: theme.spacing.lg,
          textAlign: 'center',
          border: `2px solid ${completed ? theme.colors.yellow : theme.colors.lightBlue}`
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
              🎉 Perfect Score! You matched all {protocols.length} correctly!
            </div>
          ) : (
            <div style={{
              color: theme.colors.darkNavy,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '600'
            }}>
              Score: {score} / {protocols.length} correct
              {score < protocols.length && " - Keep trying!"}
            </div>
          )}
        </div>
      )}

      {/* Category Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.sm,
        background: `${theme.colors.lightBlue}10`,
        borderRadius: theme.borderRadius.sm
      }}>
        {portCategories.map(category => (
          <div key={category.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: category.color,
            color: theme.colors.white,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.xs,
            fontWeight: '600'
          }}>
            <span>{category.emoji}</span>
            {category.name}
          </div>
        ))}
      </div>

      {/* Protocol Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: theme.spacing.lg
      }}>
        {protocols.map(protocol => {
          const isMatched = matches[protocol.id] !== undefined;
          const isCorrect = showFeedback && matches[protocol.id] === protocol.port;
          const isWrong = showFeedback && matches[protocol.id] !== protocol.port;

          return (
            <div
              key={protocol.id}
              style={{
                padding: theme.spacing.md,
                background: isMatched 
                  ? (isCorrect ? '#ecfdf5' : isWrong ? '#fee2e2' : theme.colors.white)
                  : theme.colors.white,
                border: `3px solid ${
                  isCorrect ? '#10b981' : 
                  isWrong ? '#ef4444' : 
                  getCategoryColor(protocol.category)
                }`,
                borderRadius: theme.borderRadius.sm,
                transition: 'all 0.3s',
                position: 'relative',
                boxShadow: theme.shadows.card
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '10px',
                padding: '0.25rem 0.5rem',
                background: getCategoryColor(protocol.category),
                color: theme.colors.white,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.xs,
                fontWeight: '600'
              }}>
                {portCategories.find(c => c.id === protocol.category)?.emoji}
              </div>

              {/* Feedback Icon */}
              {showFeedback && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px'
                }}>
                  {isCorrect ? (
                    <CheckCircle size={20} color="#10b981" />
                  ) : (
                    <XCircle size={20} color="#ef4444" />
                  )}
                </div>
              )}

              <div style={{
                marginTop: '1rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  fontSize: theme.fonts.sizes.lg,
                  fontWeight: '700',
                  color: theme.colors.navy,
                  marginBottom: '0.25rem'
                }}>
                  {protocol.name}
                </div>
                <div style={{
                  fontSize: theme.fonts.sizes.xs,
                  color: theme.colors.darkNavy,
                  opacity: 0.8,
                  marginBottom: '0.75rem'
                }}>
                  {protocol.hint}
                </div>
              </div>

              {/* Port Selection */}
              {!showFeedback ? (
                <select
                  value={matches[protocol.id] || ''}
                  onChange={(e) => handleMatch(protocol.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: `2px solid ${theme.colors.lightBlue}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.sm,
                    fontFamily: theme.fonts.body,
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: theme.colors.white
                  }}
                >
                  <option value="">Select Port...</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="25">25</option>
                  <option value="53">53</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="80">80</option>
                  <option value="110">110</option>
                  <option value="123">123</option>
                  <option value="143">143</option>
                  <option value="161">161</option>
                  <option value="389">389</option>
                  <option value="443">443</option>
                  <option value="445">445</option>
                  <option value="514">514</option>
                  <option value="587">587</option>
                  <option value="1433">1433</option>
                  <option value="3306">3306</option>
                  <option value="3389">3389</option>
                  <option value="5060">5060</option>
                </select>
              ) : (
                <div style={{
                  padding: '0.75rem',
                  background: isCorrect ? '#d1fae5' : '#fecaca',
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: theme.borderRadius.sm,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: theme.fonts.sizes.sm,
                    fontWeight: '600',
                    color: theme.colors.darkNavy
                  }}>
                    Your answer: <span style={{ fontSize: theme.fonts.sizes.base }}>{matches[protocol.id]}</span>
                  </div>
                  {!isCorrect && (
                    <div style={{
                      fontSize: theme.fonts.sizes.xs,
                      marginTop: '0.25rem',
                      color: theme.colors.darkNavy
                    }}>
                      Correct: <strong>{protocol.port}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Check Answers Button */}
      {!showFeedback && (
        <button
          onClick={checkAnswers}
          disabled={!allMatched}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            background: allMatched 
              ? `linear-gradient(135deg, ${theme.colors.mediumBlue} 0%, ${theme.colors.navy} 100%)`
              : theme.colors.lightBlue,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.lg,
            fontWeight: '700',
            cursor: allMatched ? 'pointer' : 'not-allowed',
            fontFamily: theme.fonts.body,
            transition: 'all 0.3s',
            boxShadow: allMatched ? theme.shadows.large : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            if (allMatched) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (allMatched) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = theme.shadows.large;
            }
          }}
        >
          {allMatched ? (
            <>
              <Zap size={24} />
              Check My Answers!
            </>
          ) : (
            `Match All Protocols (${Object.keys(matches).length}/${protocols.length})`
          )}
        </button>
      )}

      {/* Study Tip */}
      <div style={{
        marginTop: theme.spacing.lg,
        padding: theme.spacing.md,
        background: `${theme.colors.yellow}20`,
        border: `2px solid ${theme.colors.yellow}`,
        borderRadius: theme.borderRadius.sm
      }}>
        <div style={{
          fontSize: theme.fonts.sizes.sm,
          color: theme.colors.darkNavy,
          lineHeight: '1.6'
        }}>
          <strong>💡 Study Tip:</strong> Create flashcards for these port numbers! 
          The Network+ exam expects you to know these by heart. Focus on the secure versions 
          (HTTPS 443, SSH 22, SMTPS 587) as they're heavily tested.
        </div>
      </div>
    </div>
  );
};

export default PortMatchingGame;