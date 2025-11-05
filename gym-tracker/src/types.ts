// The 6-day split templates, from your images
export type WorkoutTemplateName =
  | 'Push 1 (Chest & Triceps)'
  | 'Pull 1 (Back Width & Biceps)'
  | 'Legs 1 (Quad Focus)'
  | 'Push 2 (Shoulder & Chest)'
  | 'Pull 2 (Back Thickness & Biceps)'
  | 'Legs 2 (Hamstring & Glute)';

// A single set of an exercise
export interface ExerciseSet {
  id: string; // A unique ID for React keys
  kgs: number;
  reps: number;
}

// A single exercise performed in a workout
export interface ExerciseLog {
  id: string; // A unique ID
  name: string; // e.g., "Bench Press"
  sets: ExerciseSet[];
}

// A full workout session that you've completed
export interface WorkoutLog {
  id: string; // A unique ID
  date: string; // We'll use ISO string: new Date().toISOString()
  templateName: WorkoutTemplateName;
  exercises: ExerciseLog[];
}

// This now defines the *template* for a given exercise, including your notes
export interface TemplateExercise {
  name: string;
  targetSets: number;
  targetReps: string; // e.g., "6-8" or "10-15"
  targetRIR: string; // e.g., "2-3" or "1-2"
  notes: string;
}

// This is the main template for a whole day
export interface WorkoutTemplate {
  name: WorkoutTemplateName;
  // This now uses our richer TemplateExercise
  exercises: TemplateExercise[];
}
