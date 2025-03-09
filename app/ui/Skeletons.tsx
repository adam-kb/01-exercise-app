const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const FetchedCheckboxes = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl p-2`}>
      <div className="h-6 w-40 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
      <div className="h-4 w-32 bg-slate-200 rounded-sm my-1.5"></div>
    </div>
  )
}
