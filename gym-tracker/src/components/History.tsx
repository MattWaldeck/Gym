import React, { useState, useEffect, useMemo } from 'react';
import { getWorkoutLogs } from '../utils/storage';
import type { WorkoutLog } from '../types';
import './components.css';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface HistoryProps {
  onBack: () => void;
}

// Define what our chart data will look like
interface ChartDataPoint {
  date: string;
  bestKgs: number; // Heaviest set
  bestVolume: number; // Volume (kgs * reps) of heaviest set
}

export const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [allLogs, setAllLogs] = useState<WorkoutLog[]>([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  // 1. Load all data on component mount
  useEffect(() => {
    const logs = getWorkoutLogs();
    setAllLogs(logs);

    // Find all unique exercise names from all logs
    const allNames = new Set<string>();
    logs.forEach((log) => {
      log.exercises.forEach((ex) => {
        allNames.add(ex.name);
      });
    });

    const sortedNames = Array.from(allNames).sort();
    setExerciseList(sortedNames);

    // Set the default selected exercise
    if (sortedNames.length > 0) {
      setSelectedExercise(sortedNames[0]);
    }
  }, []); // Empty array means this runs only once

  // 2. Transform the data for the chart
  const chartData = useMemo(() => {
    if (!selectedExercise) return [];

    const dataPoints: ChartDataPoint[] = [];

    allLogs.forEach((log) => {
      const exercise = log.exercises.find((ex) => ex.name === selectedExercise);

      if (exercise && exercise.sets.length > 0) {
        // Find the "best" set for that day (heaviest weight)
        const bestSet = exercise.sets.reduce(
          (max, set) => (set.kgs > max.kgs ? set : max),
          exercise.sets[0]
        );

        dataPoints.push({
          date: new Date(log.date).toLocaleDateString(), // Format date for X-axis
          bestKgs: bestSet.kgs,
          bestVolume: bestSet.kgs * bestSet.reps,
        });
      }
    });

    // Recharts works best if data is sorted by date (though our logs are already)
    return dataPoints;
  }, [allLogs, selectedExercise]); // Recalculate only when logs or selection change

  return (
    <div className="history-page">
      <button onClick={onBack} className="back-button">
        &larr; Back
      </button>
      <h2>Progress History</h2>

      <div className="history-controls">
        <label htmlFor="exercise-select">Select Exercise:</label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exerciseList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {chartData.length === 0 ? (
        <p>No data found for {selectedExercise}. Go do some sets!</p>
      ) : (
        <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" />

              {/* Y-Axis for KGs */}
              <YAxis
                yAxisId="left"
                dataKey="bestKgs"
                stroke="#8884d8"
                label={{
                  value: 'KGs',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#8884d8',
                }}
              />

              {/* Y-Axis for Volume */}
              <YAxis
                yAxisId="right"
                dataKey="bestVolume"
                orientation="right"
                stroke="#82ca9d"
                label={{
                  value: 'Volume (kg*reps)',
                  angle: 90,
                  position: 'insideRight',
                  fill: '#82ca9d',
                }}
              />

              <Tooltip
                contentStyle={{ backgroundColor: '#222' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bestKgs"
                name="Heaviest Set (kg)"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bestVolume"
                name="Best Set Volume"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
