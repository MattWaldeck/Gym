import type { WorkoutLog } from '../types';

const STORAGE_KEY = 'gym-tracker-logs';

export const getWorkoutLogs = (): WorkoutLog[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  return JSON.parse(data) as WorkoutLog[];
};

export const saveWorkoutLog = (newLog: WorkoutLog): void => {
  const allLogs = getWorkoutLogs();

  const updatedLogs = [...allLogs, newLog];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
};

export const getLastExercisePerformance = (exerciseName: string) => {
  const allLogs = getWorkoutLogs();

  for (let i = allLogs.length - 1; i >= 0; i--) {
    const log = allLogs[i];
    const exercise = log.exercises.find((e) => e.name === exerciseName);
    if (exercise) {
      return exercise;
    }
  }
  return null;
};
