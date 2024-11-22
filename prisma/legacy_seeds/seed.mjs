import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear the database
  await prisma.exerciseInstruction.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscleGroup.deleteMany();
  await prisma.targetedMuscle.deleteMany();
  await prisma.equipment.deleteMany();

  // Seed Muscle Groups
  const chest = await prisma.muscleGroup.create({ data: { name: 'Chest', description: 'Muscles of the upper torso.' } });
  const arms = await prisma.muscleGroup.create({ data: { name: 'Arms', description: 'Upper limb muscles, including Biceps and Triceps.' } });
  const legs = await prisma.muscleGroup.create({ data: { name: 'Legs', description: 'Muscles of the lower body.' } });
  const back = await prisma.muscleGroup.create({ data: { name: 'Back', description: 'Includes the Latissimus Dorsi and Trapezius.' } });
  const shoulders = await prisma.muscleGroup.create({ data: { name: 'Shoulders', description: 'Includes the Deltoid muscles.' } });

  // Seed Targeted Muscles
  const pectoralisMajor = await prisma.targetedMuscle.create({ data: { name: 'Pectoralis Major' } });
  const triceps = await prisma.targetedMuscle.create({ data: { name: 'Triceps' } });
  const biceps = await prisma.targetedMuscle.create({ data: { name: 'Biceps' } });
  const quadriceps = await prisma.targetedMuscle.create({ data: { name: 'Quadriceps' } });
  const hamstrings = await prisma.targetedMuscle.create({ data: { name: 'Hamstrings' } });
  const glutes = await prisma.targetedMuscle.create({ data: { name: 'Glutes' } });
  const latissimusDorsi = await prisma.targetedMuscle.create({ data: { name: 'Latissimus Dorsi' } });
  const deltoid = await prisma.targetedMuscle.create({ data: { name: 'Deltoid' } });

  // Seed Equipment
  const barbell = await prisma.equipment.create({ data: { name: 'Barbell', description: 'A long bar used for weightlifting.' } });
  const dumbbell = await prisma.equipment.create({ data: { name: 'Dumbbell', description: 'A short bar with fixed weights on each end.' } });
  const kettlebell = await prisma.equipment.create({ data: { name: 'Kettlebell', description: 'A cast-iron weight with a handle.' } });
  const bench = await prisma.equipment.create({ data: { name: 'Bench', description: 'Used for support in exercises like bench press.' } });
  const pullUpBar = await prisma.equipment.create({ data: { name: 'Pull-up Bar', description: 'A bar for bodyweight exercises like pull-ups.' } });
  const squatRack = await prisma.equipment.create({ data: { name: 'Squat Rack', description: 'A rack to hold weights for squats and bench presses.' } });

  // Create Exercises
  const exercises = [
    {
      name: 'Push-up',
      slug: 'push-up',
      description: 'A bodyweight exercise targeting chest and triceps.',
      difficulty: 'Beginner',
      muscleGroups: [{ id: chest.id }, { id: arms.id }],
      targetedMuscles: [{ id: pectoralisMajor.id }, { id: triceps.id }],
    },
    {
      name: 'Bench Press',
      slug: 'bench-press',
      description: 'A compound lift for chest and triceps.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: chest.id }],
      targetedMuscles: [{ id: pectoralisMajor.id }, { id: triceps.id }],
      equipment: [{ id: barbell.id }, { id: bench.id }],
    },
    {
      name: 'Dumbbell Curl',
      slug: 'dumbbell-curl',
      description: 'An isolation exercise for the biceps.',
      difficulty: 'Beginner',
      muscleGroups: [{ id: arms.id }],
      targetedMuscles: [{ id: biceps.id }],
      equipment: [{ id: dumbbell.id }],
    },
    {
      name: 'Barbell Squat',
      slug: 'barbell-squat',
      description: 'A lower-body exercise targeting quadriceps and glutes.',
      difficulty: 'Advanced',
      muscleGroups: [{ id: legs.id }],
      targetedMuscles: [{ id: quadriceps.id }, { id: glutes.id }],
      equipment: [{ id: barbell.id }, { id: squatRack.id }],
    },
    {
      name: 'Deadlift',
      slug: 'deadlift',
      description: 'A compound lift targeting the posterior chain.',
      difficulty: 'Advanced',
      muscleGroups: [{ id: back.id }, { id: legs.id }],
      targetedMuscles: [{ id: hamstrings.id }, { id: glutes.id }],
      equipment: [{ id: barbell.id }],
    },
    {
      name: 'Pull-up',
      slug: 'pull-up',
      description: 'A bodyweight exercise targeting the back and biceps.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: back.id }, { id: arms.id }],
      targetedMuscles: [{ id: latissimusDorsi.id }, { id: biceps.id }],
      equipment: [{ id: pullUpBar.id }],
    },
    {
      name: 'Overhead Press',
      slug: 'overhead-press',
      description: 'A compound shoulder exercise targeting the deltoids.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: shoulders.id }],
      targetedMuscles: [{ id: deltoid.id }, { id: triceps.id }],
      equipment: [{ id: barbell.id }],
    },
    {
      name: 'Lunges',
      slug: 'lunges',
      description: 'A unilateral lower-body exercise targeting glutes and quads.',
      difficulty: 'Beginner',
      muscleGroups: [{ id: legs.id }],
      targetedMuscles: [{ id: glutes.id }, { id: quadriceps.id }],
    },
    {
      name: 'Kettlebell Swing',
      slug: 'kettlebell-swing',
      description: 'A full-body movement targeting hamstrings and glutes.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: legs.id }],
      targetedMuscles: [{ id: hamstrings.id }, { id: glutes.id }],
      equipment: [{ id: kettlebell.id }],
    },
    {
      name: 'Incline Bench Press',
      slug: 'incline-bench-press',
      description: 'A chest exercise that emphasizes the upper pectorals.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: chest.id }],
      targetedMuscles: [{ id: pectoralisMajor.id }],
      equipment: [{ id: barbell.id }, { id: bench.id }],
    },
    {
      name: 'Dumbbell Lateral Raise',
      slug: 'dumbbell-lateral-raise',
      description: 'An isolation exercise targeting the lateral deltoids.',
      difficulty: 'Beginner',
      muscleGroups: [{ id: shoulders.id }],
      targetedMuscles: [{ id: deltoid.id }],
      equipment: [{ id: dumbbell.id }],
    },
    {
      name: 'Chin-up',
      slug: 'chin-up',
      description: 'A bodyweight exercise emphasizing the biceps and back.',
      difficulty: 'Intermediate',
      muscleGroups: [{ id: back.id }, { id: arms.id }],
      targetedMuscles: [{ id: biceps.id }, { id: latissimusDorsi.id }],
      equipment: [{ id: pullUpBar.id }],
    },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: {
        name: exercise.name,
        slug: exercise.slug,
        description: exercise.description,
        difficulty: exercise.difficulty,
        muscleGroups: { connect: exercise.muscleGroups },
        targetedMuscles: { connect: exercise.targetedMuscles },
        equipment: { connect: exercise.equipment ?? [] },
      },
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding failed.', e);
    await prisma.$disconnect();
    process.exit(1);
  });
