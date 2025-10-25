import { CustomTimelineProps } from '../components/custom-timeline/types'

export const careerItems: CustomTimelineProps['items'] = [
  {
    yearStart: '2025',
    yearEnd: 'Presente',
    title: 'Tech Lead Frontend',
    company: 'FCx Labs',
    description:
      'Lidero as decisões técnicas do projeto Catálogo, organizando o capacity do time, promovendo integrações entre módulos e conduzindo a evolução arquitetural da aplicação.',
    current: true,
    about:
      'Como Tech Lead Frontend, lidero o time técnico e defino padrões de arquitetura para garantir escalabilidade e qualidade. Conduzi a integração entre os módulos de Catálogo e Seller via proxy reverso e implementei uma nova arquitetura baseada em Feature Sliced e Clean Architecture adaptada ao projeto. Atuo de forma prática no desenvolvimento, mentorando o time e conduzindo decisões técnicas para fortalecer a robustez da aplicação.',
    competencies: {
      frontend: {
        libs: ['react', 'zustand', 'swr', 'formik', 'yup', 'axios'],
        frameworks: ['single-spa', 'vite']
      },
      architecture: {
        patterns: [
          'microfrontends',
          'feature sliced architecture',
          'clean architecture (adaptada)',
          'MVVM',
          'onion architecture',
          'SOLID',
          'defensive programming'
        ]
      },
      integrations: {
        projects: ['Integração entre Catálogo e Seller via proxy reverso']
      },
      leadership: {
        responsibilities: [
          'code review',
          'capacity planning',
          'task allocation',
          'technical mentorship',
          'architecture evolution',
          'release coordination (GMUD)',
          'cross-module integration strategy'
        ]
      },
      designSystem: {
        tools: ['storybook'],
        practices: ['tokens', 'variants', 'component libraries']
      },
      testing: {
        tools: ['jest', 'testing-library', 'cypress']
      },
      deploy: {
        ci: {
          tools: ['jenkins']
        },
        cd: {
          tools: ['rancher']
        },
        governance: ['GMUD']
      },
      cloud: {
        providers: ['aws']
      },
      communication: {
        tools: ['notion', 'jira', 'slack']
      }
    }
  },

  {
    yearStart: '2024',
    yearEnd: '2025',
    title: 'Systems Analyst',
    company: 'FCx Labs',
    description:
      'Contribuí para o desenvolvimento do  e-commerce e da plataforma de catálogo.',
    current: false,
    duration: '4 meses',
    about:
      'Como Desenvolvedora Front-End Sênior, liderei múltiplos projetos, orientando o time sobre boas práticas, integrações e decisões de arquitetura para manter as soluções escaláveis e sustentáveis.',
    competencies: {
      frontend: {
        libs: ['react', 'redux', 'swr', 'axios', 'formik', 'yup', 'zustand'],
        frameworks: ['nextjs', 'single-spa']
      },
      styling: {
        libraries: ['styled-components']
      },
      tools: {
        visualization: ['figma']
      },
      testing: {
        tools: ['jest', 'testing-library', 'cypress']
      },
      architecture: {
        patterns: ['microfrontends', 'monorepo']
      },
      designPatterns: {
        patterns: [
          'clean architecture',
          'MVVM',
          'DRY',
          'KISS',
          'SOLID',
          'feature sliced'
        ]
      },
      designSystem: {
        libraries: ['storybook']
      },
      backend: {
        technologies: ['rest']
      },
      cloud: {
        providers: ['aws']
      },
      deploy: {
        ci: {
          tools: ['jenkins']
        },
        cd: {
          tools: ['gitops']
        }
      },
      orchestration: {
        tools: ['rancher']
      }
    }
  },
  {
    yearStart: '2024',
    yearEnd: '2024',
    title: 'Frontend Engineer',
    company: 'STRADA',
    description:
      'Contribuí para o desenvolvimento de tecnologias focadas em monitoramento e geolocalização.',
    current: false,
    duration: '7 meses',
    about:
      'Ajudei a construir soluções de monitoramento e geolocalização que aprimoraram a logística e os serviços financeiros da empresa e colaborei na criação do design system da STRADA.',
    competencies: {
      frontend: {
        libs: [
          'axios',
          'react-hook-form',
          'zod',
          'context-api',
          'react-query',
          'react-router-dom',
          'redux'
        ]
      },
      styling: {
        libraries: ['styled-components']
      },
      tools: {
        visualization: ['leaflet', 'openStreetMap']
      },
      testing: {
        tools: ['jest', 'testing-library']
      },
      monitoring: {
        tools: ['newrelic']
      },
      designPatterns: {
        patterns: ['clean architecture', 'SOLID']
      },
      cloud: {
        providers: ['gcp']
      },
      deploy: {
        ci: {
          tools: ['github-actions']
        },
        cd: {
          tools: ['argo-cd']
        }
      },
      orchestration: {
        tools: ['kubernetes']
      }
    }
  },
  {
    yearStart: '2021',
    yearEnd: '2023',
    title: 'UI Developer',
    company: 'CESAR',
    description:
      'Atuei em projetos internacionais como UI Developer terceirizada para uma Big Tech.',
    current: false,
    duration: '2 anos e 10 meses',
    about:
      'Construí aplicações para a empresa e seus parceiros, com foco em dashboards interativos usando D3.js para visualização de dados.',
    competencies: {
      frontend: {
        libs: ['react', 'redux', 'react-router-dom'],
        frameworks: ['angular', 'emberjs']
      },
      styling: {
        libraries: ['styled-components', 'tailwindcss', 'bootstrap', 'sass']
      },
      tools: {
        visualization: ['figma', 'D3.js']
      },
      backend: {
        technologies: ['rest']
      },
      cloud: {
        providers: ['aws']
      },
      deploy: {
        ci: {
          tools: ['jenkins']
        },
        cd: {
          tools: ['gitops']
        }
      },
      orchestration: {
        tools: ['kubernetes']
      },
      monitoring: {
        tools: ['newrelic']
      },
      containers: {
        tools: ['docker']
      },
      observability: {
        tools: ['grafana']
      }
    }
  },
  {
    yearStart: '2020',
    yearEnd: '2021',
    title: 'Consultora de Qualificação',
    company: 'CESAR School',
    description:
      'Trabalhei em projetos internos, desenvolvendo aplicações para a empresa e seus colaboradores.',
    current: false,
    duration: '1 ano e 2 meses',
    about:
      'Entreguei aplicações web e apoiei a manutenção de sistemas legados, desenhando uma aplicação completa com React.js e boas práticas do mercado.',
    competencies: {
      frontend: {
        libs: ['react', 'redux', 'react-router-dom']
      },
      styling: {
        libraries: ['sass']
      },
      tools: {
        visualization: ['figma']
      }
    }
  },
  {
    yearStart: '2018',
    yearEnd: '2020',
    title: 'Estagiária',
    company: 'CESAR School',
    description:
      'Participava de projetos internos, criando aplicações para a empresa e seus colaboradores.',
    current: false,
    duration: '2 anos',
    about:
      'Participei de iniciativas de pesquisa com Inventor, Scratch, Kodular, JavaScript, HTML5 e CSS3, planejando e ministrando aulas para proporcionar experiências de aprendizado envolventes.',
    competencies: {
      frontend: {
        libs: ['react', 'redux', 'react-router-dom', 'context-api']
      },
      styling: {
        libraries: ['sass']
      }
    }
  },
  {
    yearStart: '2017',
    yearEnd: '2018',
    title: 'PernambuCoders',
    company: 'UFRPE & CESAR',
    description:
      'Ministrei aulas de Introdução à Programação para estudantes do ensino médio.',
    current: false,
    duration: '1 ano',
    about:
      'Atuei no projeto PernambuCoders, utilizando Scratch, AppInventor, atividades unplugged e aprendizagem baseada em projetos em parceria com a UFRPE, o C.E.S.A.R. e a Softex.'
  }
]
