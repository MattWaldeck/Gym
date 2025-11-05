import type { WorkoutLog } from '../types';

const STORAGE_KEY = 'gym-tracker-logs';

// Get all saved workout logs from localStorage
export const getWorkoutLogs = (): WorkoutLog[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return []; // Return an empty array if no data
  }
  return JSON.parse(data) as WorkoutLog[];
};

// Save a new workout log
export const saveWorkoutLog = (newLog: WorkoutLog): void => {
  // 1. Get all existing logs
  const allLogs = getWorkoutLogs();

  // 2. Add the new log
  const updatedLogs = [...allLogs, newLog];

  // 3. Save the full array back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
};

// (Optional) A function to get the *last* workout for a specific exercise
export const getLastExercisePerformance = (exerciseName: string) => {
  const allLogs = getWorkoutLogs();
  // Go in reverse to find the most recent
  for (let i = allLogs.length - 1; i >= 0; i--) {
    const log = allLogs[i];
    const exercise = log.exercises.find((e) => e.name === exerciseName);
    if (exercise) {
      return exercise; // Found the last one!
    }
  }
  return null; // Never done this exercise before
};
