type BadgeProps = {
  text: string
  color?:
    | 'blue'
    | 'green'
    | 'red'
    | 'yellow'
    | 'gray'
    | 'black'
    | 'white'
    | 'rose'
  variant?: 'solid' | 'outline'
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
}

export function Badge({
  text,
  color = 'blue',
  variant = 'solid',
  size = 'sm'
}: BadgeProps) {
  const baseClasses = 'px-2 py-0.5 font-medium rounded-lg font-300'

  const sizeClasses = {
    xxs: 'text-[9px] px-1 py-0',
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-sm px-2.5 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  }

  const colorVariants = {
    blue:
      variant === 'solid'
        ? 'bg-blue-600 text-white'
        : 'border border-blue-600 text-blue-600',
    green:
      variant === 'solid'
        ? 'bg-green-600 text-white'
        : 'border border-green-600 text-green-600',
    red:
      variant === 'solid'
        ? 'bg-red-600 text-white'
        : 'border border-red-600 text-red-600',
    yellow:
      variant === 'solid'
        ? 'bg-yellow-500 text-white'
        : 'border border-yellow-500 text-yellow-500',
    gray:
      variant === 'solid'
        ? 'bg-gray-600 text-white'
        : 'border border-gray-600 text-gray-600',
    black:
      variant === 'solid'
        ? 'bg-black text-white'
        : 'border border-black text-black',
    white:
      variant === 'solid'
        ? 'bg-white text-black'
        : 'border border-white text-white',
    rose:
      variant === 'solid'
        ? 'bg-rose-500 text-white'
        : 'border border-rose-500 text-rose-500'
  }

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${colorVariants[color]}`}
    >
      {text}
    </span>
  )
}
