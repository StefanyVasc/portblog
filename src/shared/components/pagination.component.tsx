import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (newPage: number) => void
  onPageSizeChange?: (pageSize: number) => void
  label?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = [6, 9, 12, 18],
  onPageChange,
  onPageSizeChange,
  label
}: PaginationProps) {
  const maxVisiblePages = 5

  // Gera os números das páginas a serem exibidas
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= maxVisiblePages) {
      // Se total de páginas for menor ou igual ao limite, exibe todas
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage > 3) pages.push(1, '...')
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...', totalPages)
    }
    return pages
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground md:flex-row md:gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <span>{label}</span>
        <strong className="text-foreground">{totalItems}</strong>
        <span>·</span>
        <label className="flex items-center gap-2">
          <span>per page</span>
          <select
            value={pageSize}
            onChange={event => onPageSizeChange?.(Number(event.target.value))}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium uppercase text-foreground outline-none transition focus:border-rose-500 focus:ring-rose-500"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* 🔙 Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* 📄 Botões de Páginas */}
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`rounded-md px-3 py-1 text-xs font-semibold uppercase transition ${
                page === currentPage
                  ? 'bg-rose-500 text-white'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-muted-foreground">
              {page}
            </span>
          )
        )}

        {/* 🔜 Botão Próximo */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
