export type WorkoutTemplateName =
  | 'Push 1 (Chest & Triceps)'
  | 'Pull 1 (Back Width & Biceps)'
  | 'Legs 1 (Quad Focus)'
  | 'Push 2 (Shoulder & Chest)'
  | 'Pull 2 (Back Thickness & Biceps)'
  | 'Legs 2 (Hamstring & Glute)';

export interface ExerciseSet {
  id: string;
  kgs: number;
  reps: number;
}

export interface ExerciseLog {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  templateName: WorkoutTemplateName;
  exercises: ExerciseLog[];
}

export interface TemplateExercise {
  name: string;
  targetSets: number;
  targetReps: string;
  targetRIR: string;
  notes: string;
}

export interface WorkoutTemplate {
  name: WorkoutTemplateName;
  exercises: TemplateExercise[];
}
