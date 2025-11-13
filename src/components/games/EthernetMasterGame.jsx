import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCw, Trophy, Zap, Award, Target } from 'lucide-react';
import theme from '../../styles/theme';

const EthernetMasterGame = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Round 1: Cable Type Challenge
  const cableScenarios = [
    { id: 1, scenario: 'PC to Switch', correct: 'straight', icon: '💻 ↔️ 🔀' },
    { id: 2, scenario: 'Switch to Switch', correct: 'crossover', icon: '🔀 ↔️ 🔀' },
    { id: 3, scenario: 'Router to Switch', correct: 'straight', icon: '🌐 ↔️ 🔀' },
    { id: 4, scenario: 'PC to PC (Direct)', correct: 'crossover', icon: '💻 ↔️ 💻' },
    { id: 5, scenario: 'Router to Router', correct: 'crossover', icon: '🌐 ↔️ 🌐' },
    { id: 6, scenario: 'Server to Switch', correct: 'straight', icon: '🖥️ ↔️ 🔀' },
    { id: 7, scenario: 'Switch to Router', correct: 'straight', icon: '🔀 ↔️ 🌐' },
    { id: 8, scenario: 'PC to Router (Direct)', correct: 'crossover', icon: '💻 ↔️ 🌐' }
  ];

  // Round 2: Cable Category Challenge
  const speedRequirements = [
    { id: 1, requirement: '100 Mbps @ 100m', correct: 'Cat5e', speeds: '10/100 Mbps' },
    { id: 2, requirement: '1 Gbps @ 100m', correct: 'Cat5e', speeds: 'Up to 1 Gbps' },
    { id: 3, requirement: '10 Gbps @ 55m', correct: 'Cat6', speeds: 'Up to 10 Gbps (short)' },
    { id: 4, requirement: '10 Gbps @ 100m', correct: 'Cat6a', speeds: 'Full 10 Gbps' },
    { id: 5, requirement: '1 Gbps desktop', correct: 'Cat5e', speeds: 'Cost-effective' },
    { id: 6, requirement: '10 Gbps server', correct: 'Cat6a', speeds: 'Best for 10GbE' },
    { id: 7, requirement: 'Future-proof install', correct: 'Cat6a', speeds: 'Long-term solution' },
    { id: 8, requirement: 'Budget 1 Gbps', correct: 'Cat5e', speeds: 'Minimum acceptable' }
  ];

  // Round 3: MAC Address Matching
  const macDevices = [
    { id: 1, mac: 'FF:FF:FF:FF:FF:FF', device: 'Broadcast', type: 'All devices' },
    { id: 2, mac: '00:1A:A0:XX:XX:XX', device: 'Dell Computer', type: 'OUI: Dell' },
    { id: 3, mac: '00:50:56:XX:XX:XX', device: 'VMware VM', type: 'OUI: VMware' },
    { id: 4, mac: '01:00:5E:XX:XX:XX', device: 'IPv4 Multicast', type: 'Group address' },
    { id: 5, mac: '00:0C:29:XX:XX:XX', device: 'VMware VM', type: 'OUI: VMware' },
    { id: 6, mac: 'AA:BB:CC:DD:EE:FF', device: 'Generic Device', type: 'Unicast MAC' },
    { id: 7, mac: '33:33:XX:XX:XX:XX', device: 'IPv6 Multicast', type: 'Group address' },
    { id: 8, mac: '00:00:00:00:00:00', device: 'Invalid/Null', type: 'Not used' }
  ];

  // Round 4: Frame Structure
  const frameComponents = [
    { id: 1, component: 'Preamble', description: '7 bytes, clock sync', position: 'Start' },
    { id: 2, component: 'SFD', description: '1 byte, frame delimiter', position: '2nd' },
    { id: 3, component: 'Dest MAC', description: '6 bytes, destination', position: '3rd' },
    { id: 4, component: 'Source MAC', description: '6 bytes, sender', position: '4th' },
    { id: 5, component: 'EtherType', description: '2 bytes, protocol', position: '5th' },
    { id: 6, component: 'Data', description: '46-1500 bytes, payload', position: '6th' },
    { id: 7, component: 'FCS', description: '4 bytes, error check', position: 'End' },
    { id: 8, component: 'Total Frame', description: '64-1518 bytes', position: 'All' }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const checkRound = () => {
    let correct = 0;
    let questions = 0;

    if (currentRound === 1) {
      questions = cableScenarios.length;
      cableScenarios.forEach(scenario => {
        if (answers[scenario.id] === scenario.correct) correct++;
      });
    } else if (currentRound === 2) {
      questions = speedRequirements.length;
      speedRequirements.forEach(req => {
        if (answers[req.id] === req.correct) correct++;
      });
    } else if (currentRound === 3) {
      questions = macDevices.length;
      macDevices.forEach(device => {
        if (answers[device.id] === device.device) correct++;
      });
    } else if (currentRound === 4) {
      questions = frameComponents.length;
      frameComponents.forEach(comp => {
        if (answers[comp.id] === comp.position) correct++;
      });
    }

    setScore(prev => prev + correct);
    setTotalQuestions(prev => prev + questions);
    setShowResults(true);
  };

  const nextRound = () => {
    if (currentRound < 4) {
      setCurrentRound(prev => prev + 1);
      setAnswers({});
      setShowResults(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setTotalQuestions(0);
    setAnswers({});
    setShowResults(false);
    setGameComplete(false);
  };

  const getRoundData = () => {
    switch(currentRound) {
      case 1: return { title: 'Cable Type Challenge', data: cableScenarios, type: 'cable' };
      case 2: return { title: 'Cable Category Challenge', data: speedRequirements, type: 'category' };
      case 3: return { title: 'MAC Address Matching', data: macDevices, type: 'mac' };
      case 4: return { title: 'Frame Structure Order', data: frameComponents, type: 'frame' };
      default: return { title: '', data: [], type: '' };
    }
  };

  const roundData = getRoundData();

  if (gameComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = percentage === 100;

    return (
      <div style={{
        padding: theme.spacing.lg,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        border: `2px solid ${theme.colors.mediumBlue}`,
        marginTop: theme.spacing.lg
      }}>
        <div style={{
          textAlign: 'center',
          padding: theme.spacing.xl
        }}>
          {isPerfect ? (
            <>
              <Trophy size={80} color={theme.colors.yellow} style={{ marginBottom: '1rem' }} />
              <h2 style={{
                fontSize: theme.fonts.sizes.xxl,
                color: theme.colors.navy,
                margin: '1rem 0'
              }}>
                🎉 Perfect Score! 🎉
              </h2>
              <p style={{
                fontSize: theme.fonts.sizes.xl,
                color: theme.colors.darkNavy,
                marginBottom: '2rem'
              }}>
                You're an Ethernet Master!
              </p>
            </>
          ) : (
            <>
              <Award size={80} color={theme.colors.mediumBlue} style={{ marginBottom: '1rem' }} />
              <h2 style={{
                fontSize: theme.fonts.sizes.xxl,
                color: theme.colors.navy,
                margin: '1rem 0'
              }}>
                Game Complete!
              </h2>
            </>
          )}

          <div style={{
            background: `${theme.colors.lightBlue}30`,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: theme.fonts.sizes.xxl,
              fontWeight: '700',
              color: theme.colors.navy,
              marginBottom: '0.5rem'
            }}>
              {score} / {totalQuestions}
            </div>
            <div style={{
              fontSize: theme.fonts.sizes.lg,
              color: theme.colors.darkNavy
            }}>
              {percentage}% Correct
            </div>
          </div>

          <div style={{
            background: `${theme.colors.yellow}30`,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            marginBottom: '2rem',
            border: `2px solid ${theme.colors.yellow}`
          }}>
            <p style={{
              fontSize: theme.fonts.sizes.base,
              color: theme.colors.darkNavy,
              margin: 0,
              lineHeight: '1.6'
            }}>
              <strong>💡 Key Takeaways:</strong><br />
              ✅ Straight-through cables for different devices<br />
              ✅ Cat6a for 10 Gbps @ 100m<br />
              ✅ FF:FF:FF:FF:FF:FF is broadcast MAC<br />
              ✅ Ethernet frame: Preamble → MACs → Data → FCS
            </p>
          </div>

          <button
            onClick={resetGame}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: `${theme.spacing.md} ${theme.spacing.xl}`,
              background: theme.colors.mediumBlue,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.lg,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              margin: '0 auto',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.navy;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.mediumBlue;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <RotateCw size={24} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: theme.spacing.lg,
      background: theme.colors.white,
      borderRadius: theme.borderRadius.md,
      border: `2px solid ${theme.colors.mediumBlue}`,
      marginTop: theme.spacing.lg
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{
            margin: 0,
            color: theme.colors.navy,
            fontSize: theme.fonts.sizes.lg,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Zap size={24} color={theme.colors.yellow} />
            Ethernet Master Challenge
          </h3>
          <p style={{
            margin: '0.5rem 0 0 0',
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm
          }}>
            Round {currentRound} of 4: {roundData.title}
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: `${theme.colors.yellow}30`,
            borderRadius: theme.borderRadius.sm,
            border: `2px solid ${theme.colors.yellow}`,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: '600',
            color: theme.colors.darkNavy
          }}>
            Score: {score}/{totalQuestions}
          </div>

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
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: theme.spacing.lg
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          {[1, 2, 3, 4].map(round => (
            <div key={round} style={{
              flex: 1,
              height: '8px',
              background: round < currentRound ? theme.colors.mediumBlue : 
                         round === currentRound ? theme.colors.yellow :
                         `${theme.colors.lightBlue}30`,
              borderRadius: '4px',
              transition: 'all 0.3s'
            }} />
          ))}
        </div>
        <div style={{
          fontSize: theme.fonts.sizes.xs,
          color: theme.colors.darkNavy,
          textAlign: 'center'
        }}>
          {currentRound === 1 && '📡 Cable Types'}
          {currentRound === 2 && '🔌 Cable Categories'}
          {currentRound === 3 && '🏷️ MAC Addresses'}
          {currentRound === 4 && '📦 Frame Structure'}
        </div>
      </div>

      {/* Round 1: Cable Type Challenge */}
      {currentRound === 1 && !showResults && (
        <div>
          <p style={{
            marginBottom: theme.spacing.md,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            background: `${theme.colors.lightBlue}20`,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.sm
          }}>
            Select the correct cable type for each scenario. Remember: <strong>Straight-through</strong> for different devices, <strong>Crossover</strong> for same devices.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {cableScenarios.map(scenario => (
              <div key={scenario.id} style={{
                padding: theme.spacing.md,
                background: answers[scenario.id] ? `${theme.colors.lightBlue}20` : theme.colors.white,
                border: `2px solid ${answers[scenario.id] ? theme.colors.mediumBlue : theme.colors.lightBlue}`,
                borderRadius: theme.borderRadius.sm,
                transition: 'all 0.2s'
              }}>
                <div style={{
                  fontSize: theme.fonts.sizes.xl,
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>
                  {scenario.icon}
                </div>
                <div style={{
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: '600',
                  color: theme.colors.navy,
                  marginBottom: '0.75rem',
                  textAlign: 'center'
                }}>
                  {scenario.scenario}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAnswer(scenario.id, 'straight')}
                    style={{
                      flex: 1,
                      padding: theme.spacing.xs,
                      background: answers[scenario.id] === 'straight' ? theme.colors.mediumBlue : theme.colors.white,
                      color: answers[scenario.id] === 'straight' ? theme.colors.white : theme.colors.darkNavy,
                      border: `2px solid ${theme.colors.mediumBlue}`,
                      borderRadius: theme.borderRadius.sm,
                      fontSize: theme.fonts.sizes.xs,
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: theme.fonts.body,
                      transition: 'all 0.2s'
                    }}
                  >
                    Straight
                  </button>
                  <button
                    onClick={() => handleAnswer(scenario.id, 'crossover')}
                    style={{
                      flex: 1,
                      padding: theme.spacing.xs,
                      background: answers[scenario.id] === 'crossover' ? theme.colors.mediumBlue : theme.colors.white,
                      color: answers[scenario.id] === 'crossover' ? theme.colors.white : theme.colors.darkNavy,
                      border: `2px solid ${theme.colors.mediumBlue}`,
                      borderRadius: theme.borderRadius.sm,
                      fontSize: theme.fonts.sizes.xs,
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: theme.fonts.body,
                      transition: 'all 0.2s'
                    }}
                  >
                    Crossover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round 2: Cable Category Challenge */}
      {currentRound === 2 && !showResults && (
        <div>
          <p style={{
            marginBottom: theme.spacing.md,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            background: `${theme.colors.lightBlue}20`,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.sm
          }}>
            Choose the best cable category for each requirement. <strong>Cat5e</strong> = 1 Gbps, <strong>Cat6</strong> = 10 Gbps (55m), <strong>Cat6a</strong> = 10 Gbps (100m).
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {speedRequirements.map(req => (
              <div key={req.id} style={{
                padding: theme.spacing.md,
                background: answers[req.id] ? `${theme.colors.lightBlue}20` : theme.colors.white,
                border: `2px solid ${answers[req.id] ? theme.colors.mediumBlue : theme.colors.lightBlue}`,
                borderRadius: theme.borderRadius.sm
              }}>
                <div style={{
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: '600',
                  color: theme.colors.navy,
                  marginBottom: '0.5rem'
                }}>
                  {req.requirement}
                </div>
                <div style={{
                  fontSize: theme.fonts.sizes.xs,
                  color: theme.colors.darkNavy,
                  marginBottom: '0.75rem',
                  opacity: 0.8
                }}>
                  {req.speeds}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Cat5e', 'Cat6', 'Cat6a'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleAnswer(req.id, cat)}
                      style={{
                        padding: theme.spacing.xs,
                        background: answers[req.id] === cat ? theme.colors.mediumBlue : theme.colors.white,
                        color: answers[req.id] === cat ? theme.colors.white : theme.colors.darkNavy,
                        border: `2px solid ${theme.colors.mediumBlue}`,
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.fonts.sizes.sm,
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: theme.fonts.body,
                        transition: 'all 0.2s'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round 3: MAC Address Matching */}
      {currentRound === 3 && !showResults && (
        <div>
          <p style={{
            marginBottom: theme.spacing.md,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            background: `${theme.colors.lightBlue}20`,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.sm
          }}>
            Match each MAC address to its device type. Remember: <strong>FF:FF:FF:FF:FF:FF</strong> = Broadcast, <strong>01:00:5E</strong> = IPv4 Multicast.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {macDevices.map(device => (
              <div key={device.id} style={{
                padding: theme.spacing.md,
                background: answers[device.id] ? `${theme.colors.lightBlue}20` : theme.colors.white,
                border: `2px solid ${answers[device.id] ? theme.colors.mediumBlue : theme.colors.lightBlue}`,
                borderRadius: theme.borderRadius.sm
              }}>
                <div style={{
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: '700',
                  color: theme.colors.navy,
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  background: `${theme.colors.navy}10`,
                  padding: '0.5rem',
                  borderRadius: theme.borderRadius.sm
                }}>
                  {device.mac}
                </div>
                <div style={{
                  fontSize: theme.fonts.sizes.xs,
                  color: theme.colors.darkNavy,
                  marginBottom: '0.75rem',
                  textAlign: 'center',
                  opacity: 0.8
                }}>
                  {device.type}
                </div>

                <select
                  value={answers[device.id] || ''}
                  onChange={(e) => handleAnswer(device.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    border: `2px solid ${theme.colors.lightBlue}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.sm,
                    fontWeight: '600',
                    fontFamily: theme.fonts.body,
                    cursor: 'pointer',
                    background: theme.colors.white
                  }}
                >
                  <option value="">Select Device...</option>
                  {macDevices.map(d => (
                    <option key={d.device} value={d.device}>{d.device}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round 4: Frame Structure */}
      {currentRound === 4 && !showResults && (
        <div>
          <p style={{
            marginBottom: theme.spacing.md,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            background: `${theme.colors.lightBlue}20`,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.sm
          }}>
            Identify the position of each frame component. Remember the order: <strong>Preamble → SFD → Dest MAC → Source MAC → EtherType → Data → FCS</strong>
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {frameComponents.map(comp => (
              <div key={comp.id} style={{
                padding: theme.spacing.md,
                background: answers[comp.id] ? `${theme.colors.lightBlue}20` : theme.colors.white,
                border: `2px solid ${answers[comp.id] ? theme.colors.mediumBlue : theme.colors.lightBlue}`,
                borderRadius: theme.borderRadius.sm
              }}>
                <div style={{
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: '700',
                  color: theme.colors.navy,
                  marginBottom: '0.5rem'
                }}>
                  {comp.component}
                </div>
                <div style={{
                  fontSize: theme.fonts.sizes.xs,
                  color: theme.colors.darkNavy,
                  marginBottom: '0.75rem',
                  opacity: 0.8
                }}>
                  {comp.description}
                </div>

                <select
                  value={answers[comp.id] || ''}
                  onChange={(e) => handleAnswer(comp.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    border: `2px solid ${theme.colors.lightBlue}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fonts.sizes.sm,
                    fontWeight: '600',
                    fontFamily: theme.fonts.body,
                    cursor: 'pointer',
                    background: theme.colors.white
                  }}
                >
                  <option value="">Select Position...</option>
                  <option value="Start">Start of Frame</option>
                  <option value="2nd">2nd Component</option>
                  <option value="3rd">3rd Component</option>
                  <option value="4th">4th Component</option>
                  <option value="5th">5th Component</option>
                  <option value="6th">6th Component</option>
                  <option value="End">End of Frame</option>
                  <option value="All">Entire Frame</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {showResults && (
        <div>
          <div style={{
            padding: theme.spacing.lg,
            background: `${theme.colors.lightBlue}20`,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.lg,
            textAlign: 'center'
          }}>
            <h3 style={{
              margin: '0 0 1rem 0',
              fontSize: theme.fonts.sizes.xl,
              color: theme.colors.navy
            }}>
              Round {currentRound} Complete!
            </h3>
            <p style={{
              fontSize: theme.fonts.sizes.base,
              color: theme.colors.darkNavy,
              margin: 0
            }}>
              Review your answers below
            </p>
          </div>

          {/* Show correct answers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: theme.spacing.lg
          }}>
            {currentRound === 1 && cableScenarios.map(scenario => {
              const isCorrect = answers[scenario.id] === scenario.correct;
              return (
                <div key={scenario.id} style={{
                  padding: theme.spacing.md,
                  background: isCorrect ? '#ecfdf5' : '#fee2e2',
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: theme.borderRadius.sm
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {isCorrect ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    <span style={{ fontWeight: '700', color: theme.colors.navy }}>
                      {scenario.scenario}
                    </span>
                  </div>
                  <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
                    Your answer: <strong>{answers[scenario.id] || 'Not answered'}</strong><br />
                    Correct: <strong>{scenario.correct}</strong>
                  </div>
                </div>
              );
            })}

            {currentRound === 2 && speedRequirements.map(req => {
              const isCorrect = answers[req.id] === req.correct;
              return (
                <div key={req.id} style={{
                  padding: theme.spacing.md,
                  background: isCorrect ? '#ecfdf5' : '#fee2e2',
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: theme.borderRadius.sm
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {isCorrect ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    <span style={{ fontWeight: '700', color: theme.colors.navy }}>
                      {req.requirement}
                    </span>
                  </div>
                  <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
                    Your answer: <strong>{answers[req.id] || 'Not answered'}</strong><br />
                    Correct: <strong>{req.correct}</strong>
                  </div>
                </div>
              );
            })}

            {currentRound === 3 && macDevices.map(device => {
              const isCorrect = answers[device.id] === device.device;
              return (
                <div key={device.id} style={{
                  padding: theme.spacing.md,
                  background: isCorrect ? '#ecfdf5' : '#fee2e2',
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: theme.borderRadius.sm
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {isCorrect ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    <span style={{ fontWeight: '700', color: theme.colors.navy, fontFamily: 'monospace' }}>
                      {device.mac}
                    </span>
                  </div>
                  <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
                    Your answer: <strong>{answers[device.id] || 'Not answered'}</strong><br />
                    Correct: <strong>{device.device}</strong>
                  </div>
                </div>
              );
            })}

            {currentRound === 4 && frameComponents.map(comp => {
              const isCorrect = answers[comp.id] === comp.position;
              return (
                <div key={comp.id} style={{
                  padding: theme.spacing.md,
                  background: isCorrect ? '#ecfdf5' : '#fee2e2',
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: theme.borderRadius.sm
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {isCorrect ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    <span style={{ fontWeight: '700', color: theme.colors.navy }}>
                      {comp.component}
                    </span>
                  </div>
                  <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
                    Your answer: <strong>{answers[comp.id] || 'Not answered'}</strong><br />
                    Correct: <strong>{comp.position}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={nextRound}
            style={{
              width: '100%',
              padding: theme.spacing.md,
              background: theme.colors.mediumBlue,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.lg,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.navy;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.mediumBlue;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {currentRound < 4 ? (
              <>
                Next Round <Target size={24} />
              </>
            ) : (
              <>
                View Final Results <Trophy size={24} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Check Answers Button */}
      {!showResults && (
        <button
          onClick={checkRound}
          disabled={Object.keys(answers).length < roundData.data.length}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            background: Object.keys(answers).length < roundData.data.length 
              ? theme.colors.lightBlue 
              : `linear-gradient(135deg, ${theme.colors.mediumBlue} 0%, ${theme.colors.navy} 100%)`,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.lg,
            fontWeight: '700',
            cursor: Object.keys(answers).length < roundData.data.length ? 'not-allowed' : 'pointer',
            fontFamily: theme.fonts.body,
            transition: 'all 0.3s',
            marginTop: theme.spacing.lg,
            boxShadow: Object.keys(answers).length >= roundData.data.length ? theme.shadows.large : 'none'
          }}
        >
          {Object.keys(answers).length >= roundData.data.length ? (
            `✅ Check Answers (${Object.keys(answers).length}/${roundData.data.length})`
          ) : (
            `Answer All Questions (${Object.keys(answers).length}/${roundData.data.length})`
          )}
        </button>
      )}
    </div>
  );
};

export default EthernetMasterGame;