import { useState } from 'react';
import './App.css';
import { WORKOUT_TEMPLATES } from './constants';
import type { WorkoutTemplateName } from './types';
import { WorkoutDay } from './components/WorkoutDay';
import { History } from './components/History';

function App() {
  // This state will control which "page" we are on
  const [activeView, setActiveView] = useState<'menu' | 'workout' | 'history'>(
    'menu'
  );

  // This state tracks which workout day is selected (if any)
  const [selectedDay, setSelectedDay] = useState<WorkoutTemplateName | null>(
    null
  );

  // Function to start a workout
  const startWorkout = (templateName: WorkoutTemplateName) => {
    setSelectedDay(templateName);
    setActiveView('workout');
  };

  // Function to go back to the main menu
  const goToMenu = () => {
    setActiveView('menu');
    setSelectedDay(null);
  };

  // --- Render logic based on the activeView state ---

  // 2. Show History page
  if (activeView === 'history') {
    return (
      <div className="app-container">
        <History onBack={goToMenu} />
      </div>
    );
  }

  // 3. Show Workout page
  if (activeView === 'workout' && selectedDay) {
    const template = WORKOUT_TEMPLATES.find((t) => t.name === selectedDay);

    if (!template) {
      goToMenu(); // Template not found, go back
      return null;
    }

    return (
      <div className="app-container">
        <WorkoutDay
          template={template}
          onBack={goToMenu} // Pass the function to go back
        />
      </div>
    );
  }

  // 4. Show Main Menu (default)
  return (
    <div className="app-container">
      <h1>Gym Tracker</h1>
      <h3>Choose your workout for today:</h3>
      <div className="template-grid">
        {WORKOUT_TEMPLATES.map((template) => (
          <button
            key={template.name}
            className="template-button"
            onClick={() => startWorkout(template.name)}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* 5. Add the new History button */}
      <button
        className="history-button"
        onClick={() => setActiveView('history')}
      >
        View Progress History
      </button>
    </div>
  );
}

export default App;
