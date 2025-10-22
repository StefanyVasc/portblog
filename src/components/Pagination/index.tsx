import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
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
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* 🔙 Botão Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-gray-900 disabled:opacity-50 dark:hover:text-gray-100"
      >
        <ChevronLeft size={18} />
      </button>

      {/* 📄 Botões de Páginas */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`rounded-md px-3 py-1 ${
              page === currentPage
                ? 'bg-rose-500 font-bold text-white'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* 🔜 Botão Próximo */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-gray-900 disabled:opacity-50 dark:hover:text-gray-100"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
