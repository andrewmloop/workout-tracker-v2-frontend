export interface RoutineDto {
  _id: string;
  name: string;
  description: string;
  exercises: [
    {
      exerciseId: string;
      sets: number;
      reps: number;
    }
  ];
}
