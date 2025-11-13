import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Award, Zap, AlertTriangle } from 'lucide-react';
import theme from '../../styles/theme';

const DHCPTroubleshooter = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, results
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [answeredScenarios, setAnsweredScenarios] = useState([]);

  const scenarios = [
    {
      id: 1,
      title: "Client Getting APIPA Address",
      situation: "A user reports their laptop shows IP address 169.254.100.50. They can't access the network or internet.",
      symptoms: [
        "IP: 169.254.100.50",
        "Subnet: 255.255.0.0",
        "No default gateway",
        "No DNS servers"
      ],
      question: "What is the PRIMARY issue?",
      options: [
        "DNS server is down",
        "DHCP server is unavailable or unreachable",
        "IP address conflict",
        "Wrong VLAN assignment"
      ],
      correct: 1,
      explanation: "169.254.x.x is APIPA (Automatic Private IP Addressing). This means the DHCP client tried to get an IP address but couldn't reach a DHCP server, so Windows assigned itself an APIPA address.",
      hint: "What does 169.254.x.x indicate about DHCP?",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Wrong Subnet Assignment",
      situation: "A new computer gets IP 192.168.5.100 but can't reach the default gateway at 192.168.1.1. Other devices work fine.",
      symptoms: [
        "IP: 192.168.5.100",
        "Gateway: 192.168.1.1",
        "Can't ping gateway",
        "Other PCs work normally"
      ],
      question: "What is causing this issue?",
      options: [
        "Gateway is down",
        "Rogue DHCP server assigning wrong subnet",
        "Cable is bad",
        "DNS is misconfigured"
      ],
      correct: 1,
      explanation: "The client is on subnet 192.168.5.0 but the gateway is on 192.168.1.0 - they're on different subnets! This indicates a rogue DHCP server is handing out incorrect network parameters.",
      hint: "Compare the IP address subnet to the gateway subnet. Are they the same?",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "DHCP Scope Exhaustion",
      situation: "10 new employees' computers can't get IP addresses. Existing computers work fine. DHCP server is running.",
      symptoms: [
        "New devices: 169.254.x.x",
        "Existing devices: working",
        "DHCP server: online",
        "Server shows: 0 available IPs"
      ],
      question: "What should you do FIRST?",
      options: [
        "Restart DHCP server",
        "Check and expand DHCP scope range",
        "Disable existing devices",
        "Reconfigure DNS settings"
      ],
      correct: 1,
      explanation: "DHCP scope exhaustion means all available IP addresses in the pool have been assigned. You need to either expand the scope range, reduce lease time, or remove stale leases.",
      hint: "What does '0 available IPs' tell you about the DHCP pool?",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Duplicate IP Conflict",
      situation: "User gets frequent 'IP address conflict' error messages. Network connectivity is intermittent.",
      symptoms: [
        "Error: 'IP address conflict'",
        "Intermittent connectivity",
        "IP: 192.168.1.50 (static)",
        "DHCP range: 192.168.1.1-200"
      ],
      question: "What is the root cause?",
      options: [
        "DHCP server malfunction",
        "Static IP overlaps with DHCP scope",
        "Network cable issue",
        "Wrong subnet mask"
      ],
      correct: 1,
      explanation: "The static IP (192.168.1.50) falls within the DHCP range (192.168.1.1-200). The DHCP server can assign this IP to another device, causing conflicts. Always exclude static IPs from DHCP scopes!",
      hint: "Is the static IP address inside or outside the DHCP range?",
      difficulty: "medium"
    },
    {
      id: 5,
      title: "DHCP Across Subnets",
      situation: "Building B devices can't get DHCP addresses. Building A (where DHCP server is) works fine. Buildings are on different subnets.",
      symptoms: [
        "Building A: DHCP works",
        "Building B: APIPA addresses",
        "Different subnets per building",
        "Router between buildings"
      ],
      question: "What configuration is missing?",
      options: [
        "DNS forwarding",
        "IP helper/DHCP relay on router",
        "Static routes",
        "VLAN tagging"
      ],
      correct: 1,
      explanation: "DHCP uses broadcasts, which don't cross routers. You need to configure IP helper (DHCP relay) on the router interface to forward DHCP requests from Building B to the DHCP server in Building A.",
      hint: "How do DHCP broadcasts behave when they reach a router?",
      difficulty: "hard"
    },
    {
      id: 6,
      title: "Lease Renewal Failure",
      situation: "Users report sudden network disconnections every few hours. After disconnection, running 'ipconfig /renew' fixes it temporarily.",
      symptoms: [
        "Periodic disconnections",
        "Manual renewal works",
        "Happens every 4 hours",
        "Lease time: 8 hours"
      ],
      question: "What is likely the problem?",
      options: [
        "DHCP server offline during renewal (50% mark)",
        "DNS server issues",
        "Switch port problems",
        "IP address conflicts"
      ],
      correct: 0,
      explanation: "DHCP clients attempt to renew their lease at 50% of the lease time (4 hours for an 8-hour lease). If the DHCP server is unreachable during this renewal window, the client will lose connectivity when the lease expires.",
      hint: "At what percentage of lease time does DHCP renewal occur?",
      difficulty: "hard"
    },
    {
      id: 7,
      title: "Wrong DNS Settings",
      situation: "Clients get IP addresses via DHCP but can't browse websites by name. Pinging IP addresses works fine.",
      symptoms: [
        "IP config: looks correct",
        "Can ping 8.8.8.8",
        "Can't browse google.com",
        "nslookup times out"
      ],
      question: "What DHCP option is misconfigured?",
      options: [
        "Option 3 (Default Gateway)",
        "Option 6 (DNS Servers)",
        "Option 15 (Domain Name)",
        "Option 42 (NTP Server)"
      ],
      correct: 1,
      explanation: "Option 6 provides DNS server addresses. If this is wrong or missing, clients can't resolve domain names to IP addresses, but direct IP communication still works.",
      hint: "What converts website names to IP addresses?",
      difficulty: "medium"
    },
    {
      id: 8,
      title: "VLAN DHCP Issue",
      situation: "Data VLAN (VLAN 10) gets DHCP fine. Voice VLAN (VLAN 20) devices can't get IP addresses.",
      symptoms: [
        "VLAN 10: DHCP works",
        "VLAN 20: APIPA addresses",
        "Single DHCP server",
        "Separate DHCP scopes exist"
      ],
      question: "What's the most likely issue?",
      options: [
        "DHCP server down",
        "IP helper not configured for VLAN 20",
        "Wrong subnet mask",
        "Cable problems"
      ],
      correct: 1,
      explanation: "Each VLAN needs its own IP helper/DHCP relay configuration on the router or Layer 3 switch. VLAN 10 is configured correctly, but VLAN 20's IP helper is missing or misconfigured.",
      hint: "Do VLANs segment broadcast domains?",
      difficulty: "hard"
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentScenario(0);
    setScore(0);
    setTimeBonus(0);
    setStartTime(Date.now());
    setShowHint(false);
    setAnsweredScenarios([]);
  };

  const handleAnswer = (selectedIndex) => {
    const scenario = scenarios[currentScenario];
    const isCorrect = selectedIndex === scenario.correct;
    const timeElapsed = (Date.now() - startTime) / 1000;
    
    let points = 0;
    let bonus = 0;
    
    if (isCorrect) {
      // Base points by difficulty
      points = scenario.difficulty === 'easy' ? 10 : scenario.difficulty === 'medium' ? 15 : 20;
      
      // Time bonus (faster = more points)
      if (timeElapsed < 15) {
        bonus = 10;
      } else if (timeElapsed < 30) {
        bonus = 5;
      }
      
      // Penalty for using hint
      if (showHint) {
        bonus = Math.max(0, bonus - 3);
      }
    }

    const totalPoints = points + bonus;
    setScore(score + totalPoints);
    setTimeBonus(timeBonus + bonus);

    setAnsweredScenarios([...answeredScenarios, {
      scenario: scenario,
      selectedAnswer: selectedIndex,
      correct: isCorrect,
      points: totalPoints,
      timeElapsed: timeElapsed
    }]);

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setStartTime(Date.now());
        setShowHint(false);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div style={{
        padding: theme.spacing.xl,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        border: `3px solid ${theme.colors.mediumBlue}`,
        boxShadow: theme.shadows.large
      }}>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔧</div>
          <h2 style={{
            margin: 0,
            fontSize: theme.fonts.sizes.xxl,
            color: theme.colors.navy,
            marginBottom: '1rem'
          }}>
            DHCP Troubleshooter
          </h2>
          <p style={{
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.base,
            marginBottom: theme.spacing.lg,
            lineHeight: '1.6'
          }}>
            Test your DHCP troubleshooting skills with real-world scenarios! 
            Diagnose problems quickly and earn bonus points for speed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.lg
        }}>
          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.lightBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{ fontWeight: '600', color: theme.colors.navy }}>
              8 Scenarios
            </div>
            <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
              Real-world problems
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.mediumBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <div style={{ fontWeight: '600', color: theme.colors.navy }}>
              Speed Bonus
            </div>
            <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
              Faster = more points
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.yellow}40`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
            <div style={{ fontWeight: '600', color: theme.colors.navy }}>
              Hints Available
            </div>
            <div style={{ fontSize: theme.fonts.sizes.sm, color: theme.colors.darkNavy }}>
              Use wisely!
            </div>
          </div>
        </div>

        <button
          onClick={startGame}
          style={{
            width: '100%',
            padding: theme.spacing.lg,
            background: theme.gradients.primary,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.fonts.sizes.lg,
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: theme.fonts.body,
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.shadows.large;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Zap size={24} />
          Start Troubleshooting
        </button>

        <div style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          background: `${theme.colors.lightBlue}10`,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.fonts.sizes.sm,
          color: theme.colors.darkNavy,
          lineHeight: '1.6'
        }}>
          <strong>💡 Tips:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            <li>Read symptoms carefully</li>
            <li>Answer quickly for time bonuses</li>
            <li>Use hints if stuck (small point penalty)</li>
            <li>Think layer-by-layer troubleshooting</li>
          </ul>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === 'playing') {
    const scenario = scenarios[currentScenario];
    const answered = answeredScenarios.find(a => a.scenario.id === scenario.id);

    return (
      <div style={{
        padding: theme.spacing.lg,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        border: `2px solid ${theme.colors.mediumBlue}`
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
          <div style={{
            padding: '0.5rem 1rem',
            background: theme.colors.mediumBlue,
            color: theme.colors.white,
            borderRadius: theme.borderRadius.sm,
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Award size={20} />
            Score: {score}
          </div>

          <div style={{
            color: theme.colors.darkNavy,
            fontWeight: '600'
          }}>
            Scenario {currentScenario + 1} / {scenarios.length}
          </div>

          <div style={{
            padding: '0.5rem 1rem',
            background: scenario.difficulty === 'easy' ? theme.colors.lightBlue : 
                       scenario.difficulty === 'medium' ? theme.colors.yellow :
                       '#ef4444',
            color: scenario.difficulty === 'easy' ? theme.colors.white : theme.colors.darkNavy,
            borderRadius: theme.borderRadius.sm,
            fontWeight: '600',
            fontSize: theme.fonts.sizes.sm
          }}>
            {scenario.difficulty.toUpperCase()}
          </div>
        </div>

        {/* Scenario Card */}
        <div style={{
          padding: theme.spacing.lg,
          background: theme.gradients.dark,
          color: theme.colors.white,
          borderRadius: theme.borderRadius.md,
          marginBottom: theme.spacing.lg
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: theme.fonts.sizes.xl,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertTriangle size={24} />
            {scenario.title}
          </h3>
          <p style={{
            margin: '0 0 1rem 0',
            fontSize: theme.fonts.sizes.base,
            lineHeight: '1.6'
          }}>
            {scenario.situation}
          </p>

          <div style={{
            padding: theme.spacing.md,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: theme.borderRadius.sm
          }}>
            <div style={{
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: theme.fonts.sizes.sm
            }}>
              📋 Symptoms:
            </div>
            {scenario.symptoms.map((symptom, idx) => (
              <div key={idx} style={{
                fontSize: theme.fonts.sizes.sm,
                marginLeft: '1rem',
                marginBottom: '0.25rem'
              }}>
                • {symptom}
              </div>
            ))}
          </div>
        </div>

        {/* Question */}
        <div style={{
          fontSize: theme.fonts.sizes.lg,
          fontWeight: '600',
          color: theme.colors.navy,
          marginBottom: theme.spacing.md
        }}>
          {scenario.question}
        </div>

        {/* Hint Button */}
        {!showHint && !answered && (
          <button
            onClick={() => setShowHint(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              background: theme.colors.yellow,
              color: theme.colors.darkNavy,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.sm,
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: theme.spacing.md,
              fontFamily: theme.fonts.body
            }}
          >
            <Lightbulb size={16} />
            Show Hint (-3 bonus points)
          </button>
        )}

        {/* Hint Display */}
        {showHint && !answered && (
          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.yellow}30`,
            border: `2px solid ${theme.colors.yellow}`,
            borderRadius: theme.borderRadius.sm,
            marginBottom: theme.spacing.md,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Lightbulb size={20} color={theme.colors.darkNavy} />
            <span style={{ color: theme.colors.darkNavy, fontWeight: '600' }}>
              {scenario.hint}
            </span>
          </div>
        )}

        {/* Answer Options */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm
        }}>
          {scenario.options.map((option, idx) => {
            const isCorrect = idx === scenario.correct;
            const isSelected = answered && answered.selectedAnswer === idx;
            
            let backgroundColor = theme.colors.white;
            let borderColor = theme.colors.lightBlue;
            
            if (answered) {
              if (isCorrect) {
                backgroundColor = '#ecfdf5';
                borderColor = '#10b981';
              } else if (isSelected) {
                backgroundColor = '#fee2e2';
                borderColor = '#ef4444';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(idx)}
                disabled={answered !== undefined}
                style={{
                  padding: theme.spacing.md,
                  background: backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: '600',
                  color: theme.colors.darkNavy,
                  cursor: answered ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: theme.fonts.body,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  if (!answered) {
                    e.currentTarget.style.background = `${theme.colors.lightBlue}30`;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!answered) {
                    e.currentTarget.style.background = theme.colors.white;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {answered && isCorrect && <CheckCircle size={20} color="#10b981" />}
                {answered && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
            background: answered.correct ? '#ecfdf5' : '#fee2e2',
            border: `2px solid ${answered.correct ? '#10b981' : '#ef4444'}`,
            borderRadius: theme.borderRadius.sm
          }}>
            <div style={{
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: answered.correct ? '#065f46' : '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {answered.correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
              {answered.correct ? `Correct! +${answered.points} points` : 'Not quite right'}
            </div>
            <p style={{
              margin: 0,
              color: answered.correct ? '#065f46' : '#991b1b',
              fontSize: theme.fonts.sizes.sm,
              lineHeight: '1.6'
            }}>
              {scenario.explanation}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const totalCorrect = answeredScenarios.filter(a => a.correct).length;
    const accuracy = Math.round((totalCorrect / scenarios.length) * 100);
    const grade = accuracy >= 90 ? 'A+' : accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : accuracy >= 60 ? 'C' : 'Keep Learning!';
    const emoji = accuracy >= 90 ? '🏆' : accuracy >= 80 ? '⭐' : accuracy >= 70 ? '👍' : accuracy >= 60 ? '📚' : '💪';

    return (
      <div style={{
        padding: theme.spacing.xl,
        background: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        border: `3px solid ${theme.colors.mediumBlue}`,
        boxShadow: theme.shadows.large
      }}>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{emoji}</div>
          <h2 style={{
            margin: 0,
            fontSize: theme.fonts.sizes.xxl,
            color: theme.colors.navy,
            marginBottom: '0.5rem'
          }}>
            Troubleshooting Complete!
          </h2>
          <div style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: theme.colors.mediumBlue,
            marginBottom: '1rem'
          }}>
            {score} Points
          </div>
          <div style={{
            fontSize: theme.fonts.sizes.lg,
            color: theme.colors.darkNavy,
            fontWeight: '600'
          }}>
            Grade: {grade}
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl
        }}>
          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.lightBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Accuracy
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              {accuracy}%
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.mediumBlue}20`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Correct
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              {totalCorrect} / {scenarios.length}
            </div>
          </div>

          <div style={{
            padding: theme.spacing.md,
            background: `${theme.colors.yellow}40`,
            borderRadius: theme.borderRadius.sm,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <div style={{ fontSize: theme.fonts.sizes.xs, color: theme.colors.darkNavy }}>
              Time Bonus
            </div>
            <div style={{ fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.navy }}>
              +{timeBonus}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={startGame}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              background: theme.gradients.primary,
              color: theme.colors.white,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body
            }}
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => setGameState('menu')}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              background: theme.colors.white,
              color: theme.colors.mediumBlue,
              border: `2px solid ${theme.colors.mediumBlue}`,
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.base,
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: theme.fonts.body
            }}
          >
            🏠 Main Menu
          </button>
        </div>

        {/* Performance Message */}
        <div style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          background: `${theme.colors.lightBlue}10`,
          borderRadius: theme.borderRadius.sm,
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: theme.colors.darkNavy,
            fontSize: theme.fonts.sizes.sm,
            lineHeight: '1.6'
          }}>
            {accuracy >= 90 && "🎉 Outstanding! You're a DHCP troubleshooting expert!"}
            {accuracy >= 70 && accuracy < 90 && "👏 Great job! You understand DHCP well!"}
            {accuracy >= 50 && accuracy < 70 && "💪 Good effort! Review Day 5 material and try again!"}
            {accuracy < 50 && "📚 Keep practicing! Review DHCP DORA process and troubleshooting steps!"}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default DHCPTroubleshooter;