const pt = {
  common: {
    language: {
      en: 'EN',
      pt: 'PT'
    },
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
    rights: 'Todos os direitos reservados.',
    copyright: '© {{year}} Stefany Sá.'
  },
  home: {
    // header: 'Início',
    latestArticles: 'Últimos artigos',
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
        reading: 'lendo agora'
      }
    }
  },
  blog: {
    header: 'Blog',
    latestPosts: 'Últimos posts',
    noPosts: 'Nenhum post encontrado.',
    searchResults_one: 'Há {{count}} post sobre "{{query}}"',
    searchResults_other: 'Há {{count}} posts sobre "{{query}}"',
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
    header: 'Projetos'
  },
  socials: {
    header: 'Redes sociais'
  },
  about: {
    header: 'Sobre...',
    me: {
      title: '...Eu',
      introPart1: 'Oi, eu sou o Goku!... Só que não 😅...',
      introPart2: '...Olá, meu nome é',
      introPart3: 'e sou Desenvolvedora Front End.'
    },
    career: {
      title: '...Carreira',
      description:
        'Como entusiasta de interfaces e Desenvolvedora Front End dedicada, tenho uma paixão inabalável por JavaScript. Com mais de seis anos de experiência, possuo um conhecimento profundo de tecnologias essenciais, incluindo HTML, CSS, JavaScript, TypeScript, ReactJS, Tailwind CSS e D3.js para criação de gráficos interativos, além de Angular, Git e Github. Ao longo da minha trajetória profissional, mantenho um compromisso constante com o aprendizado contínuo, explorando regularmente novas tecnologias e conduzindo Provas de Conceito (POCs).',
      timelineTitle: 'A jornada até aqui...',
      timelineItems: {
        fcxLabs: {
          title: 'Analista de Sistemas',
          description:
            'Contribuí para o desenvolvimento do site de e-commerce e da plataforma de parceiros.',
          about:
            'Como Desenvolvedora Front-End Sênior, lidero múltiplos projetos, orientando o time sobre boas práticas, integrações e decisões de arquitetura para manter as soluções escaláveis e sustentáveis.'
        },
        strada: {
          title: 'Engenheira Frontend',
          description:
            'Contribuí para o desenvolvimento de tecnologias focadas em monitoramento e geolocalização.',
          duration: '7 meses',
          about:
            'Ajudei a construir soluções de monitoramento e geolocalização que aprimoraram a logística e os serviços financeiros da empresa e colaborei na criação do design system da STRADA.'
        },
        cesarUi: {
          title: 'Desenvolvedora UI',
          description:
            'Atuei em projetos internacionais como Desenvolvedora UI terceirizada para uma Big Tech.',
          duration: '2 anos e 10 meses',
          about:
            'Construí aplicações para a empresa e seus parceiros, com foco em dashboards interativos usando D3.js para visualização de dados.'
        },
        cesarConsultant: {
          title: 'Consultora de Qualificação',
          description:
            'Trabalhei em projetos internos, desenvolvendo aplicações para a empresa e seus colaboradores.',
          duration: '1 ano e 2 meses',
          about:
            'Entreguei aplicações web e apoiei a manutenção de sistemas legados, desenhando uma aplicação completa com React.js e boas práticas do mercado.'
        },
        cesarTrainee: {
          title: 'Estagiária',
          description:
            'Participava de projetos internos, criando aplicações para a empresa e seus colaboradores.',
          duration: '2 anos',
          about:
            'Participei de iniciativas de pesquisa com Inventor, Scratch, Kodular, JavaScript, HTML5 e CSS3, planejando e ministrando aulas para proporcionar experiências de aprendizado envolventes.'
        },
        pernambuCoders: {
          title: 'PernambuCoders',
          description:
            'Ministrei aulas de Introdução à Programação para estudantes do ensino médio.',
          duration: '1 ano',
          about:
            'Atuei no projeto PernambuCoders, utilizando Scratch, AppInventor, atividades unplugged e aprendizagem baseada em projetos em parceria com a UFRPE, o C.E.S.A.R. e a Softex.'
        }
      }
    }
  }
}

export default pt
