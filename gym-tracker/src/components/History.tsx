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

interface ChartDataPoint {
  date: string;
  bestKgs: number;
  bestVolume: number;
}

export const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [allLogs, setAllLogs] = useState<WorkoutLog[]>([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  useEffect(() => {
    const logs = getWorkoutLogs();
    setAllLogs(logs);

    const allNames = new Set<string>();
    logs.forEach((log) => {
      log.exercises.forEach((ex) => {
        allNames.add(ex.name);
      });
    });

    const sortedNames = Array.from(allNames).sort();
    setExerciseList(sortedNames);

    if (sortedNames.length > 0) {
      setSelectedExercise(sortedNames[0]);
    }
  }, []);

  const chartData = useMemo(() => {
    if (!selectedExercise) return [];

    const dataPoints: ChartDataPoint[] = [];

    allLogs.forEach((log) => {
      const exercise = log.exercises.find((ex) => ex.name === selectedExercise);

      if (exercise && exercise.sets.length > 0) {
        const bestSet = exercise.sets.reduce(
          (max, set) => (set.kgs > max.kgs ? set : max),
          exercise.sets[0]
        );

        dataPoints.push({
          date: new Date(log.date).toLocaleDateString(),
          bestKgs: bestSet.kgs,
          bestVolume: bestSet.kgs * bestSet.reps,
        });
      }
    });

    return dataPoints;
  }, [allLogs, selectedExercise]);

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
