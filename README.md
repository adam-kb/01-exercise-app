# Exercise App

## Overview
This is an **exercise tracking app** built with **Next.js**, **Prisma**, and **TanStack Query**. The goal is to provide a clean, functional UI for searching exercises, creating workouts, and organizing fitness routines. This is a **portfolio project** and is **not a commercial product**.

## Tech Stack
- **Frontend:** Next.js (React-based framework)
- **State Management & Data Fetching:** TanStack Query
- **Database ORM:** Prisma
<!-- - **Backend:** (TBD, will be updated later) -->

## Features & Roadmap

### **Phase 1: MVP (Completed)**
- ✅ **Basic CRUD App** (Done)
- ✅ **Basic Search Page** (Done)

### **Phase 2: Core Features & UX Enhancements**
- 🔜 **Exercises** – Images for each exercise
- 🔜 **Workouts System** – Users can create, update, and organize workouts.
- ⬜ **Exercise Autocomplete** – Suggest exercises as users type in the search bar.
- ⬜ **Sorting & Filtering** – Sort exercises by tags (muscle group, equipment, difficulty).
- ⬜ **Related Exercises** – Show alternatives or progressions for exercises.

### **Phase 3: User Accounts & Personalization**
- ⬜ **User Authentication** – Accounts via email/social login.
- ⬜ **Custom Workout Plans** – Users can create structured training programs.
- ⬜ **Favorites & History** – Users can save workouts/exercises.

## Getting Started

### **Prerequisites**
- Node.js (Latest LTS version recommended)
- npm or yarn installed
- PostgreSQL (or your chosen database, configured via Prisma)

### **Installation & Setup**
**Clone the repository:**
```sh
git clone https://github.com/adam-kb/01-exercise-app.git
cd exercise-app
```

**Install dependencies:**
```sh
npm install  # or yarn install
```

**Set up environment variables:**
Create a `.env` file in the root directory and add your database credentials and other necessary environment variables.
```env
DATABASE_URL=your_database_url_here
NEXT_PUBLIC_API_URL=your_api_endpoint_here
```

**Run the development server:**
```sh
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:3000`.

## License
This project is **open-source** under the MIT License. Feel free to fork, modify, or contribute.

## Disclaimer
This app is a **personal portfolio project** and is provided **as-is**, without guarantees of accuracy, completeness, or suitability for fitness training. Consult a **qualified healthcare provider** before beginning any exercise program.
