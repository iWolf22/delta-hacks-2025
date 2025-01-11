export function Separator({ className = "" }: { className?: string }) {
  return (
    <div className={`h-[1px] w-full bg-gray-200 ${className}`} />
  )
} 