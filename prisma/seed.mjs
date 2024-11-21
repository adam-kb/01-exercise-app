import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.exercise.createMany({
    data: [
      {
        name: 'Bench Press',
        description: 'A workout hitting the chest muscles...',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
      },
      {
        name: 'Back Squat',
        description: 'A workout hitting the legs etc...',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
      },
      {
        name: 'Pull-Up',
        description: 'Pulling the chin over the bar...',
        muscleGroup: 'Back',
        equipment: 'Whatever you can pull up on',
      },
    ],
  });
};

main()
  .then(() => console.log('Database seeded'))
  .catch(error => console.error(error))
  .finally(async () => await prisma.$disconnect())
