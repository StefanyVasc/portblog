import { useTranslation } from 'react-i18next'

import { casualReadings, technicalReadings } from '@/static'

import { Card } from './Card'
import { ReadingList } from './ReadingList'

export function ReadingSection() {
  const { t } = useTranslation()

  return (
    <section className="py-5">
      <h4 className="mb-3 text-lg font-medium md:text-xl">
        {t('home.reading.title')}
      </h4>
      <Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
