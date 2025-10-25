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
  variant?: 'solid' | 'outline' | 'outlineSoft'
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
    xxs: 'text-[10px] leading-tight px-1.5 py-[1px]',
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-sm px-2.5 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  }

  const colorVariants = {
    blue: {
      solid: 'bg-blue-600 text-white',
      outline: 'border border-blue-600 text-blue-600',
      outlineSoft:
        'border border-blue-600 text-blue-600 bg-blue-500/5 dark:bg-blue-500/20'
    },
    green: {
      solid: 'bg-green-600 text-white',
      outline: 'border border-green-600 text-green-600',
      outlineSoft:
        'border border-green-600 text-green-600 bg-green-500/5 dark:bg-green-500/20'
    },
    red: {
      solid: 'bg-red-600 text-white',
      outline: 'border border-red-600 text-red-600',
      outlineSoft:
        'border border-red-600 text-red-600 bg-red-500/5 dark:bg-red-500/20'
    },
    yellow: {
      solid: 'bg-yellow-500 text-white',
      outline: 'border border-yellow-500 text-yellow-500',
      outlineSoft:
        'border border-yellow-500 text-yellow-600 bg-yellow-400/10 dark:bg-yellow-500/20'
    },
    gray: {
      solid: 'bg-gray-600 text-white',
      outline: 'border border-gray-600 text-gray-600',
      outlineSoft:
        'border border-gray-600 text-gray-700 bg-gray-500/5 dark:text-gray-200 dark:bg-gray-500/20'
    },
    black: {
      solid: 'bg-black text-white',
      outline: 'border border-black text-black',
      outlineSoft:
        'border border-black text-black bg-black/5 dark:text-white dark:bg-white/20'
    },
    white: {
      solid: 'bg-white text-black',
      outline: 'border border-white text-white',
      outlineSoft:
        'border border-white text-white/90 bg-white/25 dark:text-black dark:bg-white'
    },
    rose: {
      solid: 'bg-rose-500 text-white',
      outline: 'border border-rose-500 text-rose-500',
      outlineSoft:
        'border border-rose-500 text-rose-600 bg-rose-500/5 dark:text-rose-300 dark:bg-rose-500/20'
    }
  }

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${colorVariants[color][variant]}`}
    >
      {text}
    </span>
  )
}
