export const texts = {
  common: {
    loading: 'Carregando...',
    readMore: 'ver mais →',
    present: 'Atual'
  },
  header: {
    nav: {
      home: 'início',
      about: 'sobre'
    },
    explore: 'explorar',
    menu: {
      blog: {
        title: 'blog',
        description: 'meu blog'
      },
      projects: {
        title: 'projetos',
        description: 'meus projetos'
      },
      challenges: {
        title: 'desafios',
        description: 'todos os desafios'
      }
    }
  },
  footer: {
    rights: 'todos os direitos reservados.'
  },
  home: {
    latestArticles: 'últimos artigos',
    viewAllPosts: 'ver todos os posts',
    noArticles: 'nenhum artigo encontrado.',
    doing: {
      title: 'o que estou fazendo agora:',
      workingWith: '...trabalhando com:',
      learningAbout: '...estudando sobre:'
    },
    reading: {
      title: 'leituras',
      technical: 'leituras técnicas',
      casual: 'leituras casuais',
      tags: {
        recommendation: 'recomendação',
        reading: 'lendo agora',
        'last read': 'última leitura'
      }
    },
    projects: {
      title: 'projetos em destaque',
      viewAll: 'ver todos os projetos',
      loading: 'carregando projetos em destaque...',
      empty: 'nenhum projeto em destaque no momento.',
      error: 'não foi possível carregar os projetos agora.'
    }
  },
  blog: {
    header: 'blog',
    latestPosts: 'últimos posts',
    noPosts: 'nenhum post encontrado.',
    search: {
      placeholder: 'buscar posts...',
      selectTag: 'selecione uma tag',
      filter: {
        text: 'texto',
        tag: 'tag'
      }
    },
    tagsHeading: 'tags',
    comments: {
      loading: 'carregando comentários...',
      setupMissing:
        'comentários indisponíveis por enquanto. Defina VITE_UTTERANCES_REPO no ambiente.'
    }
  },
  postContent: {
    notFound: 'post não encontrado.'
  },
  underConstruction: {
    title: 'em construção',
    description: 'esta seção ainda está sendo desenvolvida.'
  },
  challenges: {
    header: 'desafios',
    intro:
      'aqui você encontrará as séries de desafios que estou fazendo e também os que já estão prontos. A ideia é que você possa acompanhar o meu progresso e também se desafiar a realizar os mesmos projetos.',
    frontendMentor: {
      title: 'frontend Mentor',
      link: 'acessar os desafios'
    },
    boraCodar: {
      title: 'bora Codar'
    }
  },
  projects: {
    header: 'projetos',
    filters: {
      search: 'buscar projetos',
      searchPlaceholder: 'busque por nome, descrição ou tag',
      tag: 'filtrar por tag',
      tagAll: 'todas as tags'
    },
    states: {
      loading: 'carregando projetos...',
      error:
        'não foi possível carregar os projetos do GitHub agora. Tente novamente mais tarde.',
      empty: 'nenhum projeto encontrado com esses filtros.'
    },
    card: {
      repository: 'repositório',
      visit: 'ver online',
      noDescription: 'sem descrição disponível.'
    },
    pagination: {
      total: 'projetos'
    }
  },
  socials: {
    header: 'redes sociais'
  },
  about: {
    header: 'sobre...',
    me: {
      title: '...mim',
      introPart1: 'oiie, eu sou o Goku!... Só que não 😅...',
      introPart2: '...olá, meu nome é',
      introPart3: 'e atuo como Staff Software Engineer.',
      description:
        'o plano inicial era engenharia mecânica. A vida me jogou pra tecnologia e eu aceitei. Meu primeiro contato profissional foi ensinando programação para estudantes do ensino médio, paixão que ainda carrego. Comecei no frontend por acidente e fiquei por escolha. Atualmente, beirando os 10 anos de carreira dentro de TI já pude vivenciar muitas coisas: passei de UI Developer a Staff Software Engineer, trabalhei em projetos internacionais, liderei times e construí sistemas de grande escala. Mas o que ainda me faz levantar cedo é a parte difícil: as decisões de arquitetura, o system design e a intersecção entre engenharia, produto e negócio.'
    },
    education: {
      title: '...formação',
      timelineTitle: 'a base que me trouxe até aqui...'
    },
    career: {
      title: '...carreira',
      timelineTitle: 'a jornada profissional até aqui...'
    }
  }
}

export function copyrightText(year: number) {
  return `© ${year} stefany sá.`
}

export function blogSearchResults(count: number, query: string) {
  const base = `Há ${count} post${count === 1 ? '' : 's'} sobre "${query}"`
  return base
}

export function projectsLastUpdated(date: string) {
  return `Atualizado em ${date}`
}
