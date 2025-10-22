export const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="mt-2 border-t border-gray-300/50 pt-2">
    <span className="mb-1 block text-xs font-semibold text-gray-700">
      {title}
    </span>
    <div className="flex flex-wrap gap-1">{children}</div>
  </div>
)
