export type EducationItem = {
  yearStart: string
  yearEnd: string
  title: string
  company: string
  description: string
  current: boolean
  duration?: string
  enade?: string
  tccUrl?: string
}

export const educationItems: EducationItem[] = [
  {
    yearStart: '2026',
    yearEnd: 'Presente',
    title: 'MBA em Arquitetura Full Cycle',
    company: 'Full Cycle',
    description:
      'Pós-graduação focada em arquitetura de software, system design e engenharia de sistemas distribuídos.',
    current: true
  },
  {
    yearStart: '2014',
    yearEnd: '2020',
    title: 'Bacharelado em Sistemas de Informação',
    company: 'UFRPE',
    description:
      'Graduação na Universidade Federal Rural de Pernambuco, com foco em desenvolvimento de software, estruturas de dados, engenharia de software e sistemas de informação.',
    current: false,
    duration: '6 anos',
    enade: '4/5 (2017 e 2019)',
    tccUrl: 'https://arandu.ufrpe.br/items/0997e051-e20c-4157-989b-f9314fcdf84a'
  },
  {
    yearStart: '2012',
    yearEnd: '2014',
    title: 'Técnico em Eletromecânica',
    company: 'SENAI',
    description:
      'Formação técnica com base em automação, sistemas elétricos e mecânicos — onde desenvolvi raciocínio lógico e disciplina técnica que carrego até hoje.',
    current: false,
    duration: '2 anos'
  }
]
