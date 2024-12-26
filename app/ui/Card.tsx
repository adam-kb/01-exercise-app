import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode}) => {
  return (
    <section className="mx-auto border bg-slate-50 rounded-sm p-4 my-4">
      {children}
    </section>
  );
};

export default Card;
