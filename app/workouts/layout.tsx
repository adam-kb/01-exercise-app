import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Workouts',
    default: 'Workouts'
  },
  description: "List of Workouts",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
}

export default Layout;
