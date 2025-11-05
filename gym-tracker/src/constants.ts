import type { WorkoutTemplate } from './types';

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    name: 'Push 1 (Chest & Triceps)',
    exercises: [
      {
        name: 'Barbell Bench Press',
        targetSets: 4,
        targetReps: '6-8',
        targetRIR: '2-3',
        notes: 'Focus on controlled negatives and explosive pressing.',
      },
      {
        name: 'Incline Dumbbell Press',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes:
          'Set the bench to a 30-45 degree angle to target the upper chest.',
      },
      {
        name: 'Cable Crossovers',
        targetSets: 3,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Focus on squeezing the chest at the peak contraction.',
      },
      {
        name: 'Seated Dumbbell Overhead Press',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'Keep your core tight and avoid excessive arching of the back.',
      },
      {
        name: 'Lateral Raises',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Control the weight; avoid using momentum.',
      },
      {
        name: 'Triceps Pushdowns',
        targetSets: 4,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
      {
        name: 'Overhead Skullcrushers (EZ Bar)',
        targetSets: 4,
        targetReps: '10-12',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
    ],
  },
  {
    name: 'Pull 1 (Back Width & Biceps)',
    exercises: [
      {
        name: 'Lat Pulldown / Pull-ups',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes:
          'If doing pull-ups, add weight if necessary. Focus on driving elbows down.',
      },
      {
        name: 'Barbell Rows (Pendlay)',
        targetSets: 4,
        targetReps: '6-10',
        targetRIR: '2-3',
        notes:
          'This is a primary strength and mass builder. Maintain a flat back.',
      },
      {
        name: 'Wide Grip Rows',
        targetSets: 4,
        targetReps: '10-12',
        targetRIR: '1-2',
        notes: 'Pull to the lower chest to emphasize lats.',
      },
      {
        name: 'Face Pulls/ Reverse cable Pec Deck',
        targetSets: 3,
        targetReps: '15-20',
        targetRIR: '1-2',
        notes: 'Excellent for rear delt and rotator cuff health.',
      },
      {
        name: 'Barbell Curls',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
      {
        name: 'Hammer Curls',
        targetSets: 4,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
    ],
  },
  {
    name: 'Legs 1 (Quad Focus)',
    exercises: [
      {
        name: 'Squats (Barbell)',
        targetSets: 4,
        targetReps: '6-10',
        targetRIR: '2-3',
        notes: 'Your primary lower body movement. Focus on form.',
      },
      {
        name: 'Leg Press',
        targetSets: 4,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes: 'Place feet lower on the platform to emphasize quads.',
      },
      {
        name: 'Leg Extensions',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Squeeze at the top of the movement for peak contraction.',
      },
      {
        name: 'Laying leg Curls',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Control the eccentric (lowering) phase.',
      },
      {
        name: 'Seated Calf Raises',
        targetSets: 4,
        targetReps: '15-20',
        targetRIR: '1-2',
        notes: 'Pause at the top and get a full stretch at the bottom.',
      },
    ],
  },
  {
    name: 'Push 2 (Shoulder & Chest)',
    exercises: [
      {
        name: 'Overhead Press (Barbell)',
        targetSets: 4,
        targetReps: '6-8',
        targetRIR: '2-3',
        notes: 'The primary shoulder builder. Keep core and glutes engaged.',
      },
      {
        name: 'Flat Dumbbell Bench',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'Allows for a greater range of motion than the barbell version.',
      },
      {
        name: 'Chest Dips',
        targetSets: 3,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'Lean forward to emphasize the chest. Add weight if needed.',
      },
      {
        name: 'Shoulder Dumbbell Press',
        targetSets: 3,
        targetReps: '10-12',
        targetRIR: '1-2',
        notes: 'Hits all three heads of the deltoid.',
      },
      {
        name: 'Cable Lateral Raises',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Provides constant tension on the medial delt.',
      },
      {
        name: 'Overhead Triceps Ext (Rope)',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Focus on getting a full stretch at the bottom.',
      },
      {
        name: 'Triceps Pressdowns (V-Bar)',
        targetSets: 4,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes:
          'This replaces the Close Grip Bench to reduce overlapping pressing fatigue.',
      },
    ],
  },
  {
    name: 'Pull 2 (Back Thickness & Biceps)',
    exercises: [
      {
        name: 'Rack Pulls',
        targetSets: 4,
        targetReps: '5-8',
        targetRIR: '2-3',
        notes:
          'Extremely effective but neurally fatiguing. Do not go to failure.',
      },
      {
        name: 'T-bar or Chest-Supported Rows',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'Excellent for mid-back thickness.',
      },
      {
        name: 'Single Arm Dumbbell Rows',
        targetSets: 4,
        targetReps: '10-12',
        targetRIR: '1-2',
        notes: 'Focus on pulling with the lat, not the bicep.',
      },
      {
        name: 'Rear Delt Deck or Bent-Over Flys',
        targetSets: 3,
        targetReps: '15-20',
        targetRIR: '1-2',
        notes: 'Targets the rear delts and upper back.',
      },
      {
        name: 'Incline Dumbbell Curls',
        targetSets: 4,
        targetReps: '10-12',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
      {
        name: 'Preacher Curls',
        targetSets: 4,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes: 'Increased volume to meet weekly targets.',
      },
    ],
  },
  {
    name: 'Legs 2 (Hamstring & Glute)',
    exercises: [
      {
        name: 'Romanian Deadlift (RDL)',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '2-3',
        notes:
          'Primary hamstring and glute movement. Maintain a flat back and slight knee bend.',
      },
      {
        name: 'Hip Thrusts',
        targetSets: 4,
        targetReps: '8-12',
        targetRIR: '1-2',
        notes: 'The best exercise for direct glute development.',
      },
      {
        name: 'Seated Hamstring Curls',
        targetSets: 4,
        targetReps: '12-15',
        targetRIR: '1-2',
        notes: 'Isolates the hamstrings effectively.',
      },
      {
        name: 'Bulgarian Split Squats',
        targetSets: 3,
        targetReps: '10-15',
        targetRIR: '1-2',
        notes:
          'Excellent for single-leg strength, stability, and glute activation.',
      },
      {
        name: 'Standing Calf Raises',
        targetSets: 4,
        targetReps: '15-20',
        targetRIR: '1-2',
        notes: 'Targets the soleus muscle of the calf.',
      },
    ],
  },
];
