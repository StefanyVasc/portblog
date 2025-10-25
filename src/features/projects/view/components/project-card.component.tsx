import { ExternalLink, Github, Star } from 'lucide-react'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components'
import { projectsLastUpdated, texts } from '@/shared/content/texts'

type ProjectCardProps = {
  name: string
  description: string
  tags: string[]
  repository?: string
  homepage?: string | null
  stars?: number
  updatedAt?: string
}

function formatDate(dateIso?: string) {
  if (!dateIso) return null

  try {
    const date = new Date(dateIso)
    if (Number.isNaN(date.getTime())) return null

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date)
  } catch {
    return null
  }
}

export function ProjectCard({
  description,
  homepage,
  name,
  repository,
  stars,
  tags,
  updatedAt
}: ProjectCardProps) {
  const formattedDate = formatDate(updatedAt)
  const projectTexts = texts.projects

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {description || projectTexts.card.noDescription}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <li key={`${name}-${tag}`}>
                <Badge
                  text={tag}
                  color="gray"
                  variant="outlineSoft"
                  size="xs"
                />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {typeof stars === 'number' && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-4" aria-hidden />
              {stars}
            </span>
          )}
          {formattedDate && <span>{projectsLastUpdated(formattedDate)}</span>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        {repository && (
          <Button asChild variant="outline">
            <a href={repository} target="_blank" rel="noreferrer">
              <Github className="size-4" aria-hidden />
              {projectTexts.card.repository}
            </a>
          </Button>
        )}

        {homepage && (
          <Button asChild variant="default">
            <a href={homepage} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" aria-hidden />
              {projectTexts.card.visit}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
