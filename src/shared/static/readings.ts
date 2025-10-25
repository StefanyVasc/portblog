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
    title: 'Fundamentals of Software Architecture',
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
