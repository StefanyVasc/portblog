export type ReadingTag = 'recommendation' | 'reading' | 'last read'

export type Reading = {
  title: string
  author?: string
  tags: ReadingTag[]
}

export const technicalReadings: Reading[] = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    tags: ['recommendation']
  },
  {
    title:
      'Fundamentos da arquitetura de software: uma abordagem de engenharia',
    author: 'Mark Richards & Neal Ford',
    tags: ['reading']
  },
  {
    title: 'Refactoring UI',
    author: 'Adam Wathan & Steve Schoger',
    tags: ['last read']
  }
]

export const casualReadings: Reading[] = [
  {
    title: 'O mapeador de ausências',
    author: 'Mia Couto',
    tags: ['reading']
  },
  {
    title: '10 minutos e 38 segundos neste mundo estranho',
    author: 'Elif Shafak',
    tags: ['last read']
  },
  {
    title: 'Torto Arado',
    author: 'Itamar Vieira Junior',
    tags: ['last read']
  },
  {
    title: 'The Invisible Life of Eurídice Gusmão',
    author: 'Martha Batalha',
    tags: ['recommendation']
  },
  {
    title: 'Small Anti-Racist Handbook',
    author: 'Djamila Ribeiro',
    tags: ['reading']
  }
]
