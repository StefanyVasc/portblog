export const texts = {
  common: {
    loading: 'Carregando...',
    readMore: 'ver mais →',
    present: 'Atual'
  },
  header: {
    nav: {
      home: 'Início',
      about: 'Sobre'
    },
    explore: 'Explorar',
    menu: {
      blog: {
        title: 'Blog',
        description: 'Meu blog'
      },
      projects: {
        title: 'Projetos',
        description: 'Meus projetos'
      },
      challenges: {
        title: 'Desafios',
        description: 'Todos os desafios'
      }
    }
  },
  footer: {
    rights: 'Todos os direitos reservados.'
  },
  home: {
    latestArticles: 'Últimos artigos',
    viewAllPosts: 'Ver todos os posts',
    noArticles: 'Nenhum artigo encontrado.',
    doing: {
      title: 'O que estou fazendo agora:',
      workingWith: '...Trabalhando com:',
      learningAbout: '...Estudando sobre:'
    },
    reading: {
      title: 'Leituras',
      technical: 'Leituras técnicas',
      casual: 'Leituras casuais',
      tags: {
        recommendation: 'recomendação',
        reading: 'lendo agora',
        'last read': 'última leitura'
      }
    },
    projects: {
      title: 'Projetos em destaque',
      viewAll: 'Ver todos os projetos',
      loading: 'Carregando projetos em destaque...',
      empty: 'Nenhum projeto em destaque no momento.',
      error: 'Não foi possível carregar os projetos agora.'
    }
  },
  blog: {
    header: 'Blog',
    latestPosts: 'Últimos posts',
    noPosts: 'Nenhum post encontrado.',
    search: {
      placeholder: 'Buscar posts...',
      selectTag: 'Selecione uma tag',
      filter: {
        text: 'Texto',
        tag: 'Tag'
      }
    },
    tagsHeading: 'Tags',
    comments: {
      loading: 'Carregando comentários...',
      setupMissing:
        'Comentários indisponíveis por enquanto. Defina VITE_UTTERANCES_REPO no ambiente.'
    }
  },
  postContent: {
    notFound: 'Post não encontrado.'
  },
  underConstruction: {
    title: 'Em construção',
    description: 'Esta seção ainda está sendo desenvolvida.'
  },
  challenges: {
    header: 'Desafios',
    intro:
      'Aqui você encontrará as séries de desafios que estou fazendo e também os que já estão prontos. A ideia é que você possa acompanhar o meu progresso e também se desafiar a realizar os mesmos projetos.',
    frontendMentor: {
      title: 'Frontend Mentor',
      link: 'Acessar os desafios'
    },
    boraCodar: {
      title: 'Bora Codar'
    }
  },
  projects: {
    header: 'Projetos',
    filters: {
      search: 'Buscar projetos',
      searchPlaceholder: 'Busque por nome, descrição ou tag',
      tag: 'Filtrar por tag',
      tagAll: 'Todas as tags'
    },
    states: {
      loading: 'Carregando projetos...',
      error:
        'Não foi possível carregar os projetos do GitHub agora. Tente novamente mais tarde.',
      empty: 'Nenhum projeto encontrado com esses filtros.'
    },
    card: {
      repository: 'Repositório',
      visit: 'Ver online',
      noDescription: 'Sem descrição disponível.'
    },
    pagination: {
      total: 'Projetos'
    }
  },
  socials: {
    header: 'Redes sociais'
  },
  about: {
    header: 'Sobre...',
    me: {
      title: '...mim',
      introPart1: 'Oi, eu sou o Goku!... Só que não 😅...',
      introPart2: '...Olá, meu nome é',
      introPart3: 'e atuo como Staff Software Engineer.',
      description:
        'Comecei no frontend por acidente e fiquei por escolha. O contato com tecnologia veio cedo — na graduação, ensinando programação para estudantes do ensino médio. Em mais de oito anos de carreira evoluí de UI Developer a Staff Software Engineer, passei por projetos internacionais, liderei times e construí sistemas de grande escala. O que mais me move agora é entender o porquê das decisões: arquitetura, system design e como a engenharia conecta negócio e produto.'
    },
    education: {
      title: '...Formação',
      timelineTitle: 'A base que me trouxe até aqui...'
    },
    career: {
      title: '...Carreira',
      timelineTitle: 'A jornada profissional até aqui...'
    }
  }
}

export function copyrightText(year: number) {
  return `© ${year} Stefany Sá.`
}

export function blogSearchResults(count: number, query: string) {
  const base = `Há ${count} post${count === 1 ? '' : 's'} sobre "${query}"`
  return base
}

export function projectsLastUpdated(date: string) {
  return `Atualizado em ${date}`
}
