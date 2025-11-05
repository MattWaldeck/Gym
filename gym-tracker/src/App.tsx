import { useState } from 'react';
import './App.css';
import { WORKOUT_TEMPLATES } from './constants';
import type { WorkoutTemplateName } from './types';
import { WorkoutDay } from './components/WorkoutDay';
import { History } from './components/History';

function App() {
  const [activeView, setActiveView] = useState<'menu' | 'workout' | 'history'>(
    'menu'
  );

  const [selectedDay, setSelectedDay] = useState<WorkoutTemplateName | null>(
    null
  );

  const startWorkout = (templateName: WorkoutTemplateName) => {
    setSelectedDay(templateName);
    setActiveView('workout');
  };

  const goToMenu = () => {
    setActiveView('menu');
    setSelectedDay(null);
  };

  if (activeView === 'history') {
    return (
      <div className="app-container">
        <History onBack={goToMenu} />
      </div>
    );
  }

  if (activeView === 'workout' && selectedDay) {
    const template = WORKOUT_TEMPLATES.find((t) => t.name === selectedDay);

    if (!template) {
      goToMenu();
      return null;
    }

    return (
      <div className="app-container">
        <WorkoutDay template={template} onBack={goToMenu} />
      </div>
    );
  }

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
