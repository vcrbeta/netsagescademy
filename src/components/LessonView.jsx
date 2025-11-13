import React, { useState, useRef } from 'react';
import { BookOpen, Volume2, AlignLeft, Book, FileText } from 'lucide-react';
import theme from '../styles/theme';
import OSIMatchingGame from './games/OSIMatchingGame';
import PortMatchingGame from './games/Portmatchinggame';
import SubnetSpeedster from './games/SubnetSpeedster';
import DHCPTroubleshooter from './games/DHCPTroubleshooter';
import EthernetMasterGame from './games/EthernetMasterGame'; 
import Week1Gauntlet from './games/Week1Gauntlet';

const LessonView = ({ module }) => {
  const [contentMode, setContentMode] = useState('full'); // 'full', 'summary', or 'textbook'
  const contentRef = useRef(null);

  // Determine which content to show
  const getCurrentContent = () => {
    switch(contentMode) {
      case 'summary':
        return module.lesson_summary || module.lesson_content;
      case 'textbook':
        return module.lesson_textbook || module.lesson_content;
      case 'full':
      default:
        return module.lesson_content;
    }
  };

  const currentContent = getCurrentContent();

  

  // Render the appropriate game based on gameType
  const renderGame = () => {
    switch(module.gameType) {
      case 'osi-matching':
        return <OSIMatchingGame />;
      case 'port-matching':
        return <PortMatchingGame />;
      case 'subnet-speedster':
        return <SubnetSpeedster />;
      case 'dhcp-troubleshooter':
        return <DHCPTroubleshooter />;
      case 'ethernet-master':
        return <EthernetMasterGame />;
      case 'week1-gauntlet':
        return <Week1Gauntlet />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      background: `${theme.colors.lightBlue}14`,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      border: `1px solid ${theme.colors.lightBlue}`
    }}>
      {/* Natural Reader Integration Panel */}
      <div style={{
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        background: theme.colors.yellow,
        borderRadius: theme.borderRadius.sm,
        border: `2px solid ${theme.colors.darkNavy}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: theme.spacing.sm
        }}>
          <Volume2 size={20} color={theme.colors.darkNavy} />
          <span style={{ 
            fontSize: theme.fonts.sizes.base, 
            color: theme.colors.darkNavy,
            fontWeight: '600'
          }}>
            Use the Browser Extension to Listen with Natural Reader
          </span>
        </div>

       
      </div>

      {/* Content Mode Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h3 style={{ 
          color: theme.colors.darkNavy, 
          margin: 0,
          fontSize: theme.fonts.sizes.lg
        }}>
          Learning Objectives
        </h3>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: theme.colors.white,
          padding: '0.25rem',
          borderRadius: theme.borderRadius.sm,
          border: `1px solid ${theme.colors.lightBlue}`
        }}>
          <button
            onClick={() => setContentMode('full')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              background: contentMode === 'full' ? theme.colors.mediumBlue : 'transparent',
              color: contentMode === 'full' ? theme.colors.white : theme.colors.darkNavy,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.xs,
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              transition: 'all 0.2s'
            }}
          >
            <AlignLeft size={14} />
            Full
          </button>

          {module.lesson_textbook && (
            <button
              onClick={() => setContentMode('textbook')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                background: contentMode === 'textbook' ? theme.colors.mediumBlue : 'transparent',
                color: contentMode === 'textbook' ? theme.colors.white : theme.colors.darkNavy,
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.xs,
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: theme.fonts.body,
                transition: 'all 0.2s'
              }}
            >
              <Book size={14} />
              Textbook
            </button>
          )}

          {module.lesson_summary && (
            <button
              onClick={() => setContentMode('summary')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                background: contentMode === 'summary' ? theme.colors.mediumBlue : 'transparent',
                color: contentMode === 'summary' ? theme.colors.white : theme.colors.darkNavy,
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.xs,
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: theme.fonts.body,
                transition: 'all 0.2s'
              }}
            >
              <FileText size={14} />
              Summary
            </button>
          )}
        </div>
      </div>
      
      {/* Lesson Content */}
      <div 
        ref={contentRef}
        id="lesson-content"
        style={{ 
          color: theme.colors.black, 
          lineHeight: contentMode === 'textbook' ? '1.9' : '1.8',
          fontSize: contentMode === 'textbook' ? theme.fonts.sizes.md : theme.fonts.sizes.md,
          marginBottom: theme.spacing.lg,
          whiteSpace: 'pre-wrap',
          userSelect: 'text',
          padding: theme.spacing.lg,
          background: theme.colors.white,
          borderRadius: theme.borderRadius.sm,
          border: `2px solid ${theme.colors.lightBlue}`,
          cursor: 'text',
          maxHeight: '600px',
          overflowY: 'auto',
          fontFamily: contentMode === 'textbook' ? 'Georgia, "Times New Roman", serif' : theme.fonts.body
        }}
        dangerouslySetInnerHTML={{
          __html: currentContent
            .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: ' + theme.colors.navy + '; font-weight: 700;">$1</strong>')
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em style="font-style: italic; color: ' + theme.colors.darkNavy + ';">$1</em>')
            .replace(/^• (.+)$/gm, '<div style="margin-left: 1.5rem; margin-bottom: 0.5rem;">• $1</div>')
            .replace(/^(.+:)$/gm, '<div style="font-weight: 600; color: ' + theme.colors.navy + '; margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.1rem;">$1</div>')
            .replace(/\n\n/g, '<div style="height: 1rem;"></div>')
            .replace(/\n/g, '<br/>')
        }}
      />
      
      {/* Hands-On Exercise */}
      <div style={{ 
        marginTop: theme.spacing.lg,
        padding: '1.5rem',
        background: theme.colors.yellow,
        borderRadius: theme.borderRadius.sm,
        color: theme.colors.darkNavy
      }}>
        <h4 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: theme.fonts.sizes.base
        }}>
          <BookOpen size={20} />
          Hands-On Exercise
        </h4>
        <p style={{ 
          margin: 0, 
          lineHeight: '1.6',
          fontSize: theme.fonts.sizes.sm
        }}>
          {module.hands_on_exercise}
        </p>
      </div>

      {/* Interactive Game Component */}
      {module.gameType && (
        <div style={{ marginTop: theme.spacing.md }}>
          {renderGame()}
        </div>
      )}
    </div>
  );
};

export default LessonView;
