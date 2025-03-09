import clsx from 'clsx'

export const Card = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={clsx('p-6 border rounded-lg shadow-md my-4', className)}>
    {children}
  </div>
)
