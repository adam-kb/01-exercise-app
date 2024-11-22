import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed some muscle groups
  const chest = await prisma.muscleGroup.create({
    data: {
      name: 'Chest',
      description: 'Includes muscles like the Pectoralis Major and Minor.',
    },
  });

  const arms = await prisma.muscleGroup.create({
    data: {
      name: 'Arms',
      description: 'Includes muscles like the Biceps, Triceps, and Forearms.',
    },
  });

  const legs = await prisma.muscleGroup.create({
    data: {
      name: 'Legs',
      description: 'Includes muscles like the Quadriceps, Hamstrings, and Glutes.',
    },
  });

  // Seed some targeted muscles
  const pectoralis = await prisma.targetedMuscle.create({
    data: {
      name: 'Pectoralis Major',
    },
  });

  const quadriceps = await prisma.targetedMuscle.create({
    data: {
      name: 'Quadriceps',
    },
  });

  const triceps = await prisma.targetedMuscle.create({
    data: {
      name: 'Triceps',
    },
  });

  // Seed equipment
  const barbell = await prisma.equipment.create({
    data: {
      name: 'Barbell',
    },
  });

  const dumbbell = await prisma.equipment.create({
    data: {
      name: 'Dumbbell',
    },
  });

  // Seed some exercises
  const pushUp = await prisma.exercise.create({
    data: {
      name: 'Push-up',
      slug: 'push-up',
      description: 'A bodyweight exercise that targets the chest, shoulders, and triceps.',
      muscleGroups: {
        create: [
          {
            muscleGroupId: chest.id,
          },
          {
            muscleGroupId: arms.id,
          },
        ],
      },
      targetedMuscles: {
        create: [
          {
            muscleId: pectoralis.id, // Pectoralis Major
          },
          {
            muscleId: triceps.id, // Triceps
          },
        ],
      },
      equipment: {
        create: [
          {
            equipmentId: barbell.id, // Optional, could be bodyweight or add another equipment type
          },
        ],
      },
    },
  });

  const benchPress = await prisma.exercise.create({
    data: {
      name: 'Bench Press',
      slug: 'bench-press',
      description: 'A barbell exercise that targets the chest and triceps.',
      muscleGroups: {
        create: [
          {
            muscleGroupId: chest.id,
          },
          {
            muscleGroupId: arms.id,
          },
        ],
      },
      targetedMuscles: {
        create: [
          {
            muscleId: pectoralis.id, // Pectoralis Major
          },
          {
            muscleId: triceps.id, // Triceps
          },
        ],
      },
      equipment: {
        create: [
          {
            equipmentId: barbell.id,
          },
        ],
      },
    },
  });

  const squat = await prisma.exercise.create({
    data: {
      name: 'Squat',
      slug: 'squat',
      description: 'A lower-body exercise that targets the quads and glutes.',
      muscleGroups: {
        create: [
          {
            muscleGroupId: legs.id,
          },
        ],
      },
      targetedMuscles: {
        create: [
          {
            muscleId: quadriceps.id, // Quadriceps
          },
        ],
      },
      equipment: {
        create: [
          {
            equipmentId: barbell.id,
          },
        ],
      },
    },
  });

  console.log('Seed data has been added!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
