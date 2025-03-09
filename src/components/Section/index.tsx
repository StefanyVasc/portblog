export const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="border-t border-gray-300/50 mt-2 pt-2">
    <span className="block font-semibold text-gray-700 text-xs mb-1">
      {title}
    </span>
    <div className="flex flex-wrap gap-1">{children}</div>
  </div>
)
