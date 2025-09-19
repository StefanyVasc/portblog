import { ChevronDown, Filter, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <div className="flex gap-4 items-center mb-4">
      {/* Select de Filtro Apenas com Ícone */}
      <div className="relative w-10">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value as 'text' | 'tag')}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-transparent focus:border-rose-500 focus:ring-2 focus:ring-rose-500 outline-none transition-all duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 appearance-none"
        >
          <option value="" className="hidden" />
          <option value="text">{t('blog.search.filter.text')}</option>
          <option value="tag">{t('blog.search.filter.tag')}</option>
        </select>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
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
              className="w-full p-2 pl-10 pr-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500 outline-none transition-all duration-200 shadow-sm"
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
              className="w-full p-2 pl-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500 outline-none transition-all duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 appearance-none"
            >
              <option value="">{t('blog.search.selectTag')}</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
