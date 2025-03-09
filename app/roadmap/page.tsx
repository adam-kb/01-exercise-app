import { Metadata } from "next";
import Card from "../ui/Card";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Roadmap for the app.",
};


const RoadMap = () => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Always striving for improvement. <br/><span className="text-xl md:text-xl text-slate-600">In the pipe 5x5</span></h1>
      <div>
        <ul>
          <li>
            <Card customClasses="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">🚀 Phase 1: MVP (Completed)</h2>
              <ul className="card">
                <li>✅ Basic CRUD App (Done)</li>
                <li>✅ Basic Search Page (Done)</li>
              </ul>
            </Card>
          </li>
          <li>
            <Card customClasses="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">🔄 Phase 2: Core Features & UX Enhancements</h2>
              <ul className="leading-loose">
                <li>🔜 <strong>Exercises</strong> &ndash; Images for each exercise</li>
                <li>🔜 <strong>Workouts System</strong> &ndash; Users can create, update, and organize workouts.</li>
                <li>⬜ <strong>Exercise Autocomplete</strong> &ndash; Suggest exercises as users type in the search bar.</li>
                <li>⬜ <strong>Sorting & Filtering</strong> &ndash; Sort exercises by tags (muscle group, equipment, difficulty).</li>
                <li>⬜ <strong>Related Exercises</strong> &ndash; Show alternatives or progressions for exercises.</li>
              </ul>
            </Card>
          </li>
          <li>
            <Card customClasses="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">🔑 Phase 3: User Accounts & Personalization</h2>
              <ul className="leading-loose">
                <li>⬜ <strong>User Authentication</strong> &ndash; Accounts via email/social login.</li>
                <li>⬜ <strong>Custom Workout Plans</strong> &ndash; Users can create structured training programs.</li>
                <li>⬜ <strong>Favorites & History</strong> &ndash; Users can save workouts/exercises.</li>
              </ul>
            </Card>
          </li>
        </ul>
        <p>Interested in more detail? Take a look here: <a href="https://github.com/adam-kb/01-exercise-app/commits/main/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-emerald-600">Changelog</a></p>
      </div >
    </>
  )
}

export default RoadMap;
