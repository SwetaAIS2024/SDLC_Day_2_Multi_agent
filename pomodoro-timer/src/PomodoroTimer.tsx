import { useState, useEffect, useRef, useCallback } from 'react';
import './PomodoroTimer.css';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  mode: TimerMode;
  completedPomodoros: number;
}

const TIMER_DURATIONS = {
  work: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
};

const POMODOROS_UNTIL_LONG_BREAK = 4;

function PomodoroTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    mode: 'work',
    completedPomodoros: 0,
  });

  const intervalRef = useRef<number | null>(null);

  // Calculate total seconds remaining
  const totalSeconds = timerState.minutes * 60 + timerState.seconds;

  const switchMode = useCallback((mode: TimerMode) => {
    const duration = TIMER_DURATIONS[mode];
    setTimerState((prev) => ({
      ...prev,
      mode,
      minutes: Math.floor(duration / 60),
      seconds: 0,
      isRunning: false,
    }));
  }, []);

  const handleTimerComplete = useCallback(() => {
    // Play sound notification (optional - using browser's built-in beep)
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
      audio.play();
    } catch {
      // Ignore audio errors
      console.log('Audio notification not available');
    }

    // Determine next mode
    setTimerState((prev) => {
      if (prev.mode === 'work') {
        const newCompletedPomodoros = prev.completedPomodoros + 1;
        const nextMode = newCompletedPomodoros % POMODOROS_UNTIL_LONG_BREAK === 0 
          ? 'longBreak' 
          : 'shortBreak';
        
        // Schedule mode switch after state update
        setTimeout(() => switchMode(nextMode), 0);
        
        return {
          ...prev,
          completedPomodoros: newCompletedPomodoros,
        };
      } else {
        // After break, switch back to work
        setTimeout(() => switchMode('work'), 0);
        return prev;
      }
    });
  }, [switchMode]);

  useEffect(() => {
    if (timerState.isRunning && totalSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimerState((prev) => {
          const newTotalSeconds = prev.minutes * 60 + prev.seconds - 1;

          if (newTotalSeconds <= 0) {
            // Timer completed
            handleTimerComplete();
            return {
              ...prev,
              minutes: 0,
              seconds: 0,
              isRunning: false,
            };
          }

          return {
            ...prev,
            minutes: Math.floor(newTotalSeconds / 60),
            seconds: newTotalSeconds % 60,
          };
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [timerState.isRunning, totalSeconds, handleTimerComplete]);

  const handleStart = () => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  };

  const handlePause = () => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    setTimerState((prev) => {
      const duration = TIMER_DURATIONS[prev.mode];
      return {
        ...prev,
        minutes: Math.floor(duration / 60),
        seconds: 0,
        isRunning: false,
      };
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (mins: number, secs: number): string => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getModeLabel = (mode: TimerMode): string => {
    switch (mode) {
      case 'work':
        return 'Work Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  return (
    <div className={`pomodoro-container ${timerState.mode}`}>
      <div className="pomodoro-card">
        <h1 className="pomodoro-title">Pomodoro Timer</h1>
        
        <div className="mode-selector">
          <button
            className={`mode-button ${timerState.mode === 'work' ? 'active' : ''}`}
            onClick={() => switchMode('work')}
            disabled={timerState.isRunning}
            aria-label="Switch to work mode"
          >
            Work
          </button>
          <button
            className={`mode-button ${timerState.mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchMode('shortBreak')}
            disabled={timerState.isRunning}
            aria-label="Switch to short break mode"
          >
            Short Break
          </button>
          <button
            className={`mode-button ${timerState.mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchMode('longBreak')}
            disabled={timerState.isRunning}
            aria-label="Switch to long break mode"
          >
            Long Break
          </button>
        </div>

        <div className="timer-display" role="timer" aria-live="polite">
          <div className="mode-label">{getModeLabel(timerState.mode)}</div>
          <div className="time-display">
            {formatTime(timerState.minutes, timerState.seconds)}
          </div>
        </div>

        <div className="controls">
          {!timerState.isRunning ? (
            <button 
              className="control-button start-button" 
              onClick={handleStart}
              aria-label="Start timer"
            >
              Start
            </button>
          ) : (
            <button 
              className="control-button pause-button" 
              onClick={handlePause}
              aria-label="Pause timer"
            >
              Pause
            </button>
          )}
          <button 
            className="control-button reset-button" 
            onClick={handleReset}
            aria-label="Reset timer"
          >
            Reset
          </button>
        </div>

        <div className="pomodoro-counter">
          <span>Completed Pomodoros: {timerState.completedPomodoros}</span>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
