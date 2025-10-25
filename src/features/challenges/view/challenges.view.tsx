import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
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
} from '@/shared/components'
import { useI18n } from '@/shared/hooks/use-i18n'

export function ChallengesView() {
  const { t } = useI18n()

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
