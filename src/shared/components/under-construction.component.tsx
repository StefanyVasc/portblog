import { texts } from '@/shared/content/texts'

export function UnderConstruction() {
  const underConstruction = texts.underConstruction

  return (
    <div className="flex h-60 flex-col items-center justify-center text-gray-600 dark:text-gray-400">
      <span className="text-5xl">🚧</span>
      <h3 className="mt-3 text-xl font-semibold">{underConstruction.title}</h3>
      <p className="mt-1 text-sm">{underConstruction.description}</p>
    </div>
  )
}
