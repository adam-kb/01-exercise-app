import clsx from "clsx";

type FeedbackMessageProps = {
  type: "success" | "warning" | "error" | "info";
  title: string
  message?: string | string[] | null
}

const FeedbackMessage = ({ type, title, message }: FeedbackMessageProps) => {

  const classes = clsx(
    "my-2 p-2 border rounded-sm",
    type === "success" && "text-green-700 border-green-700 bg-green-100",
    type === "warning" && "text-yellow-700 border-yellow-700 bg-yellow-100",
    type === "error" && "text-red-700 border-red-700 bg-red-100",
    type === "info" && "text-slate-700 border-slate-700 bg-slate-100",
  );

  return (
    <div className={classes}>
      <strong>{title}</strong> {message && message}
    </div >
  );
};

export default FeedbackMessage;