import prisma from "@/app/lib/prisma";

const main = async () => {


  const updateBenchPress = await prisma.exercise.update({
    where: { name: "Bench Press" },
    data: {
      targetMuscle: {
        // connect: { id: 3},
        set: [{id: 1}, {id: 2}],
      }
    }
  });

  console.log(updateBenchPress);


  const benchPress = await prisma.exercise.findUnique({
    where: {
      name: "Bench Press",
    },
    include: {
      muscleGroup: true,
      targetMuscle: true
    }
  });

  console.log(benchPress);
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
