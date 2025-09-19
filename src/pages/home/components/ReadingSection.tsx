import { useTranslation } from 'react-i18next'

import { casualReadings, technicalReadings } from '@/static'

import { Card } from './Card'
import { ReadingList } from './ReadingList'

export function ReadingSection() {
  const { t } = useTranslation()

  return (
    <section className="py-5">
      <h4 className="text-lg md:text-xl font-medium mb-3">
        {t('home.reading.title')}
      </h4>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReadingList
            title={t('home.reading.technical')}
            items={technicalReadings}
          />
          <ReadingList
            title={t('home.reading.casual')}
            items={casualReadings}
          />
        </div>
      </Card>
    </section>
  )
}
