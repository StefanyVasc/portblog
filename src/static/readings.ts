export type ReadingTag = 'recommendation' | 'reading'

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
    title: 'Fundamentals of Software Architecture',
    author: 'Mark Richards & Neal Ford',
    tags: ['reading']
  },
  {
    title: 'Refactoring UI',
    author: 'Adam Wathan & Steve Schoger',
    tags: ['recommendation']
  }
]

export const casualReadings: Reading[] = [
  {
    title: 'Torto Arado',
    author: 'Itamar Vieira Junior',
    tags: ['recommendation']
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
