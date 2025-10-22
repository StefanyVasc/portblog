import clsx from 'clsx'

export const Card = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={clsx('my-4 rounded-lg border p-6 shadow-md', className)}>
    {children}
  </div>
)
