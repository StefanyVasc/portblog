export const formatPostName = (post: string) => {
  // Captura a data (yyyy-mm-dd) e o título
  const match = post.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/)
  if (!match) return { formattedDate: '', formattedTitle: post }

  const [, year, month, day, rawTitle] = match
  const formattedDate = `${day}/${month}/${year}` // Formato dd/mm/yyyy
  const formattedTitle = rawTitle
    .replace(/-/g, ' ') // Substitui hífens por espaços
    .replace(/_/g, ' ') // Substitui underscores por espaços
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitaliza cada palavra

  return { formattedDate, formattedTitle }
}
