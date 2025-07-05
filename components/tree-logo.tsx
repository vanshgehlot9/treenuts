import { cn } from "@/lib/utils"

interface TreeLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function TreeLogo({ className, size = "md" }: TreeLogoProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  return (
    <div className={cn("relative", sizes[size], className)}>
      {/* Traditional Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 opacity-30"></div>

      {/* Tree trunk with texture */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[25%] h-[45%] bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-sm">
        {/* Trunk texture lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-30 w-full h-[2px] top-1/4"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-30 w-full h-[2px] top-3/4"></div>
      </div>

      {/* Tree foliage layers with ethnic patterns */}
      <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[85%] h-[45%] bg-gradient-to-t from-green-800 via-green-700 to-green-600 rounded-full opacity-90">
        {/* Inner pattern */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-green-700 to-green-500 opacity-60"></div>
      </div>
      <div className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-[75%] h-[40%] bg-gradient-to-t from-green-700 via-green-600 to-green-500 rounded-full opacity-85">
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-green-600 to-green-400 opacity-50"></div>
      </div>
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[65%] h-[35%] bg-gradient-to-t from-green-600 via-green-500 to-green-400 rounded-full opacity-80">
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-green-500 to-green-300 opacity-40"></div>
      </div>

      {/* Decorative nuts with ethnic styling */}
      <div className="absolute bottom-[30%] left-[15%] w-[18%] h-[18%] bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-sm border border-amber-400"></div>
      <div className="absolute bottom-[45%] right-[20%] w-[16%] h-[16%] bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-sm border border-orange-300"></div>
      <div className="absolute top-[20%] left-[25%] w-[14%] h-[14%] bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full shadow-sm border border-yellow-300"></div>
      <div className="absolute top-[35%] right-[30%] w-[12%] h-[12%] bg-gradient-to-br from-red-400 to-orange-400 rounded-full shadow-sm border border-red-300"></div>

      {/* Traditional decorative dots */}
      <div className="absolute top-[10%] left-[45%] w-[8%] h-[8%] bg-amber-300 rounded-full opacity-70"></div>
      <div className="absolute bottom-[20%] right-[45%] w-[6%] h-[6%] bg-orange-300 rounded-full opacity-60"></div>

      {/* Center mandala dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] h-[10%] bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-80 shadow-inner"></div>
    </div>
  )
}
