import { Difficulty } from "@prisma/client";
import { MediaType } from "@prisma/client";
import prisma from "@/app/lib/prisma";

async function main() {
  // Clear the database

  await prisma.exercise.deleteMany();
  await prisma.featureExercise.deleteMany();
  await prisma.muscleGroup.deleteMany();
  await prisma.targetMuscle.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.media.deleteMany();

  // Seed Muscle Groups
  const chest = await prisma.muscleGroup.create({
    data: { name: "Chest", description: "Muscles of the upper torso." },
  });
  const arms = await prisma.muscleGroup.create({
    data: {
      name: "Arms",
      description: "Upper limb muscles, including Biceps and Triceps.",
    },
  });
  const legs = await prisma.muscleGroup.create({
    data: { name: "Legs", description: "Muscles of the lower body." },
  });
  const back = await prisma.muscleGroup.create({
    data: {
      name: "Back",
      description: "Includes the Latissimus Dorsi and Trapezius.",
    },
  });
  const shoulders = await prisma.muscleGroup.create({
    data: { name: "Shoulders", description: "Includes the Deltoid muscles." },
  });

  // Seed Targeted Muscles
  const pectoralisMajor = await prisma.targetMuscle.create({
    data: { name: "Pectoralis Major" },
  });
  const triceps = await prisma.targetMuscle.create({
    data: { name: "Triceps" },
  });
  const biceps = await prisma.targetMuscle.create({ data: { name: "Biceps" } });
  const quadriceps = await prisma.targetMuscle.create({
    data: { name: "Quadriceps" },
  });
  const hamstrings = await prisma.targetMuscle.create({
    data: { name: "Hamstrings" },
  });
  const glutes = await prisma.targetMuscle.create({ data: { name: "Glutes" } });
  const latissimusDorsi = await prisma.targetMuscle.create({
    data: { name: "Latissimus Dorsi" },
  });
  const deltoid = await prisma.targetMuscle.create({
    data: { name: "Deltoid" },
  });

  // Seed Equipment
  const barbell = await prisma.equipment.create({
    data: {
      name: "Barbell",
      description: "A long bar used for weightlifting.",
    },
  });
  const dumbbell = await prisma.equipment.create({
    data: {
      name: "Dumbbell",
      description: "A short bar with fixed weights on each end.",
    },
  });
  const kettlebell = await prisma.equipment.create({
    data: {
      name: "Kettlebell",
      description: "A cast-iron weight with a handle.",
    },
  });
  const bench = await prisma.equipment.create({
    data: {
      name: "Bench",
      description: "Used for support in exercises like bench press.",
    },
  });
  const pullUpBar = await prisma.equipment.create({
    data: {
      name: "Pull-up Bar",
      description: "A bar for bodyweight exercises like pull-ups.",
    },
  });
  const squatRack = await prisma.equipment.create({
    data: {
      name: "Squat Rack",
      description: "A rack to hold weights for squats and bench presses.",
    },
  });

  // Create Exercises
  const exerciseData = [
    {
      name: "Push-up",
      slug: "push-up",
      description: "A bodyweight exercise targeting chest and triceps.",
      instruction:
        "Start in a plank position, lower your body until your chest nearly touches the ground, then push back up.",
      difficulty: Difficulty.Beginner,
      muscleGroup: [{ id: chest.id }, { id: arms.id }],
      targetMuscle: [{ id: pectoralisMajor.id }, { id: triceps.id }],
    },
    {
      name: "Bench Press",
      slug: "bench-press",
      description: "A compound lift for chest and triceps.",
      instruction:
        "Lie flat on a bench and press the barbell upward until your arms are fully extended.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: chest.id }],
      targetMuscle: [{ id: pectoralisMajor.id }, { id: triceps.id }],
      equipment: [{ id: barbell.id }, { id: bench.id }],
    },
    {
      name: "Dumbbell Curl",
      slug: "dumbbell-curl",
      description: "An isolation exercise for the biceps.",
      instruction:
        "Hold a dumbbell in each hand, curl the weights upward by bending your elbows, then lower them slowly.",
      difficulty: Difficulty.Beginner,
      muscleGroup: [{ id: arms.id }],
      targetMuscle: [{ id: biceps.id }],
      equipment: [{ id: dumbbell.id }],
    },
    {
      name: "Barbell Squat",
      slug: "barbell-squat",
      description: "A lower-body exercise targeting quadriceps and glutes.",
      instruction:
        "Stand with a barbell on your shoulders, squat down until your thighs are parallel to the ground, then push back up.",
      difficulty: Difficulty.Advanced,
      muscleGroup: [{ id: legs.id }],
      targetMuscle: [{ id: quadriceps.id }, { id: glutes.id }],
      equipment: [{ id: barbell.id }, { id: squatRack.id }],
    },
    {
      name: "Deadlift",
      slug: "deadlift",
      description: "A compound lift targeting the posterior chain.",
      instruction:
        "With feet shoulder-width apart, lift the barbell by extending your hips and knees simultaneously.",
      difficulty: Difficulty.Advanced,
      muscleGroup: [{ id: back.id }, { id: legs.id }],
      targetMuscle: [{ id: hamstrings.id }, { id: glutes.id }],
      equipment: [{ id: barbell.id }],
    },
    {
      name: "Pull-up",
      slug: "pull-up",
      description: "A bodyweight exercise targeting the back and biceps.",
      instruction:
        "Grab the pull-up bar with palms facing away, pull your body upward until your chin is above the bar, then lower yourself down.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: back.id }, { id: arms.id }],
      targetMuscle: [{ id: latissimusDorsi.id }, { id: biceps.id }],
      equipment: [{ id: pullUpBar.id }],
    },
    {
      name: "Overhead Press",
      slug: "overhead-press",
      description: "A compound shoulder exercise targeting the deltoids.",
      instruction:
        "Lift the barbell from your chest to overhead until your arms are fully extended, then lower it back down.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: shoulders.id }],
      targetMuscle: [{ id: deltoid.id }, { id: triceps.id }],
      equipment: [{ id: barbell.id }],
    },
    {
      name: "Lunges",
      slug: "lunges",
      description:
        "A unilateral lower-body exercise targeting glutes and quads.",
      instruction:
        "Step forward with one leg, lower your hips until both knees are bent at a 90-degree angle, then return to standing.",
      difficulty: Difficulty.Beginner,
      muscleGroup: [{ id: legs.id }],
      targetMuscle: [{ id: glutes.id }, { id: quadriceps.id }],
    },
    {
      name: "Kettlebell Swing",
      slug: "kettlebell-swing",
      description: "A full-body movement targeting hamstrings and glutes.",
      instruction:
        "Hold the kettlebell with both hands, swing it back between your legs, then thrust your hips forward to swing it upward.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: legs.id }],
      targetMuscle: [{ id: hamstrings.id }, { id: glutes.id }],
      equipment: [{ id: kettlebell.id }],
    },
    {
      name: "Incline Bench Press",
      slug: "incline-bench-press",
      description: "A chest exercise that emphasizes the upper pectorals.",
      instruction:
        "Lie on an incline bench and press the barbell upward until your arms are fully extended.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: chest.id }],
      targetMuscle: [{ id: pectoralisMajor.id }],
      equipment: [{ id: barbell.id }, { id: bench.id }],
    },
    {
      name: "Dumbbell Lateral Raise",
      slug: "dumbbell-lateral-raise",
      description: "An isolation exercise targeting the lateral deltoids.",
      instruction:
        "Hold a dumbbell in each hand, lift your arms to the sides until they are shoulder height, then lower them slowly.",
      difficulty: Difficulty.Beginner,
      muscleGroup: [{ id: shoulders.id }],
      targetMuscle: [{ id: deltoid.id }],
      equipment: [{ id: dumbbell.id }],
    },
    {
      name: "Chin-up",
      slug: "chin-up",
      description: "A bodyweight exercise emphasizing the biceps and back.",
      instruction:
        "Grab the bar with palms facing you, pull yourself up until your chin is above the bar, then lower yourself down.",
      difficulty: Difficulty.Intermediate,
      muscleGroup: [{ id: back.id }, { id: arms.id }],
      targetMuscle: [{ id: biceps.id }, { id: latissimusDorsi.id }],
      equipment: [{ id: pullUpBar.id }],
    },
  ];

  const exercises = [];
  for (const data of exerciseData) {
    const exercise = await prisma.exercise.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        difficulty: data.difficulty,
        instruction: data.instruction,
        muscleGroup: { connect: data.muscleGroup },
        targetMuscle: { connect: data.targetMuscle },
        equipment: { connect: data.equipment ?? [] },
      },
    });
    exercises.push(exercise);
  }

  // Seed Featured Exercises
  const featuredExerciseIds = [
    exercises[0].id,
    exercises[1].id,
    exercises[2].id,
    exercises[3].id,
  ]; // Adjust indices as needed
  for (const exerciseId of featuredExerciseIds) {
    await prisma.featureExercise.create({
      data: {
        exerciseId: exerciseId,
        featuredAt: new Date(),
      },
    });
  }

  // Seed Media

  const pushUp = await prisma.exercise.findUnique({
    where: { slug: "push-up" },
  });

  const benchPress = await prisma.exercise.findUnique({
    where: { slug: "bench-press" },
  });

  const barbellSquat = await prisma.exercise.findUnique({
    where: { slug: "barbell-squat" },
  });

  const pullUp = await prisma.exercise.findUnique({
    where: { slug: "pull-up" },
  });

  if (pushUp && benchPress && pullUp && barbellSquat) {
    const media = await prisma.media.createMany({
      data: [
        {
          mediaKey: "back-squat.jpg",
          type: MediaType.THUMBNAIL,
          exerciseId: barbellSquat.id,
        },
        {
          mediaKey: "bench-press.jpg",
          type: MediaType.THUMBNAIL,
          exerciseId: benchPress.id
        },
        {
          mediaKey: "gRVjAtPip0Y",
          type: MediaType.VIDEO,
          exerciseId: benchPress.id
        },
        {
          mediaKey: "pull-up.jpg",
          type: MediaType.THUMBNAIL,
          exerciseId: pullUp.id
        },
        {
          mediaKey: "push-up.png",
          type: MediaType.THUMBNAIL,
          exerciseId: pushUp.id
        }
      ],
    });
    console.log("Media seeded:", media);
  }


  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding failed.", e);
    await prisma.$disconnect();
    process.exit(1);
  });
