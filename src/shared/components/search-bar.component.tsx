import { ChevronDown, Filter, Search, X } from 'lucide-react'

import { texts } from '@/shared/content/texts'

interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
  searchType: 'text' | 'tag'
  setSearchType: (value: 'text' | 'tag') => void
  allTags: string[]
}

export function SearchBar({
  search,
  setSearch,
  searchType,
  setSearchType,
  allTags
}: SearchBarProps) {
  const searchTexts = texts.blog.search

  return (
    <div className="mb-4 flex items-center gap-4">
      {/* Select de Filtro Apenas com Ícone */}
      <div className="relative h-12 w-12">
        <select
          aria-label="Tipo de busca"
          value={searchType}
          onChange={e => setSearchType(e.target.value as 'text' | 'tag')}
          className="h-full w-full appearance-none rounded-md border border-border bg-background text-transparent outline-none transition-all hover:bg-muted focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
        >
          <option value="" className="hidden" />
          <option value="text">{searchTexts.filter.text}</option>
          <option value="tag">{searchTexts.filter.tag}</option>
        </select>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400">
          <Filter size={18} />
        </div>
      </div>

      {/* 🔍 Campo de Busca */}
      <div className="relative w-full">
        {searchType === 'text' ? (
          <>
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={searchTexts.placeholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background p-2 pl-10 pr-10 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Limpar busca"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </>
        ) : (
          <div className="relative w-full">
            <select
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full appearance-none rounded-md border border-border bg-background p-2 pl-3 text-sm outline-none transition-all hover:bg-muted focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
            >
              <option value="">{searchTexts.selectTag}</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-3 text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
