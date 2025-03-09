import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  customClasses?: string;
  children: ReactNode;
};

const Card = ({ customClasses, children }: CardProps) => {
  const classes = clsx(
    "mx-auto border bg-slate-50 rounded-sm p-4 my-4",
    customClasses
  );

  return <section className={classes}>{children}</section>;
};

export default Card;
