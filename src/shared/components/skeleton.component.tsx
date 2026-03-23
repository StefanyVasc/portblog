import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('rounded-md bg-muted', className)}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    />
  )
}

export function PostListSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="flex min-h-[150px] flex-col justify-between gap-2 border-y py-4"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex h-[320px] flex-col justify-between rounded-lg border p-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  )
}

export function PostContentSkeleton() {
  return (
    <div className="space-y-4 py-6">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="mt-4 h-32 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}
