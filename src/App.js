import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getProgress, saveProgress as saveProgressToFirebase } from './services/firebase';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { BookOpen, Brain, Award, Home, LogOut } from 'lucide-react';
import Header from './components/Header';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import FlashcardView from './components/FlashcardView';
import ModuleCard from './components/ModuleCard';
import ProgressTracker from './components/ProgressTracker';
import modules from './data/modules';
import { studyPlan, getWeekByDay } from './data/studyPlan';
import theme from './styles/theme';

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main Dashboard Component
const Dashboard = ({ user }) => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeTab, setActiveTab] = useState('lesson');
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Load progress from Firebase when user logs in
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        try {
          const userProgress = await getProgress(user.uid);
          setProgress(userProgress);
        } catch (error) {
          console.error('Error loading progress:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProgress();
  }, [user]);

  const handleModuleSelect = (day) => {
    setSelectedDay(day);
    setCurrentView('module');
    setActiveTab('lesson');
  };

  const handleQuizComplete = async (score) => {
    const newProgress = {
      ...progress,
      [selectedDay]: {
        completed: true,
        score,
        timestamp: new Date().toISOString()
      }
    };
    setProgress(newProgress);

    // Save to Firebase
    if (user) {
      try {
        await saveProgressToFirebase(user.uid, selectedDay, {
          completed: true,
          score,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDay(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const currentModule = modules.find(m => m.day === selectedDay);
  const weekInfo = selectedDay ? getWeekByDay(selectedDay) : null;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.white
      }}>
        <div style={{
          textAlign: 'center',
          color: theme.colors.navy
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Loading your progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.colors.white,
      fontFamily: theme.fonts.body
    }}>
      {/* Header with User Info */}
      <div style={{ 
        background: theme.colors.navy, 
        color: theme.colors.white, 
        padding: '1.5rem 2rem',
        boxShadow: theme.shadows.card
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              Welcome back, {user?.displayName || user?.email || 'Student'}!
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {selectedDay && weekInfo && (
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
                  Day {selectedDay} of 21
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: theme.colors.white,
                border: `2px solid ${theme.colors.white}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: theme.fonts.body,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.colors.white;
                e.currentTarget.style.color = theme.colors.navy;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = theme.colors.white;
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: theme.spacing.lg }}>
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <>
            <ProgressTracker progress={progress} />

            {studyPlan.weeks.map(week => (
              <div key={week.weekNumber} style={{ marginBottom: theme.spacing.xl }}>
                <div style={{
                  marginBottom: theme.spacing.md,
                  paddingBottom: theme.spacing.sm,
                  borderBottom: `2px solid ${theme.colors.lightBlue}`
                }}>
                  <h2 style={{
                    margin: 0,
                    color: theme.colors.navy,
                    fontSize: theme.fonts.sizes.xl,
                    fontWeight: '600'
                  }}>
                    Week {week.weekNumber}: {week.title}
                  </h2>
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    color: theme.colors.darkNavy,
                    fontSize: theme.fonts.sizes.sm
                  }}>
                    {week.description}
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: theme.spacing.md
                }}>
                  {week.days.map(day => (
                    <ModuleCard
                      key={day.day}
                      day={day.day}
                      title={day.title}
                      topics={day.topics}
                      isCompleted={progress[day.day]?.completed}
                      isLocked={false}
                      score={progress[day.day]?.score}
                      onClick={() => handleModuleSelect(day.day)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* MODULE VIEW */}
        {currentView === 'module' && currentModule && (
          <>
            {/* Back Button */}
            <button
              onClick={handleBackToHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                background: theme.colors.white,
                color: theme.colors.mediumBlue,
                border: `2px solid ${theme.colors.mediumBlue}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.base,
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.body,
                transition: 'all 0.2s'
              }}
            >
              <Home size={18} />
              Back to Dashboard
            </button>

            {/* Module Header */}
            <div style={{ 
              background: theme.gradients.primary,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              color: theme.colors.white
            }}>
              <div style={{ 
                fontSize: theme.fonts.sizes.sm, 
                opacity: 0.95, 
                marginBottom: '0.5rem' 
              }}>
                Day {currentModule.day} • {weekInfo?.title}
              </div>
              <h2 style={{ 
                margin: 0, 
                fontSize: theme.fonts.sizes.xxl, 
                fontWeight: '600' 
              }}>
                {currentModule.module_title}
              </h2>
              {progress[selectedDay]?.completed && (
                <div style={{ 
                  marginTop: theme.spacing.md, 
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: theme.borderRadius.sm,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: theme.fonts.sizes.sm
                }}>
                  ✅ Completed • Score: {progress[selectedDay].score}%
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: theme.spacing.sm, 
              marginBottom: theme.spacing.lg,
              borderBottom: `2px solid ${theme.colors.lightBlue}`,
              flexWrap: 'wrap'
            }}>
              {[
                { id: 'lesson', icon: BookOpen, label: 'Lesson' },
                { id: 'quiz', icon: Brain, label: 'Quiz' },
                { id: 'flashcards', icon: Award, label: 'Flashcards' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                    border: 'none',
                    background: 'transparent',
                    color: activeTab === tab.id ? theme.colors.mediumBlue : theme.colors.darkNavy,
                    fontWeight: activeTab === tab.id ? '600' : '400',
                    cursor: 'pointer',
                    borderBottom: activeTab === tab.id ? `3px solid ${theme.colors.mediumBlue}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: theme.fonts.sizes.base,
                    transition: 'all 0.2s',
                    fontFamily: theme.fonts.body
                  }}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'lesson' && <LessonView module={currentModule} />}
            {activeTab === 'quiz' && (
              <QuizView 
                questions={currentModule.quiz_questions} 
                onComplete={handleQuizComplete}
              />
            )}
            {activeTab === 'flashcards' && <FlashcardView flashcards={currentModule.flashcards} />}
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.white
      }}>
        <div style={{
          textAlign: 'center',
          color: theme.colors.navy
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Loading NetSage Academy...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;