import React, { useState } from 'react';
import type { WorkoutLog, WorkoutTemplate } from '../types';
import { saveWorkoutLog, getLastExercisePerformance } from '../utils/storage';
import './components.css';

interface WorkoutDayProps {
  template: WorkoutTemplate;
  onBack: () => void;
}

const generateId = () => `id_${new Date().getTime()}_${Math.random()}`;

const createEmptySets = (numSets: number) => {
  return Array.from({ length: numSets }, () => ({
    id: generateId(),
    kgs: 0,
    reps: 0,
  }));
};

export const WorkoutDay: React.FC<WorkoutDayProps> = ({ template, onBack }) => {
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog>({
    id: generateId(),
    date: new Date().toISOString(),
    templateName: template.name,

    exercises: template.exercises.map((ex) => ({
      id: generateId(),
      name: ex.name,
      sets: createEmptySets(ex.targetSets),
    })),
  });

  const handleSetChange = (
    exIndex: number,
    setIndex: number,
    field: 'kgs' | 'reps',
    value: number
  ) => {
    const newWorkoutLog = JSON.parse(JSON.stringify(workoutLog)) as WorkoutLog;

    const safeValue = Math.max(0, value);

    newWorkoutLog.exercises[exIndex].sets[setIndex][field] = safeValue;
    setWorkoutLog(newWorkoutLog);
  };

  const addSet = (exIndex: number) => {
    const newWorkoutLog = { ...workoutLog };
    const exercise = newWorkoutLog.exercises[exIndex];
    const lastSet = exercise.sets[exercise.sets.length - 1] ?? {
      kgs: 0,
      reps: 0,
    };

    exercise.sets.push({
      id: generateId(),
      kgs: lastSet.kgs,
      reps: lastSet.reps,
    });
    setWorkoutLog(newWorkoutLog);
  };

  const removeSet = (exIndex: number, setIndex: number) => {
    const newWorkoutLog = { ...workoutLog };
    const exercise = newWorkoutLog.exercises[exIndex];

    if (exercise.sets.length > 0) {
      exercise.sets.splice(setIndex, 1);
      setWorkoutLog(newWorkoutLog);
    }
  };

  const handleFinishWorkout = () => {
    const finishedLog = {
      ...workoutLog,
      exercises: workoutLog.exercises.filter((ex) => ex.sets.length > 0),
    };

    saveWorkoutLog(finishedLog);
    alert('Workout Saved!');
    onBack();
  };

  return (
    <div className="workout-day">
      <button onClick={onBack} className="back-button">
        &larr; Back
      </button>
      <h2>{template.name}</h2>

      {workoutLog.exercises.map((exercise, exIndex) => {
        const templateExercise = template.exercises[exIndex];

        return (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>

            <div className="target-info">
              <span className="target-item">
                Sets: <strong>{templateExercise.targetSets}</strong>
              </span>
              <span className="target-item">
                Reps: <strong>{templateExercise.targetReps}</strong>
              </span>
              <span className="target-item">
                RIR: <strong>{templateExercise.targetRIR}</strong>
              </span>
            </div>

            <p className="exercise-notes">{templateExercise.notes}</p>

            <LastPerformance exerciseName={exercise.name} />

            <div className="set-header">
              <span>Set</span>
              <span>KGs</span>
              <span>Reps</span>
              <span></span>
            </div>

            {exercise.sets.map((set, setIndex) => (
              <div key={set.id} className="set-row">
                <span>{setIndex + 1}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={set.kgs}
                  onChange={(e) =>
                    handleSetChange(
                      exIndex,
                      setIndex,
                      'kgs',
                      parseFloat(e.target.value)
                    )
                  }
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={set.reps}
                  onChange={(e) =>
                    handleSetChange(
                      exIndex,
                      setIndex,
                      'reps',
                      parseInt(e.target.value)
                    )
                  }
                />
                <button
                  className="remove-set-btn"
                  onClick={() => removeSet(exIndex, setIndex)}
                >
                  &times;
                </button>
              </div>
            ))}
            <button className="add-set-btn" onClick={() => addSet(exIndex)}>
              + Add Set
            </button>
          </div>
        );
      })}

      <button className="finish-workout-btn" onClick={handleFinishWorkout}>
        Finish Workout
      </button>
    </div>
  );
};

const LastPerformance: React.FC<{ exerciseName: string }> = ({
  exerciseName,
}) => {
  const lastPerf = getLastExercisePerformance(exerciseName);
  if (!lastPerf || lastPerf.sets.length === 0) {
    return <p className="last-perf-note">First time doing this exercise!</p>;
  }

  const bestSet = lastPerf.sets.reduce(
    (best, current) => (current.kgs > best.kgs ? current : best),
    lastPerf.sets[0]
  );

  return (
    <p className="last-perf-note">
      Last time: <strong>{bestSet.kgs} kg</strong> for{' '}
      <strong>{bestSet.reps} reps</strong>
    </p>
  );
};
