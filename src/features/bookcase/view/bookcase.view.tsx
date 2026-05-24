import { BookOpen, CalendarDays, Heart, Quote } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/components'
import { SITE_META } from '@/shared/config/site'
import { texts } from '@/shared/content/texts'
import {
  type BookcaseBook,
  BookcaseBooks,
  type BookcaseBookStatus
} from '@/shared/static'
import {
  getBooksByCategory,
  getMonthlyReadings,
  getYearlyReadingHistory,
  isValidMonthKey
} from '@/shared/utils/bookcase'
import { updateSeo } from '@/shared/utils/update-seo'

const statusClassName: Record<BookcaseBookStatus, string> = {
  reading: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  read: 'border-rose-200 bg-rose-50 text-rose-700',
  'want to read': 'border-amber-200 bg-amber-50 text-amber-700'
}

function BookStatusBadge({ status }: { status: BookcaseBookStatus }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase',
        statusClassName[status]
      )}
    >
      {texts.bookcase.status[status]}
    </span>
  )
}

function BookCard({
  book,
  compact = false
}: {
  book: BookcaseBook
  compact?: boolean
}) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-lg border bg-background shadow-sm',
        compact ? 'p-4' : 'p-5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <BookStatusBadge status={book.status} />
          <h3
            className={cn(
              'mt-3 font-semibold',
              compact ? 'text-sm md:text-base' : 'text-base md:text-lg'
            )}
          >
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        </div>

        {book.favorite ? (
          <Heart
            aria-label="livro favorito"
            className="mt-1 h-5 w-5 shrink-0 fill-rose-500 text-rose-500"
          />
        ) : null}
      </div>

      <p
        className="mt-3 flex-1 overflow-hidden text-sm leading-6 text-gray-700"
        style={
          compact
            ? {
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }
            : undefined
        }
      >
        {book.note}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {texts.bookcase.categories[book.category]}
        </span>
        {book.tags.map(tag => (
          <span
            key={`${book.title}-${tag}`}
            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

function FavoriteQuotes({ books }: { books: BookcaseBook[] }) {
  const BookcaseTexts = texts.bookcase

  return (
    <div>
      <div className="max-h-[430px] overflow-y-auto rounded-lg border bg-background p-3">
        <div className="space-y-3">
          {books.length > 0 ? (
            books.map(book => (
              <article
                key={`${book.title}-quotes`}
                className="rounded-lg border p-4"
              >
                <h3 className="text-sm font-semibold">{book.title}</h3>
                <div className="mt-3 space-y-3">
                  {book.quotes.map(quote => (
                    <blockquote
                      key={`${book.title}-${quote}`}
                      className="border-l-2 border-rose-500 pl-3 text-sm italic leading-6 text-gray-700"
                    >
                      {quote}
                    </blockquote>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              {BookcaseTexts.emptyQuotes}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function BookcaseSummary({
  booksCount,
  favoritesCount,
  quotesCount
}: {
  booksCount: number
  favoritesCount: number
  quotesCount: number
}) {
  return (
    <div className="flex flex-wrap gap-3 xl:max-w-md xl:items-start">
      <SummaryCard
        icon={BookOpen}
        value={booksCount}
        label="livros registrados"
      />
      <SummaryCard icon={Heart} value={favoritesCount} label="favoritos" />
      <SummaryCard icon={Quote} value={quotesCount} label="quotes guardados" />
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  value,
  label
}: {
  icon: typeof BookOpen
  value: number
  label: string
}) {
  return (
    <div className="inline-flex w-fit items-center gap-3 rounded-lg border-2 border-dashed border-rose-200 bg-background px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rose-50">
        <Icon className="h-4 w-4 text-rose-600" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xl font-semibold leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</p>
      </div>
    </div>
  )
}

function MonthlyBookColumn({
  title,
  books,
  stableHeight = true
}: {
  title: string
  books: BookcaseBook[]
  stableHeight?: boolean
}) {
  return (
    <div className={cn('flex min-h-0 flex-col', stableHeight && 'h-full')}>
      <h3 className="mb-3 shrink-0 text-sm font-semibold uppercase text-muted-foreground">
        {title}
      </h3>

      {books.length > 0 ? (
        <div
          className={cn(
            'space-y-3 pr-2',
            stableHeight ? 'min-h-0 flex-1 overflow-y-auto' : 'overflow-visible'
          )}
        >
          {books.map(book => (
            <article
              key={`${title}-${book.title}`}
              className="rounded-lg border bg-background p-4"
            >
              <h4 className="text-base font-semibold">{book.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {book.author}
              </p>
              <div className="mt-3">
                <BookStatusBadge status={book.status} />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {book.note}
              </p>

              {book.quotes.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {book.quotes.map(quote => (
                    <blockquote
                      key={`${book.title}-${quote}`}
                      className="border-l-2 border-rose-500 pl-3 text-sm italic leading-6 text-gray-700"
                    >
                      {quote}
                    </blockquote>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  {texts.bookcase.emptyQuotes}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p
          className={cn(
            'flex items-center rounded-lg border p-4 text-sm text-muted-foreground',
            stableHeight && 'min-h-0 flex-1'
          )}
        >
          {texts.bookcase.emptyMonthlyCategory}
        </p>
      )}
    </div>
  )
}

export function BookcaseView() {
  const BookcaseTexts = texts.bookcase
  const [searchParams, setSearchParams] = useSearchParams()
  const favoriteBooks = BookcaseBooks.filter(book => book.favorite)
  const booksWithQuotes = BookcaseBooks.filter(book => book.quotes.length > 0)
  const featuredBooks = BookcaseBooks.slice(0, 3)
  const quotesCount = BookcaseBooks.reduce(
    (total, book) => total + book.quotes.length,
    0
  )
  const monthlyReadings = useMemo(() => getMonthlyReadings(BookcaseBooks), [])
  const requestedMonth = searchParams.get('month')
  const latestMonth = monthlyReadings[0]?.key
  const selectedMonth =
    monthlyReadings.some(group => group.key === requestedMonth) &&
    isValidMonthKey(requestedMonth)
      ? requestedMonth
      : latestMonth

  useEffect(() => {
    if (
      requestedMonth &&
      latestMonth &&
      (!isValidMonthKey(requestedMonth) ||
        !monthlyReadings.some(group => group.key === requestedMonth))
    ) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('month', latestMonth)
      setSearchParams(nextParams, { replace: true })
    }
  }, [
    latestMonth,
    monthlyReadings,
    requestedMonth,
    searchParams,
    setSearchParams
  ])

  useEffect(() => {
    updateSeo({
      title: SITE_META.bookcase.title,
      description: SITE_META.bookcase.description,
      canonicalPath: requestedMonth
        ? `/bookcase?month=${selectedMonth}`
        : '/bookcase',
      type: 'website'
    })
  }, [requestedMonth, selectedMonth])

  const handleMonthChange = (month: string) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('month', month)
    setSearchParams(nextParams)
  }

  return (
    <div>
      <Header headerName={BookcaseTexts.header}>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          {BookcaseTexts.intro}
        </p>
      </Header>

      <section className="grid gap-6 py-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="mb-4 text-lg font-medium md:text-xl">
            {BookcaseTexts.featured}
          </h2>
          <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-1">
            {featuredBooks.map(book => (
              <BookCard key={book.title} book={book} compact />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-lg font-medium md:text-xl">
            {BookcaseTexts.quotes}
          </h2>
          <BookcaseSummary
            booksCount={BookcaseBooks.length}
            favoritesCount={favoriteBooks.length}
            quotesCount={quotesCount}
          />
          <FavoriteQuotes books={booksWithQuotes} />
        </div>
      </section>

      <section className="py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium md:text-xl">
            {BookcaseTexts.monthlyReadings}
          </h2>
          <Link
            to="/bookcase/history"
            className="text-sm font-semibold text-rose-600 hover:underline"
          >
            {BookcaseTexts.viewHistory}
          </Link>
        </div>

        {monthlyReadings.length > 0 && selectedMonth ? (
          <Tabs
            value={selectedMonth}
            onValueChange={handleMonthChange}
            className="w-full"
          >
            <TabsList className="h-auto max-w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {monthlyReadings.map(group => (
                <TabsTrigger
                  key={group.key}
                  value={group.key}
                  className="gap-2 border bg-background px-4 py-2 data-[state=active]:border-rose-400 data-[state=active]:text-rose-700"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {monthlyReadings.map(group => {
              const booksByCategory = getBooksByCategory(group.books)

              return (
                <TabsContent
                  key={`${group.key}-content`}
                  value={group.key}
                  className="mt-4 h-[min(620px,calc(100vh-12rem))] rounded-lg border bg-background p-4"
                >
                  <div className="flex h-full min-h-0 flex-col">
                    <div className="mb-4 shrink-0">
                      <h3 className="text-base font-semibold">{group.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {group.books.length}{' '}
                        {group.books.length === 1
                          ? 'livro registrado'
                          : 'livros registrados'}
                      </p>
                    </div>

                    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
                      <MonthlyBookColumn
                        title={BookcaseTexts.monthlyTechnical}
                        books={booksByCategory.technical}
                      />
                      <MonthlyBookColumn
                        title={BookcaseTexts.monthlyNonTechnical}
                        books={booksByCategory.nonTechnical}
                      />
                    </div>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        ) : (
          <p className="text-sm text-muted-foreground">
            {BookcaseTexts.noMonthlyReadings}
          </p>
        )}
      </section>
    </div>
  )
}

export function BookcaseHistoryView() {
  const BookcaseTexts = texts.bookcase
  const yearlyHistory = useMemo(
    () => getYearlyReadingHistory(BookcaseBooks),
    []
  )
  const showYearHeadings = yearlyHistory.length > 1

  useEffect(() => {
    updateSeo({
      title: BookcaseTexts.history,
      description: SITE_META.bookcase.description,
      canonicalPath: '/bookcase/history',
      type: 'website'
    })
  }, [BookcaseTexts.history])

  return (
    <div>
      <Header headerName={BookcaseTexts.history}>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          {BookcaseTexts.historyIntro}
        </p>
      </Header>

      <div className="py-5">
        <Link
          to="/bookcase"
          className="text-sm font-semibold text-rose-600 hover:underline"
        >
          {BookcaseTexts.backToBookcase}
        </Link>
      </div>

      {yearlyHistory.length > 0 ? (
        <div className="space-y-8 pb-5">
          {yearlyHistory.map(yearGroup => (
            <section key={yearGroup.year}>
              {showYearHeadings ? (
                <h2 className="mb-4 text-lg font-medium md:text-xl">
                  {yearGroup.year}
                </h2>
              ) : null}

              <Accordion type="multiple" className="space-y-3">
                {yearGroup.months.map(monthGroup => {
                  const booksByCategory = getBooksByCategory(monthGroup.books)

                  return (
                    <AccordionItem key={monthGroup.key} value={monthGroup.key}>
                      <AccordionTrigger>
                        <span>
                          <span className="block text-base font-semibold">
                            {monthGroup.label}
                          </span>
                          <span className="mt-1 block text-sm font-normal text-muted-foreground">
                            {monthGroup.books.length}{' '}
                            {monthGroup.books.length === 1
                              ? 'livro registrado'
                              : 'livros registrados'}
                          </span>
                        </span>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="grid gap-4 lg:grid-cols-2">
                          <MonthlyBookColumn
                            title={BookcaseTexts.monthlyTechnical}
                            books={booksByCategory.technical}
                            stableHeight={false}
                          />
                          <MonthlyBookColumn
                            title={BookcaseTexts.monthlyNonTechnical}
                            books={booksByCategory.nonTechnical}
                            stableHeight={false}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {BookcaseTexts.noMonthlyReadings}
        </p>
      )}
    </div>
  )
}
