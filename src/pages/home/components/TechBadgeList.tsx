import { Badge } from '@/components'

type TechBadgeListProps = {
  title: string
  items: string[]
}

export function TechBadgeList({ title, items }: TechBadgeListProps) {
  return (
    <div>
      <h5 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground md:text-sm">
        {title}
      </h5>

      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map(item => (
          <li key={item}>
            <Badge text={item} color="gray" variant="outline" size="xs" />
          </li>
        ))}
      </ul>
    </div>
  )
}
