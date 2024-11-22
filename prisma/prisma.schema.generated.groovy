// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// This is the Prisma schema for your workout app

// Defines the exercise table
model Exercise {
  id                  Int                  @id @default(autoincrement())
  name                String               @unique
  slug                String               @unique
  description         String?
  createdAt           DateTime             @default(now())
  updatedAt           DateTime             @updatedAt
  status              ExerciseStatus       @default(ACTIVE)
  difficulty          Difficulty           @default(Beginner)
  targetedMuscles     ExerciseTargetedMuscle[]
  equipment           Equipment[]          @relation("ExerciseEquipment")
  muscleGroups        ExerciseMuscleGroup[]
  tags                ExerciseTag[]
  instructions        ExerciseInstruction[]
  media               ExerciseMedia[]
}

enum ExerciseStatus {
  ACTIVE
  FEATURED
  ARCHIVED
}

enum Difficulty {
  Beginner
  Intermediate
  Advanced
}

// Defines the muscle group (e.g., Chest, Legs, etc.)
model MuscleGroup {
  id          Int                 @id @default(autoincrement())
  name        String              @unique
  description String?
  exercises   ExerciseMuscleGroup[]
}

// Defines the targeted muscles (e.g., Pectoralis Major, Deltoid, etc.)
model TargetedMuscle {
  id          Int                 @id @default(autoincrement())
  name        String              @unique
  exercises   ExerciseTargetedMuscle[]
}

// Defines the equipment (e.g., Dumbbells, Barbell, Bench, etc.)
model Equipment {
  id          Int                 @id @default(autoincrement())
  name        String              @unique
  description String?
  exercises   Exercise[]          @relation("ExerciseEquipment")
}

// Join table for many-to-many between Exercise and TargetedMuscles
model ExerciseTargetedMuscle {
  exerciseId  Int
  muscleId    Int
  exercise    Exercise   @relation(fields: [exerciseId], references: [id])
  muscle      TargetedMuscle @relation(fields: [muscleId], references: [id])

  @@id([exerciseId, muscleId]) // composite primary key
}

// Join table for many-to-many between Exercise and MuscleGroup
model ExerciseMuscleGroup {
  exerciseId   Int
  muscleGroupId Int
  exercise     Exercise     @relation(fields: [exerciseId], references: [id])
  muscleGroup  MuscleGroup  @relation(fields: [muscleGroupId], references: [id])

  @@id([exerciseId, muscleGroupId]) // composite primary key
}

// Defines tags for exercises (optional for categorization)
model Tag {
  id    Int     @id @default(autoincrement())
  name  String  @unique
  exercises ExerciseTag[]
}

// Join table for many-to-many between Exercise and Tag
model ExerciseTag {
  exerciseId Int
  tagId      Int
  exercise   Exercise  @relation(fields: [exerciseId], references: [id])
  tag        Tag       @relation(fields: [tagId], references: [id])

  @@id([exerciseId, tagId]) // composite primary key
}

// Exercise instructions (optional)
model ExerciseInstruction {
  id          Int      @id @default(autoincrement())
  exerciseId  Int
  instruction String
  exercise    Exercise @relation(fields: [exerciseId], references: [id])
}

// Media for exercises (optional)
model ExerciseMedia {
  id          Int      @id @default(autoincrement())
  exerciseId  Int
  mediaUrl    String
  mediaType   MediaType
  exercise    Exercise @relation(fields: [exerciseId], references: [id])
}

enum MediaType {
  IMAGE
  VIDEO
}
