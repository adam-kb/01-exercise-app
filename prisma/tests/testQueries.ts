import { Status as ExerciseStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
});

prisma.$on('query', (e) => {
  console.log('Query: ', e.query);
  console.log('Params: ', e.params);
});

const main = async () => {
  // const featuredExerciseIds = await prisma.featuredExercise.findMany({
  //   where: {
  //     exercise: {
  //       status: ExerciseStatus.ACTIVE
  //     }
  //   },
  //   select: {
  //     exerciseId: true,
  //   }
  // });

  // const exerciseIds = featuredExerciseIds.map(entry => entry.exerciseId);

  // const featuredExercises = await prisma.exercise.findMany({
  //   where: {
  //     id: { in: exerciseIds },
  //   },
  //   include: {
  //     muscleGroups: true,
  //     targetedMuscles: true,
  //     equipment: true,
  //   },
  //   orderBy: {
  //     featured: {
  //       featuredAt: 'desc'
  //     }
  //   }
  // });

  const featuredExercises = await prisma.featureExercise.findMany({
    where: {
      exercise: {
        status: ExerciseStatus.ACTIVE
      }
    },
    include: {
      exercise: {
        include: {
          muscleGroup: true,
          targetMuscle: true,
          equipment: true
        },
      },
    },
    orderBy: {
      featuredAt: 'desc'
    }
  })

  // const muscleGroupNames = featuredExercises.map((exercise) =>
  //   exercise.muscleGroups.map((group) => group.name)
  // );
  
  // console.log(muscleGroupNames);
  
  console.log("Featured Exercises:", featuredExercises);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.error("Stack trace:", e.stack);
    await prisma.$disconnect();
    process.exit(1);
  });
