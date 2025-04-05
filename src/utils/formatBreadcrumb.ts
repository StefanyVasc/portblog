export function formatBreadcrumb(slug?: string) {
  if (!slug) return []
  return location.pathname
    .split('/')
    .filter(path => path)
    .map((segment, index, array) => {
      if (index === array.length - 1 && slug) {
        const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/)
        if (dateMatch) {
          const [, year, month, day, rawTitle] = dateMatch
          return `${day}/${month}/${year} - ${rawTitle.replace(/_/g, ' ')}`
        }
      }
      return segment
    })
}
