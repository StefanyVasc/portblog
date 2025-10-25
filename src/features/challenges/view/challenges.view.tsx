import { useEffect } from 'react'
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
import { SITE_META } from '@/shared/config/site'
import { texts } from '@/shared/content/texts'
import { updateSeo } from '@/shared/utils/update-seo'

export function ChallengesView() {
  const challengeTexts = texts.challenges

  useEffect(() => {
    updateSeo({
      title: SITE_META.challenges.title,
      description: SITE_META.challenges.description,
      canonicalPath: '/challenges',
      type: 'website'
    })
  }, [])

  return (
    <div>
      <Header headerName={challengeTexts.header} />
      <section className="py-5 font-300">{challengeTexts.intro}</section>

      <section>
        <Card className={cn('mt-5 w-[380px]')}>
          <CardHeader>
            <CardTitle>{challengeTexts.frontendMentor.title}</CardTitle>
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
                {challengeTexts.frontendMentor.link}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
