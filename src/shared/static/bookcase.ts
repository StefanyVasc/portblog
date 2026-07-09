export type BookcaseBookStatus = 'reading' | 'read' | 'want to read'

export type BookcaseBook = {
  title: string
  author: string
  status: BookcaseBookStatus
  category: 'ficcao' | 'nao-ficcao' | 'tecnico'
  publishedAt?: string
  month?: string | string[]
  readAt?: string
  favorite?: boolean
  note: string
  quotes: string[]
  tags: string[]
}

export const BookcaseBooks: BookcaseBook[] = [
  {
    title: "The Staff Engineer's Path",
    author: 'Tanya Reilly',
    status: 'reading',
    category: 'tecnico',
    month: ['2026-04', '2026-05', '2026-06', '2026-07'],
    favorite: true,
    note: 'Leitura em andamento para pensar crescimento tecnico, influencia, estrategia e lideranca sem virar gestao.',
    quotes: [],
    tags: ['staff engineer', 'lideranca tecnica', 'carreira']
  },
  {
    title: 'O ultimo adeus',
    author: 'Cynthia Hand',
    status: 'read',
    category: 'ficcao',
    month: '2026-05',
    note: 'Leitura individual de maio em andamento. Uma historia sobre perda, culpa, luto e o que fica depois de uma despedida.',
    quotes: [
      'O tempo passa. Essa é a regra. Não importa o que aconteça, não importa o quanto possa parecer que tudo em sua vida foi congelado em um momento particular, o tempo passa.',
      'O perdão é complicado, Alexis, porque no final é mais sobre você do que sobre a pessoa que está sendo perdoada',
      'Tudo muda. Essa é a única coisa constante.'
    ],
    tags: ['luto', 'young adult', 'saude mental']
  },
  {
    title: 'Uma Vida Pequena',
    author: 'Hanya Yanagihara',
    status: 'reading',
    category: 'ficcao',
    month: ['2026-06', '2026-07'],
    note: 'Leitura nao tecnica de junho e julho. Uma narrativa longa e intensa sobre amizade, trauma, cuidado e sobrevivencia.',
    quotes: [],
    tags: ['literatura contemporanea', 'amizade', 'trauma']
  },
  {
    title: 'Primeiro eu tive que morrer',
    author: 'Lorena Portela',
    status: 'read',
    category: 'ficcao',
    month: '2026-04',
    favorite: true,
    note: 'Primeira leitura individual de abril. Uma historia sobre corpo, adoecimento, desejo e recomeço.',
    quotes: [
      'Eu sou inteira para o que eu posso ser. Eu mereço toda a felicidade que a vida me trouxer e que eu construir. E eu estou no meu caminho para tudo isso.'
    ],
    tags: ['literatura brasileira', 'corpo', 'recomeço']
  },
  {
    title: 'O rio que me corta por dentro',
    author: 'Raul Damasceno',
    status: 'read',
    category: 'ficcao',
    month: '2026-04',
    note: 'Segunda leitura individual de abril. Um livro atravessado por saudade, territorio e afeto.',
    quotes: [
      '⁠Um era a correnteza do outro neste rio profundo onde o pé nunca alcançava o chão..'
    ],
    tags: ['literatura brasileira', 'sertão', 'afeto']
  },
  {
    title: '10 minutos e 38 segundos neste mundo estranho',
    author: 'Elif Shafak',
    status: 'read',
    category: 'ficcao',
    month: '2026-04',
    note: 'Terceira leitura individual de abril. Uma narrativa sobre memoria, violencia, amizade e os rastros de uma vida.',
    quotes: [
      'Só porque você acha que aqui é seguro, não significa que é o lugar certo para você, retrucou seu coração. As vezes o lugar onde você se sente mais segura é aquele ao qual você menos pertence.'
    ],
    tags: ['memoria', 'amizade', 'literatura contemporanea']
  }
]
