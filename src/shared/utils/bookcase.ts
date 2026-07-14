import type { BookcaseBook, Reading, ReadingTag } from '@/shared/static'

const monthNames = [
  'janeiro',
  'fevereiro',
  'marco',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

export type MonthlyReadingGroup = {
  key: string
  label: string
  books: BookcaseBook[]
}

export type YearlyReadingGroup = {
  year: string
  months: MonthlyReadingGroup[]
}

export function isValidMonthKey(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return false

  const month = Number(value.slice(5, 7))
  return month >= 1 && month <= 12
}

export function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split('-')
  const monthIndex = Number(month) - 1

  return `${monthNames[monthIndex]} de ${year}`
}

export function getMonthlyReadings(
  books: BookcaseBook[]
): MonthlyReadingGroup[] {
  const groups = books.reduce<Record<string, MonthlyReadingGroup>>(
    (acc, book) => {
      getBookMonthKeys(book).forEach(monthKey => {
        acc[monthKey] ??= {
          key: monthKey,
          label: formatMonthLabel(monthKey),
          books: []
        }

        acc[monthKey].books.push(book)
      })

      return acc
    },
    {}
  )

  return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key))
}

export function getYearlyReadingHistory(
  books: BookcaseBook[]
): YearlyReadingGroup[] {
  const monthlyReadings = getMonthlyReadings(books)
  const groups = monthlyReadings.reduce<Record<string, YearlyReadingGroup>>(
    (acc, month) => {
      const year = month.key.slice(0, 4)

      acc[year] ??= {
        year,
        months: []
      }

      acc[year].months.push(month)

      return acc
    },
    {}
  )

  return Object.values(groups).sort((a, b) => b.year.localeCompare(a.year))
}

export function getBooksByCategory(books: BookcaseBook[]) {
  return {
    technical: books.filter(book => book.category === 'tecnico'),
    nonTechnical: books.filter(book => book.category !== 'tecnico')
  }
}

export function getHomepageReadings(books: BookcaseBook[], limit = 3) {
  const { technical, nonTechnical } = getBooksByCategory(
    [...books].sort(compareBooksForHomepage)
  )

  return {
    technical: technical.slice(0, limit).map(mapBookcaseBookToReading),
    casual: nonTechnical.slice(0, limit).map(mapBookcaseBookToReading)
  }
}

function getBookMonthKeys(book: BookcaseBook): string[] {
  const rawMonthKeys = book.month
    ? Array.isArray(book.month)
      ? book.month
      : [book.month]
    : book.readAt?.slice(0, 7)
      ? [book.readAt.slice(0, 7)]
      : []

  return rawMonthKeys.filter(isValidMonthKey)
}

function getLatestBookMonth(book: BookcaseBook) {
  return getBookMonthKeys(book).sort((a, b) => b.localeCompare(a))[0] ?? ''
}

function compareBooksForHomepage(a: BookcaseBook, b: BookcaseBook) {
  const statusOrder: Record<BookcaseBook['status'], number> = {
    reading: 0,
    read: 1,
    'want to read': 2
  }

  const statusDiff = statusOrder[a.status] - statusOrder[b.status]
  if (statusDiff !== 0) return statusDiff

  const monthDiff = getLatestBookMonth(b).localeCompare(getLatestBookMonth(a))
  if (monthDiff !== 0) return monthDiff

  return Number(Boolean(b.favorite)) - Number(Boolean(a.favorite))
}

function mapBookcaseBookToReading(book: BookcaseBook): Reading {
  const tags: ReadingTag[] = []

  if (book.favorite || book.status === 'want to read') {
    tags.push('recommendation')
  }

  if (book.status === 'reading') {
    tags.push('reading')
  }

  if (book.status === 'read') {
    tags.push('last read')
  }

  return {
    title: book.title,
    author: book.author,
    tags: tags.length > 0 ? tags : ['recommendation']
  }
}
