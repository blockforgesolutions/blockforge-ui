export function CourseSkeletonCard() {
  return (
    <div className="w-full bg-card rounded-xl shadow border border-border p-4 animate-pulse space-y-4 flex flex-col">
      <div className="h-40 bg-muted rounded-md" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-8 h-8 bg-muted rounded-full" />
        <div className="w-24 h-4 bg-muted rounded" />
      </div>
    </div>
  );
}
