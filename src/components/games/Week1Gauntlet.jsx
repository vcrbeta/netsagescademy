import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Heart, Star, Clock, Award, Target, ChevronRight, RotateCw, CheckCircle, XCircle, Flame, Shield, Sparkles } from 'lucide-react';
import theme from '../../styles/theme';

const Week1Gauntlet = () => {
  // Game State
  const [gameState, setGameState] = useState('intro'); // intro, playing, results, achievements
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState({});
  const [powerUps, setPowerUps] = useState({
    fiftyFifty: 2,
    extraTime: 1,
    skip: 1
  });
  const [activePowerUp, setActivePowerUp] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [finalStats, setFinalStats] = useState(null);

  // Game Rounds (Each represents a day's content)
  const rounds = [
    {
      id: 1,
      title: "OSI & Models Mayhem",
      emoji: "🏛️",
      color: theme.colors.mediumBlue,
      day: 1,
      questions: [
        {
          type: 'multiple',
          question: "Which OSI layer uses MAC addresses?",
          options: ["Physical", "Data Link", "Network", "Transport"],
          correct: "Data Link",
          points: 100,
          explanation: "Layer 2 (Data Link) uses MAC addresses for local network addressing!"
        },
        {
          type: 'multiple',
          question: "What is the correct encapsulation order (top to bottom)?",
          options: [
            "Data → Segment → Packet → Frame → Bits",
            "Bits → Frame → Packet → Segment → Data",
            "Frame → Packet → Segment → Data → Bits",
            "Packet → Frame → Segment → Data → Bits"
          ],
          correct: "Data → Segment → Packet → Frame → Bits",
          points: 150,
          explanation: "Perfect! Data moves DOWN the stack during encapsulation!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: Routers operate at Layer 2",
          correct: false,
          points: 100,
          explanation: "FALSE! Routers operate at Layer 3 (Network layer)!"
        },
        {
          type: 'multiple',
          question: "Which layer provides end-to-end communication?",
          options: ["Session", "Transport", "Network", "Application"],
          correct: "Transport",
          points: 100,
          explanation: "Layer 4 (Transport) provides end-to-end communication with TCP/UDP!"
        },
        {
          type: 'multiple',
          question: "What is the TCP/IP model's equivalent to OSI Layers 5-7?",
          options: ["Application", "Transport", "Internet", "Network Access"],
          correct: "Application",
          points: 150,
          explanation: "The TCP/IP Application layer combines OSI layers 5, 6, and 7!"
        }
      ]
    },
    {
      id: 2,
      title: "Port Number Speed Challenge",
      emoji: "🚪",
      color: theme.colors.navy,
      day: 2,
      questions: [
        {
          type: 'multiple',
          question: "What port does HTTPS use?",
          options: ["80", "443", "8080", "22"],
          correct: "443",
          points: 100,
          explanation: "Port 443 is for secure HTTPS traffic!"
        },
        {
          type: 'multiple',
          question: "SSH operates on which port?",
          options: ["21", "22", "23", "25"],
          correct: "22",
          points: 100,
          explanation: "Port 22 is for SSH (Secure Shell)!"
        },
        {
          type: 'multiple',
          question: "Which protocol uses BOTH TCP and UDP port 53?",
          options: ["FTP", "DHCP", "DNS", "HTTP"],
          correct: "DNS",
          points: 150,
          explanation: "DNS uses port 53 with both TCP (zone transfers) and UDP (queries)!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: TCP is faster than UDP",
          correct: false,
          points: 100,
          explanation: "FALSE! UDP is faster because it has no connection overhead!"
        },
        {
          type: 'multiple',
          question: "What are the three steps in TCP's handshake?",
          options: [
            "SYN, SYN-ACK, ACK",
            "CONNECT, SEND, CLOSE",
            "START, TRANSFER, END",
            "REQUEST, REPLY, CONFIRM"
          ],
          correct: "SYN, SYN-ACK, ACK",
          points: 150,
          explanation: "Perfect! The three-way handshake: SYN → SYN-ACK → ACK!"
        },
        {
          type: 'multiple',
          question: "SMTP uses which port?",
          options: ["25", "110", "143", "587"],
          correct: "25",
          points: 100,
          explanation: "Port 25 is for SMTP (though 587 is for secure SMTP)!"
        }
      ]
    },
    {
      id: 3,
      title: "Protocol Detective",
      emoji: "🔍",
      color: theme.colors.mediumBlue,
      day: 3,
      questions: [
        {
          type: 'multiple',
          question: "Which email protocol keeps messages on the server?",
          options: ["SMTP", "POP3", "IMAP", "HTTP"],
          correct: "IMAP",
          points: 100,
          explanation: "IMAP keeps emails on the server and syncs across devices!"
        },
        {
          type: 'multiple',
          question: "What does HTTP status code 404 mean?",
          options: ["OK", "Not Found", "Server Error", "Redirect"],
          correct: "Not Found",
          points: 100,
          explanation: "404 means the requested resource was not found!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: FTP is secure and encrypted",
          correct: false,
          points: 100,
          explanation: "FALSE! FTP sends everything in clear text. Use SFTP instead!"
        },
        {
          type: 'multiple',
          question: "Which DNS record maps hostname to IPv4?",
          options: ["AAAA", "CNAME", "A", "MX"],
          correct: "A",
          points: 150,
          explanation: "An A record maps a hostname to an IPv4 address!"
        },
        {
          type: 'multiple',
          question: "What should you use instead of Telnet?",
          options: ["FTP", "SSH", "HTTP", "SMTP"],
          correct: "SSH",
          points: 100,
          explanation: "SSH is the secure replacement for Telnet!"
        }
      ]
    },
    {
      id: 4,
      title: "Subnetting Sprint",
      emoji: "🔢",
      color: theme.colors.navy,
      day: 4,
      questions: [
        {
          type: 'multiple',
          question: "How many usable hosts in a /26 network?",
          options: ["32", "62", "64", "126"],
          correct: "62",
          points: 150,
          explanation: "64 total - 2 (network & broadcast) = 62 usable hosts!"
        },
        {
          type: 'multiple',
          question: "What does 169.254.x.x indicate?",
          options: ["Valid DHCP", "APIPA - DHCP failed", "Private address", "Loopback"],
          correct: "APIPA - DHCP failed",
          points: 100,
          explanation: "169.254.x.x is APIPA - auto-assigned when DHCP fails!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: 192.168.1.0 is a valid host address",
          correct: false,
          points: 100,
          explanation: "FALSE! .0 is the network address, not a usable host!"
        },
        {
          type: 'multiple',
          question: "How many bits in an IPv6 address?",
          options: ["32", "64", "128", "256"],
          correct: "128",
          points: 100,
          explanation: "IPv6 uses 128 bits, way more than IPv4's 32 bits!"
        },
        {
          type: 'multiple',
          question: "Which is a private IP range?",
          options: ["169.254.0.0/16", "192.168.0.0/16", "127.0.0.0/8", "224.0.0.0/4"],
          correct: "192.168.0.0/16",
          points: 100,
          explanation: "192.168.0.0/16 is one of the three private IP ranges (RFC 1918)!"
        }
      ]
    },
    {
      id: 5,
      title: "DHCP Dash",
      emoji: "⚡",
      color: theme.colors.mediumBlue,
      day: 5,
      questions: [
        {
          type: 'multiple',
          question: "What is the correct DHCP DORA order?",
          options: [
            "Discover, Offer, Request, Acknowledge",
            "Discover, Request, Offer, Acknowledge",
            "Offer, Discover, Request, Acknowledge",
            "Request, Offer, Discover, Acknowledge"
          ],
          correct: "Discover, Offer, Request, Acknowledge",
          points: 150,
          explanation: "DORA: Discover → Offer → Request → Acknowledge!"
        },
        {
          type: 'multiple',
          question: "At what % of lease time does renewal first attempt?",
          options: ["25%", "50%", "75%", "87.5%"],
          correct: "50%",
          points: 150,
          explanation: "Client first tries to renew at 50% of lease time!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: Servers should use DHCP",
          correct: false,
          points: 100,
          explanation: "FALSE! Servers need static IPs for consistent access!"
        },
        {
          type: 'multiple',
          question: "Which DHCP option provides the default gateway?",
          options: ["Option 3", "Option 6", "Option 15", "Option 66"],
          correct: "Option 3",
          points: 150,
          explanation: "Option 3 is the default gateway (router) option!"
        },
        {
          type: 'multiple',
          question: "What prevents rogue DHCP servers?",
          options: ["DHCP relay", "DHCP snooping", "DHCP failover", "DHCP split scope"],
          correct: "DHCP snooping",
          points: 150,
          explanation: "DHCP snooping on switches blocks unauthorized DHCP servers!"
        }
      ]
    },
    {
      id: 6,
      title: "Ethernet Express",
      emoji: "🔌",
      color: theme.colors.navy,
      day: 6,
      questions: [
        {
          type: 'multiple',
          question: "How many bytes in a MAC address?",
          options: ["4", "6", "8", "12"],
          correct: "6",
          points: 100,
          explanation: "MAC addresses are 6 bytes (48 bits)!"
        },
        {
          type: 'multiple',
          question: "What is the broadcast MAC address?",
          options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "AA:AA:AA:AA:AA:AA", "11:11:11:11:11:11"],
          correct: "FF:FF:FF:FF:FF:FF",
          points: 100,
          explanation: "All Fs (FF:FF:FF:FF:FF:FF) is the broadcast MAC!"
        },
        {
          type: 'multiple',
          question: "Which cable supports 10GbE at 100 meters?",
          options: ["Cat5e", "Cat6", "Cat6a", "Cat7"],
          correct: "Cat6a",
          points: 150,
          explanation: "Cat6a supports 10 Gigabit Ethernet at the full 100 meters!"
        },
        {
          type: 'truefalse',
          question: "TRUE or FALSE: Full-duplex eliminates collisions",
          correct: true,
          points: 100,
          explanation: "TRUE! Full-duplex allows simultaneous send/receive with no collisions!"
        },
        {
          type: 'multiple',
          question: "How many collision domains in a 24-port switch?",
          options: ["1", "12", "24", "48"],
          correct: "24",
          points: 150,
          explanation: "Each switch port is its own collision domain!"
        },
        {
          type: 'multiple',
          question: "What prevents switching loops?",
          options: ["STP", "DHCP", "ARP", "ICMP"],
          correct: "STP",
          points: 100,
          explanation: "Spanning Tree Protocol (STP) prevents loops!"
        }
      ]
    },
    {
      id: 7,
      title: "🔥 LIGHTNING ROUND 🔥",
      emoji: "⚡",
      color: theme.colors.yellow,
      day: 'mixed',
      timeLimit: 10, // Faster!
      questions: [
        {
          type: 'multiple',
          question: "QUICK! Which layer: Routers?",
          options: ["Layer 2", "Layer 3", "Layer 4", "Layer 7"],
          correct: "Layer 3",
          points: 200,
          explanation: "Layer 3 (Network)!"
        },
        {
          type: 'multiple',
          question: "QUICK! HTTPS port?",
          options: ["80", "443", "22", "25"],
          correct: "443",
          points: 200,
          explanation: "443!"
        },
        {
          type: 'multiple',
          question: "QUICK! /24 = how many hosts?",
          options: ["126", "254", "510", "1022"],
          correct: "254",
          points: 200,
          explanation: "254 usable hosts!"
        },
        {
          type: 'truefalse',
          question: "QUICK! TCP is connectionless?",
          correct: false,
          points: 200,
          explanation: "FALSE! TCP is connection-oriented!"
        },
        {
          type: 'multiple',
          question: "QUICK! MAC address bytes?",
          options: ["4", "6", "8", "16"],
          correct: "6",
          points: 200,
          explanation: "6 bytes (48 bits)!"
        }
      ]
    }
  ];

  // Timer Effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  const handleTimeout = () => {
    setLives(lives - 1);
    setStreak(0);
    setShowFeedback(true);
    setLastAnswerCorrect(false);
    
    setTimeout(() => {
      if (lives - 1 <= 0) {
        endGame();
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  const handleAnswer = (answer) => {
    const round = rounds[currentRound];
    const question = round.questions[currentQuestion];
    const isCorrect = answer === question.correct;

    // Calculate points
    let points = 0;
    if (isCorrect) {
      points = question.points;
      
      // Time bonus (faster = more points)
      const timeBonus = Math.floor((timeLeft / 15) * 50);
      points += timeBonus;
      
      // Streak multiplier
      const newStreak = streak + 1;
      if (newStreak >= 3) {
        points *= 1.5;
        setBonusPoints(Math.floor(points * 0.5));
      }
      
      setScore(score + Math.floor(points));
      setStreak(newStreak);
      
      // Check for achievements
      checkAchievements(newStreak, timeLeft);
    } else {
      setLives(lives - 1);
      setStreak(0);
      setBonusPoints(0);
    }

    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    setAnswers({
      ...answers,
      [`${currentRound}-${currentQuestion}`]: { answer, isCorrect, points }
    });

    // Move to next question after delay
    setTimeout(() => {
      if (!isCorrect && lives - 1 <= 0) {
        endGame();
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setActivePowerUp(null);
    setBonusPoints(0);
    
    const round = rounds[currentRound];
    
    if (currentQuestion + 1 < round.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(round.timeLimit || 15);
    } else if (currentRound + 1 < rounds.length) {
      // Next round!
      setCurrentRound(currentRound + 1);
      setCurrentQuestion(0);
      setTimeLeft(rounds[currentRound + 1].timeLimit || 15);
    } else {
      // Game complete!
      endGame();
    }
  };

  const handlePowerUp = (type) => {
    if (powerUps[type] <= 0) return;
    
    setPowerUps({
      ...powerUps,
      [type]: powerUps[type] - 1
    });
    
    setActivePowerUp(type);
    
    if (type === 'extraTime') {
      setTimeLeft(timeLeft + 10);
    } else if (type === 'skip') {
      nextQuestion();
    }
  };

  const checkAchievements = (currentStreak, time) => {
    const newAchievements = [];
    
    if (currentStreak === 5) {
      newAchievements.push({
        title: "🔥 ON FIRE!",
        description: "5 correct answers in a row!"
      });
    }
    
    if (currentStreak === 10) {
      newAchievements.push({
        title: "🚀 UNSTOPPABLE!",
        description: "10 correct answers in a row!"
      });
    }
    
    if (time >= 13) {
      newAchievements.push({
        title: "⚡ SPEED DEMON!",
        description: "Answered with 13+ seconds left!"
      });
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  const endGame = () => {
    // Calculate final statistics
    const totalQuestions = Object.keys(answers).length;
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate performance by day
    const byDay = {};
    Object.entries(answers).forEach(([key, value]) => {
      const [roundIdx] = key.split('-');
      const round = rounds[parseInt(roundIdx)];
      if (round.day !== 'mixed') {
        if (!byDay[round.day]) {
          byDay[round.day] = { correct: 0, total: 0 };
        }
        byDay[round.day].total++;
        if (value.isCorrect) {
          byDay[round.day].correct++;
        }
      }
    });
    
    // Determine letter grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    
    setFinalStats({
      score,
      totalQuestions,
      correctAnswers,
      percentage,
      grade,
      byDay,
      maxStreak: Math.max(...Object.values(answers).map((_, i) => streak)),
      achievements: achievements.length
    });
    
    setGameState('results');
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setTimeLeft(15);
    setAnswers({});
    setPowerUps({ fiftyFifty: 2, extraTime: 1, skip: 1 });
    setActivePowerUp(null);
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setBonusPoints(0);
    setAchievements([]);
    setFinalStats(null);
  };

  // Render functions
  const renderIntro = () => (
    <div style={{
      padding: theme.spacing.xl,
      background: `linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.mediumBlue} 100%)`,
      borderRadius: theme.borderRadius.lg,
      color: theme.colors.white,
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎮</div>
      <h1 style={{
        fontSize: '3rem',
        margin: '0 0 1rem 0',
        fontWeight: '800',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        NETWORK+ WEEK 1 GAUNTLET
      </h1>
      <p style={{
        fontSize: '1.25rem',
        marginBottom: '2rem',
        opacity: 0.9
      }}>
        Test your knowledge across ALL Week 1 topics!
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <div style={{
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: theme.borderRadius.md,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
          <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>7 ROUNDS</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Each round covers a different day's content
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: theme.borderRadius.md,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
          <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>3 LIVES</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Miss 3 questions and game over!
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: theme.borderRadius.md,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
          <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>POWER-UPS</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Use wisely: 50/50, Extra Time, Skip
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: theme.borderRadius.md,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
          <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>STREAKS</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Consecutive correct = bonus points!
          </div>
        </div>
      </div>

      <button
        onClick={() => setGameState('playing')}
        style={{
          padding: '1.5rem 3rem',
          fontSize: '1.5rem',
          fontWeight: '800',
          background: theme.colors.yellow,
          color: theme.colors.darkNavy,
          border: 'none',
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s',
          fontFamily: theme.fonts.body
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        }}
      >
        START GAUNTLET! 🚀
      </button>
    </div>
  );

  const renderQuestion = () => {
    const round = rounds[currentRound];
    const question = round.questions[currentQuestion];
    const progress = ((currentRound * rounds[0].questions.length + currentQuestion) / 
                     (rounds.reduce((sum, r) => sum + r.questions.length, 0))) * 100;

    return (
      <div style={{ position: 'relative' }}>
        {/* Header Bar */}
        <div style={{
          background: round.color,
          color: theme.colors.white,
          padding: '1.5rem',
          borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {round.emoji} Round {currentRound + 1}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              {round.title}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Lives */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  size={24}
                  fill={i < lives ? '#ef4444' : 'none'}
                  color={i < lives ? '#ef4444' : '#ffffff'}
                  opacity={i < lives ? 1 : 0.3}
                />
              ))}
            </div>

            {/* Score */}
            <div style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: theme.borderRadius.sm,
              backdropFilter: 'blur(10px)',
              fontSize: '1.25rem',
              fontWeight: '700'
            }}>
              <Trophy size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {score.toLocaleString()}
            </div>

            {/* Streak */}
            {streak > 0 && (
              <div style={{
                padding: '0.75rem 1.5rem',
                background: streak >= 5 ? theme.colors.yellow : 'rgba(255,255,255,0.2)',
                color: streak >= 5 ? theme.colors.darkNavy : theme.colors.white,
                borderRadius: theme.borderRadius.sm,
                fontSize: '1.25rem',
                fontWeight: '700',
                animation: streak >= 5 ? 'pulse 1s infinite' : 'none'
              }}>
                <Flame size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                {streak}x
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '8px',
          background: 'rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: theme.colors.yellow,
            transition: 'width 0.3s'
          }} />
        </div>

        {/* Question Content */}
        <div style={{
          padding: '2rem',
          background: theme.colors.white,
          borderRadius: `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`,
          boxShadow: theme.shadows.large
        }}>
          {/* Timer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: theme.colors.navy
            }}>
              Question {currentQuestion + 1} of {round.questions.length}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: timeLeft <= 5 ? '#fee2e2' : theme.colors.lightBlue + '20',
              color: timeLeft <= 5 ? '#991b1b' : theme.colors.darkNavy,
              borderRadius: theme.borderRadius.sm,
              fontSize: '1.5rem',
              fontWeight: '700',
              animation: timeLeft <= 5 ? 'shake 0.5s infinite' : 'none'
            }}>
              <Clock size={24} />
              {timeLeft}s
            </div>
          </div>

          {/* Question */}
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: theme.colors.navy,
            marginBottom: '2rem',
            lineHeight: '1.6',
            padding: '1.5rem',
            background: round.color + '10',
            borderRadius: theme.borderRadius.md,
            borderLeft: `4px solid ${round.color}`
          }}>
            {question.question}
          </div>

          {/* Power-ups */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handlePowerUp('fiftyFifty')}
              disabled={powerUps.fiftyFifty === 0 || question.type === 'truefalse'}
              style={{
                padding: '0.75rem 1.25rem',
                background: powerUps.fiftyFifty > 0 ? theme.colors.mediumBlue : '#ccc',
                color: theme.colors.white,
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                cursor: powerUps.fiftyFifty > 0 && question.type !== 'truefalse' ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: powerUps.fiftyFifty > 0 && question.type !== 'truefalse' ? 1 : 0.5
              }}
            >
              <Target size={18} />
              50/50 ({powerUps.fiftyFifty})
            </button>

            <button
              onClick={() => handlePowerUp('extraTime')}
              disabled={powerUps.extraTime === 0}
              style={{
                padding: '0.75rem 1.25rem',
                background: powerUps.extraTime > 0 ? theme.colors.navy : '#ccc',
                color: theme.colors.white,
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                cursor: powerUps.extraTime > 0 ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: powerUps.extraTime > 0 ? 1 : 0.5
              }}
            >
              <Clock size={18} />
              +10s ({powerUps.extraTime})
            </button>

            <button
              onClick={() => handlePowerUp('skip')}
              disabled={powerUps.skip === 0}
              style={{
                padding: '0.75rem 1.25rem',
                background: powerUps.skip > 0 ? theme.colors.yellow : '#ccc',
                color: theme.colors.darkNavy,
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                cursor: powerUps.skip > 0 ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: powerUps.skip > 0 ? 1 : 0.5
              }}
            >
              <ChevronRight size={18} />
              Skip ({powerUps.skip})
            </button>
          </div>

          {/* Answer Options */}
          {question.type === 'multiple' && (
            <div style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: question.options.length > 2 ? '1fr 1fr' : '1fr'
            }}>
              {question.options.map((option, idx) => {
                // 50/50 logic
                if (activePowerUp === 'fiftyFifty' && option !== question.correct) {
                  if (Math.random() > 0.5) return null; // Hide wrong answers
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    style={{
                      padding: '1.5rem',
                      background: theme.colors.white,
                      border: `3px solid ${theme.colors.lightBlue}`,
                      borderRadius: theme.borderRadius.md,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: theme.colors.darkNavy,
                      cursor: showFeedback ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      fontFamily: theme.fonts.body
                    }}
                    onMouseEnter={(e) => {
                      if (!showFeedback) {
                        e.currentTarget.style.borderColor = round.color;
                        e.currentTarget.style.background = round.color + '10';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showFeedback) {
                        e.currentTarget.style.borderColor = theme.colors.lightBlue;
                        e.currentTarget.style.background = theme.colors.white;
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'truefalse' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              {[true, false].map((option) => (
                <button
                  key={option.toString()}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  style={{
                    padding: '2rem',
                    background: option ? '#10b981' : '#ef4444',
                    color: theme.colors.white,
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    fontSize: '2rem',
                    fontWeight: '800',
                    cursor: showFeedback ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: theme.fonts.body
                  }}
                  onMouseEnter={(e) => {
                    if (!showFeedback) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showFeedback) {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {option ? 'TRUE ✓' : 'FALSE ✗'}
                </button>
              ))}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              background: lastAnswerCorrect ? '#d1fae5' : '#fee2e2',
              border: `3px solid ${lastAnswerCorrect ? '#10b981' : '#ef4444'}`,
              borderRadius: theme.borderRadius.md,
              animation: 'slideIn 0.3s'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {lastAnswerCorrect ? (
                  <>
                    <CheckCircle size={40} color="#10b981" />
                    <div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#065f46'
                      }}>
                        CORRECT! 🎉
                      </div>
                      {bonusPoints > 0 && (
                        <div style={{
                          fontSize: '1rem',
                          color: '#047857',
                          marginTop: '0.25rem'
                        }}>
                          +{bonusPoints} bonus points!
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle size={40} color="#ef4444" />
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#991b1b'
                    }}>
                      INCORRECT ❌
                    </div>
                  </>
                )}
              </div>
              
              <div style={{
                fontSize: '1rem',
                color: lastAnswerCorrect ? '#065f46' : '#991b1b',
                lineHeight: '1.6'
              }}>
                {question.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Achievement Popup */}
        {achievements.length > 0 && achievements[achievements.length - 1] && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.colors.yellow,
            padding: '2rem',
            borderRadius: theme.borderRadius.lg,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            zIndex: 1000,
            animation: 'bounce 0.5s',
            textAlign: 'center',
            minWidth: '300px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {achievements[achievements.length - 1].title}
            </div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: theme.colors.darkNavy
            }}>
              {achievements[achievements.length - 1].description}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    if (!finalStats) return null;

    return (
      <div style={{
        padding: theme.spacing.xl,
        background: finalStats.grade === 'A' ? 
          `linear-gradient(135deg, ${theme.colors.yellow} 0%, ${theme.colors.mediumBlue} 100%)` :
          `linear-gradient(135deg, ${theme.colors.mediumBlue} 0%, ${theme.colors.navy} 100%)`,
        borderRadius: theme.borderRadius.lg,
        color: theme.colors.white
      }}>
        {/* Celebration Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
            {finalStats.grade === 'A' ? '🏆' : 
             finalStats.grade === 'B' ? '⭐' :
             finalStats.grade === 'C' ? '✨' : '💪'}
          </div>
          <h1 style={{
            fontSize: '3rem',
            margin: '0 0 1rem 0',
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            GAUNTLET COMPLETE!
          </h1>
          
          {/* Grade Display */}
          <div style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: theme.borderRadius.lg,
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '5rem',
              fontWeight: '900',
              lineHeight: 1
            }}>
              {finalStats.grade}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {finalStats.percentage}%
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: theme.borderRadius.md,
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <Trophy size={32} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {finalStats.score.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Score</div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: theme.borderRadius.md,
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <Target size={32} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {finalStats.correctAnswers}/{finalStats.totalQuestions}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Correct</div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: theme.borderRadius.md,
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <Flame size={32} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {finalStats.maxStreak}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Best Streak</div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: theme.borderRadius.md,
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <Award size={32} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {finalStats.achievements}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Achievements</div>
          </div>
        </div>

        {/* Performance by Day */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          padding: '2rem',
          borderRadius: theme.borderRadius.md,
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.5rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Sparkles size={24} />
            Performance by Topic
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(finalStats.byDay).map(([day, stats]) => {
              const dayNames = {
                1: "OSI Models",
                2: "Protocols & Ports",
                3: "TCP/IP Apps",
                4: "Subnetting",
                5: "DHCP",
                6: "Ethernet"
              };
              
              const percentage = Math.round((stats.correct / stats.total) * 100);
              const isWeak = percentage < 70;

              return (
                <div key={day} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    flex: '0 0 150px',
                    fontWeight: '600'
                  }}>
                    Day {day}: {dayNames[day]}
                  </div>
                  
                  <div style={{
                    flex: 1,
                    height: '40px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: theme.borderRadius.sm,
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: isWeak ? '#ef4444' : '#10b981',
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.9rem'
                    }}>
                      {percentage}%
                    </div>
                  </div>

                  <div style={{
                    flex: '0 0 80px',
                    textAlign: 'right',
                    fontSize: '0.9rem'
                  }}>
                    {stats.correct}/{stats.total}
                    {isWeak && <span style={{ marginLeft: '0.5rem' }}>⚠️</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: theme.borderRadius.sm,
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            <strong>💡 Study Recommendations:</strong>
            <br />
            {Object.entries(finalStats.byDay).some(([_, stats]) => 
              (stats.correct / stats.total) < 0.7
            ) ? (
              <>
                Focus on reviewing:{' '}
                {Object.entries(finalStats.byDay)
                  .filter(([_, stats]) => (stats.correct / stats.total) < 0.7)
                  .map(([day]) => `Day ${day}`)
                  .join(', ')}
              </>
            ) : (
              "Excellent performance across all topics! You're ready for Week 2! 🚀"
            )}
          </div>
        </div>

        {/* Achievements Earned */}
        {achievements.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '2rem',
            borderRadius: theme.borderRadius.md,
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Star size={24} />
              Achievements Unlocked
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {achievements.map((achievement, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: theme.borderRadius.sm,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {achievement.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={resetGame}
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '800',
              background: theme.colors.white,
              color: theme.colors.navy,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.3s',
              fontFamily: theme.fonts.body
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
            }}
          >
            <RotateCw size={24} />
            PLAY AGAIN
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '800',
              background: 'rgba(255,255,255,0.2)',
              color: theme.colors.white,
              border: `3px solid ${theme.colors.white}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              fontFamily: theme.fonts.body
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.white;
              e.currentTarget.style.color = theme.colors.navy;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = theme.colors.white;
            }}
          >
            <ChevronRight size={24} />
            CONTINUE TO WEEK 2
          </button>
        </div>
      </div>
    );
  };

  // Add animations
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    `;
    if (!document.querySelector('style[data-game-animations]')) {
      styleTag.setAttribute('data-game-animations', 'true');
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div style={{
      padding: theme.spacing.lg,
      background: theme.colors.white,
      borderRadius: theme.borderRadius.md
    }}>
      {gameState === 'intro' && renderIntro()}
      {gameState === 'playing' && renderQuestion()}
      {gameState === 'results' && renderResults()}
    </div>
  );
};

export default Week1Gauntlet;