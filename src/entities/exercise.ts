export interface ExerciseDto {
  _id: string;
  name: string;
  level: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  category: string;
  instructions: string[];
}
