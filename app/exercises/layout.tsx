import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Exercises',
    default: 'Exercises'
  },
  description: "List of exercises",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
}

export default Layout;
