# SDLC workshop day 2 - multi agent copilot

## Pomodoro Timer App

A fully functional Pomodoro Timer application built with React, TypeScript, and Vite. This app helps you manage your time using the Pomodoro Technique - a time management method that uses a timer to break work into intervals.

### Features

- **Three Timer Modes:**
  - Work Time: 25 minutes (default focus period)
  - Short Break: 5 minutes (break after each work session)
  - Long Break: 15 minutes (break after 4 completed pomodoros)

- **Timer Controls:**
  - Start/Pause: Control the timer with a single button
  - Reset: Reset the current timer to its default duration
  - Mode Switching: Switch between different timer modes anytime when paused

- **Visual Feedback:**
  - Different gradient backgrounds for each mode (purple for work, pink for short break, blue for long break)
  - Large, easy-to-read countdown display
  - Active mode indicator
  - Completed pomodoros counter

- **Accessibility:**
  - ARIA labels for all interactive elements
  - Keyboard navigation support
  - Screen reader compatible

- **Responsive Design:**
  - Works on desktop, tablet, and mobile devices
  - Adapts layout for smaller screens

### Getting Started

#### Prerequisites
- Node.js (v16 or higher)
- npm

#### Installation

```bash
cd pomodoro-timer
npm install
```

#### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

#### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

#### Linting

```bash
npm run lint
```

### How to Use

1. **Start a Work Session**: Click the "Work" button and then "Start" to begin a 25-minute focus session
2. **Take a Break**: After completing a work session, the timer automatically suggests a break (short break after 1-3 sessions, long break after 4 sessions)
3. **Track Progress**: The "Completed Pomodoros" counter shows how many focus sessions you've completed
4. **Customize**: Switch between modes anytime using the mode buttons (when timer is paused)

### Technology Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with gradients and animations
- **ESLint** - Code quality and consistency

### Project Structure

```
pomodoro-timer/
├── src/
│   ├── PomodoroTimer.tsx    # Main timer component
│   ├── PomodoroTimer.css    # Timer styles
│   ├── App.tsx              # App entry point
│   ├── main.tsx             # React DOM rendering
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

### Screenshots

#### Work Mode
![Work Mode](https://github.com/user-attachments/assets/2c191428-41c8-49ba-825a-95e396109c77)

#### Short Break Mode
![Short Break](https://github.com/user-attachments/assets/33816c06-7bc1-43c7-9ed5-2231b2c08e69)

#### Long Break Mode
![Long Break](https://github.com/user-attachments/assets/02127e13-28df-4d8b-a0a2-345486b56ca0)
 
