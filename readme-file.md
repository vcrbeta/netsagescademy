# NetSage Academy - CompTIA Network+ Learning Platform

A full-stack interactive learning platform for CompTIA Network+ certification prep with custom themes, progress tracking, and gamified study aids.

## 🚀 Quick Start

### 1. Create the Project

```bash
npx create-react-app netsage-academy
cd netsage-academy
```

### 2. Install Dependencies

```bash
npm install lucide-react
```

### 3. Create Directory Structure

```bash
mkdir -p src/components src/data src/styles
```

### 4. Copy All Files

Copy the files I've provided into the correct locations:

```
src/
├── components/
│   ├── Header.jsx
│   ├── LessonView.jsx
│   ├── QuizView.jsx
│   ├── FlashcardView.jsx
│   ├── ModuleCard.jsx
│   └── ProgressTracker.jsx
├── data/
│   ├── modules.js (Week 1 content - Days 1-7)
│   └── studyPlan.js
├── styles/
│   └── theme.js
├── App.jsx
├── index.jsx
└── index.css
```

### 5. Run the App

```bash
npm start
```

Your app should open at `http://localhost:3000` 🎉

---

## ✨ Features

### Current Features (Week 1 Ready!)
- ✅ Dashboard with all 21 days organized by week
- ✅ Progress tracking with localStorage (persists between sessions)
- ✅ Interactive lessons with hands-on exercises
- ✅ 10-question quizzes with instant feedback
- ✅ Flashcard system with flip animation
- ✅ Custom color theme (light blue, navy, yellow)
- ✅ Responsive design
- ✅ Week 1 complete content (Days 1-7)

### Coming Next
- 🔜 Week 2 & 3 content (Days 8-21)
- 🔜 Firebase integration for cloud sync
- 🔜 User authentication
- 🔜 Streak tracking & badges
- 🔜 Practice exam mode
- 🔜 Study timer

---

## 📚 Content Status

| Week | Days | Status | Topics |
|------|------|--------|--------|
| Week 1 | 1-7 | ✅ Complete | Networking Foundations & IP Addressing |
| Week 2 | 8-14 | 🔜 Coming | Routing, Switching, VLANs & Wireless |
| Week 3 | 15-21 | 🔜 Coming | Security, Troubleshooting, Cloud |

---

## 🎨 Color Scheme

Your custom light theme:
- **Background**: White (`#FFFFFF`)
- **Primary Text**: Black (`#000000`)
- **Light Blue**: `#8ECEE7`
- **Medium Blue**: `#3A8CC5`
- **Navy**: `#19396B`
- **Dark Navy**: `#12224A`
- **Yellow**: `#FBC671`

---

## 🗂️ Project Structure

```
netsage-academy/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── LessonView.jsx
│   │   ├── QuizView.jsx
│   │   ├── FlashcardView.jsx
│   │   ├── ModuleCard.jsx
│   │   └── ProgressTracker.jsx
│   ├── data/              # Content & study plan
│   │   ├── modules.js     # All lesson content
│   │   └── studyPlan.js   # 3-week structure
│   ├── styles/            # Theme configuration
│   │   └── theme.js
│   ├── App.jsx            # Main application
│   ├── index.jsx          # React entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
```

---

## 💾 Data Storage

### Current: localStorage
- Progress saved locally in browser
- Persists between sessions
- No backend required

### Future: Firebase
- Cloud sync across devices
- User accounts
- Leaderboards
- Analytics

---

## 🛠️ Development Roadmap

### Phase 1: ✅ Foundation (Complete)
- ✅ Project structure
- ✅ UI components
- ✅ Theme system
- ✅ Week 1 content

### Phase 2: Content Expansion (Next)
1. Generate Week 2 modules (Days 8-14)
2. Generate Week 3 modules (Days 15-21)
3. Add practice exams for Days 19-20

### Phase 3: Backend Integration
1. Set up Firebase project
2. Add authentication
3. Implement cloud progress sync
4. Add user profiles

### Phase 4: Gamification
1. Streak tracking
2. Achievement badges
3. Leaderboards
4. Study timer & analytics

### Phase 5: Polish & Deploy
1. Responsive mobile design
2. Dark mode toggle
3. Performance optimization
4.