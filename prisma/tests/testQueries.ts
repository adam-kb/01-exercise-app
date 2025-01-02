import { Status as ExerciseStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

prisma.$on("query", (e) => {
  console.log("Query: ", e.query);
  console.log("Params: ", e.params);
});

const main = async () => {
  // async function checkVersion() {
  //   const result = await prisma.$queryRaw`SELECT version();`;
  //   console.log(result);
  //   await prisma.$disconnect();
  // }

  // checkVersion();

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

  // const featuredExercises = await prisma.featureExercise.findMany({
  //   where: {
  //     exercise: {
  //       status: ExerciseStatus.ACTIVE,
  //     },
  //   },
  //   include: {
  //     exercise: {
  //       include: {
  //         muscleGroup: true,
  //         targetMuscle: true,
  //         equipment: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     featuredAt: "desc",
  //   },
  // });

  // const workouts = await prisma.workout.findFirst({
  //   include: {
  //     author: true,
  //     exercises: {
  //       include: {
  //         exercise: true
  //       }
  //     },
  //   },
  // });

  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      hashedPassword: "obviousTest",
      firstName: "Test",
      lastName: "User",
      userName: "testuser",
      userStatus: "ADMIN",
    },
  });

  console.log("Created user:", user);

  const workout = await prisma.workout.create({
    data: {
      name: "Beginner Workout",
      description: "A simple workout for beginners.",
      authorId: user.id,
      exercises: {
        create: [
          {
            exerciseId: 1,
            intensity: 5,
            duration: 10,
            intendedSets: {
              create: [
                { setNumber: 1, reps: 8, weight: 0 },
                { setNumber: 2, reps: 8, weight: 0 },
                { setNumber: 3, reps: 8, weight: 0 },
              ],
            },
          },
          {
            exerciseId: 2,
            intensity: 5,
            duration: 10,
            intendedSets: {
              create: [
                { setNumber: 1, reps: 8, weight: 135 },
                { setNumber: 2, reps: 8, weight: 155 },
                { setNumber: 3, reps: 8, weight: 185},
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Created workout:", workout);

  // const muscleGroupNames = featuredExercises.map((exercise) =>
  //   exercise.muscleGroups.map((group) => group.name)
  // );

  // console.log(muscleGroupNames);

  // console.log("Workouts:", workout);
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
