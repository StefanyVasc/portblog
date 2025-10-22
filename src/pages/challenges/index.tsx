import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Header,
  UnderConstruction
} from '@/components'
import { cn } from '@/lib/utils'

export function ChallengesPage() {
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('challenges.header')} />
      <section className="py-5 font-300">{t('challenges.intro')}</section>

      <section>
        <Card className={cn('mt-5 w-[380px]')}>
          <CardHeader>
            <CardTitle>{t('challenges.frontendMentor.title')}</CardTitle>
            <CardDescription> </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p>to do: </p>
            <p>doing: </p>
            <p>done: </p>
            <p>drop it: </p> */}
            <UnderConstruction />
          </CardContent>
          <CardFooter>
            <Button variant={'link'} asChild>
              <Link to="frontend-mentor">
                {t('challenges.frontendMentor.link')}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
