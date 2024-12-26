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
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

export default Layout;
