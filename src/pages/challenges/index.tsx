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
  return (
    <div>
      <Header headerName="Challenges" />
      <section className="py-5 font-300">
        Aqui você encontrará as séries de desafios que eu estou fazendo e também
        os que estão prontos. A ideia é que você possa acompanhar o meu
        progresso e também se desafiar a fazer os mesmos desafios.
      </section>

      <section>
        <Card className={cn('w-[380px] mt-5')}>
          <CardHeader>
            <CardTitle>Frontend Mentor</CardTitle>
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
              <Link to="frontend-mentor">Acessar os desafios</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
