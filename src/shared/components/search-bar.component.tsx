import { ChevronDown, Filter, Search, X } from 'lucide-react'

import { useI18n } from '@/shared/hooks/use-i18n'

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
  const { t } = useI18n()

  return (
    <div className="mb-4 flex items-center gap-4">
      {/* Select de Filtro Apenas com Ícone */}
      <div className="relative w-10">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value as 'text' | 'tag')}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2 text-transparent shadow-sm outline-none transition-all duration-200 hover:bg-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <option value="" className="hidden" />
          <option value="text">{t('blog.search.filter.text')}</option>
          <option value="tag">{t('blog.search.filter.tag')}</option>
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
              placeholder={t('blog.search.placeholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 pl-10 pr-10 text-gray-900 shadow-sm outline-none transition-all duration-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
              className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2 pl-3 text-gray-900 shadow-sm outline-none transition-all duration-200 hover:bg-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              <option value="">{t('blog.search.selectTag')}</option>
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
