export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[96vh] w-[98%] mx-auto mt-1 mb-5 bg-paper rounded-xl">
      <div className=" h-[96%] w-[100%] mx-auto my-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 bg-paper">
        {children}
      </div>
    </div>
  )
} 