import { Difficulty } from '@prisma/client';

export const muscleGroups = [
  { name: 'Chest', description: 'Muscles of the upper torso.' },
  { name: 'Arms', description: 'Upper limb muscles, including Biceps and Triceps.' },
  { name: 'Legs', description: 'Muscles of the lower body.' },
  { name: 'Back', description: 'Includes the Latissimus Dorsi and Trapezius.' },
  { name: 'Shoulders', description: 'Includes the Deltoid muscles.' },
];

export const targetedMuscles = [
  { name: 'Pectoralis Major' },
  { name: 'Triceps' },
  { name: 'Biceps' },
  { name: 'Quadriceps' },
  { name: 'Hamstrings' },
  { name: 'Glutes' },
  { name: 'Latissimus Dorsi' },
  { name: 'Deltoid' },
];

export const equipment = [
  { name: 'Barbell', description: 'A long bar used for weightlifting.' },
  { name: 'Dumbbell', description: 'A short bar with fixed weights on each end.' },
  { name: 'Kettlebell', description: 'A cast-iron weight with a handle.' },
  { name: 'Bench', description: 'Used for support in exercises like bench press.' },
  { name: 'Pull-up Bar', description: 'A bar for bodyweight exercises like pull-ups.' },
  { name: 'Squat Rack', description: 'A rack to hold weights for squats and bench presses.' },
]

type MuscleGroup = { id?: number, name: string, description: string };
type TargetMuscle = { id?: number, name: string };
type Equipment = { id?: number, name: string, description: string };

export const generateExerciseData = (
  muscleGroups: MuscleGroup[],
  targetedMuscles: TargetMuscle[],
  equipment: Equipment[]
) => {
  return [
    {
      name: 'Push-up',
      slug: 'push-up',
      description: 'A bodyweight exercise targeting chest and triceps.',
      difficulty: Difficulty.Beginner,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Chest')?.id },
        { id: muscleGroups.find(mg => mg.name === 'Arms')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Pectoralis Major')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Triceps')?.id }
      ]
    },
    {
      name: 'Bench Press',
      slug: 'bench-press',
      description: 'A compound lift for chest and triceps.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Chest')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Pectoralis Major')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Triceps')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Barbell')?.id },
        { id: equipment.find(equipment => equipment.name === 'Bench')?.id }
      ]
    },
    {
      name: 'Dumbbell Curl',
      slug: 'dumbbell-curl',
      description: 'An isolation exercise for the biceps.',
      difficulty: Difficulty.Beginner,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Arms')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Biceps')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Dumbbell')?.id }
      ]
    },
    {
      name: 'Barbell Squat',
      slug: 'barbell-squat',
      description: 'A lower-body exercise targeting quadriceps and glutes.',
      difficulty: Difficulty.Advanced,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Legs')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Quadriceps')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Glutes')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Barbell')?.id },
        { id: equipment.find(equipment => equipment.name === 'Squat Rack')?.id }
      ]
    },
    {
      name: 'Deadlift',
      slug: 'deadlift',
      description: 'A compound lift targeting the posterior chain.',
      difficulty: Difficulty.Advanced,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Back')?.id },
        { id: muscleGroups.find(mg => mg.name === 'Legs')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Hamstrings')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Glutes')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Barbell')?.id }
      ]
    },
    {
      name: 'Pull-up',
      slug: 'pull-up',
      description: 'A bodyweight exercise targeting the back and biceps.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Back')?.id },
        { id: muscleGroups.find(mg => mg.name === 'Arms')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Latissimus Dorsi')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Biceps')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Pull-up Bar')?.id }
      ]
    },
    {
      name: 'Overhead Press',
      slug: 'overhead-press',
      description: 'A compound shoulder exercise targeting the deltoids.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Shoulders')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Deltoid')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Triceps')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Barbell')?.id }
      ]
    },
    {
      name: 'Lunges',
      slug: 'lunges',
      description: 'A unilateral lower-body exercise targeting glutes and quads.',
      difficulty: Difficulty.Beginner,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Legs')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Glutes')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Quadriceps')?.id }
      ]
    },
    {
      name: 'Kettlebell Swing',
      slug: 'kettlebell-swing',
      description: 'A full-body movement targeting hamstrings and glutes.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Legs')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Hamstrings')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Glutes')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Kettlebell')?.id }
      ]
    },
    {
      name: 'Incline Bench Press',
      slug: 'incline-bench-press',
      description: 'A chest exercise that emphasizes the upper pectorals.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Chest')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Pectoralis Major')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Barbell')?.id },
        { id: equipment.find(equipment => equipment.name === 'Bench')?.id }
      ]
    },
    {
      name: 'Dumbbell Lateral Raise',
      slug: 'dumbbell-lateral-raise',
      description: 'An isolation exercise targeting the lateral deltoids.',
      difficulty: Difficulty.Beginner,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Shoulders')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Deltoid')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Dumbbell')?.id }
      ]
    },
    {
      name: 'Chin-up',
      slug: 'chin-up',
      description: 'A bodyweight exercise emphasizing the biceps and back.',
      difficulty: Difficulty.Intermediate,
      muscleGroups: [
        { id: muscleGroups.find(mg => mg.name === 'Back')?.id },
        { id: muscleGroups.find(mg => mg.name === 'Arms')?.id }
      ],
      targetedMuscles: [
        { id: targetedMuscles.find(tm => tm.name === 'Biceps')?.id },
        { id: targetedMuscles.find(tm => tm.name === 'Latissimus Dorsi')?.id }
      ],
      equipment: [
        { id: equipment.find(equipment => equipment.name === 'Pull-up Bar')?.id }
      ]
    }
  ];
};
