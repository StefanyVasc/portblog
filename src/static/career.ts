import { type TFunction } from 'i18next'

import { CustomTimelineProps } from '@/components/CustomTimeline/types'

export const getCareerItems = (t: TFunction): CustomTimelineProps['items'] => [
  {
    yearStart: '2024',
    yearEnd: 'Present',
    title: t('about.career.timelineItems.fcxLabs.title'),
    company: 'FCx Labs',
    description: t('about.career.timelineItems.fcxLabs.description'),
    current: true,
    about: t('about.career.timelineItems.fcxLabs.about'),
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
        patterns: ['clean architecture', 'MVVM', 'DRY', 'KISS', 'SOLID']
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
    title: t('about.career.timelineItems.strada.title'),
    company: 'STRADA',
    description: t('about.career.timelineItems.strada.description'),
    current: false,
    duration: t('about.career.timelineItems.strada.duration'),
    about: t('about.career.timelineItems.strada.about'),
    competencies: {
      frontend: {
        libs: [
          'axios',
          'react-hook-form',
          'zod',
          'context-api',
          'react-query',
          'react-router-dom',
          'redux',
          'zod'
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
    title: t('about.career.timelineItems.cesarUi.title'),
    company: 'CESAR',
    description: t('about.career.timelineItems.cesarUi.description'),
    current: false,
    duration: t('about.career.timelineItems.cesarUi.duration'),
    about: t('about.career.timelineItems.cesarUi.about'),
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
    title: t('about.career.timelineItems.cesarConsultant.title'),
    company: 'CESAR School',
    description: t('about.career.timelineItems.cesarConsultant.description'),
    current: false,
    duration: t('about.career.timelineItems.cesarConsultant.duration'),
    about: t('about.career.timelineItems.cesarConsultant.about'),
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
    title: t('about.career.timelineItems.cesarTrainee.title'),
    company: 'CESAR School',
    description: t('about.career.timelineItems.cesarTrainee.description'),
    current: false,
    duration: t('about.career.timelineItems.cesarTrainee.duration'),
    about: t('about.career.timelineItems.cesarTrainee.about'),
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
    title: t('about.career.timelineItems.pernambuCoders.title'),
    company: 'UFRPE & CESAR',
    description: t('about.career.timelineItems.pernambuCoders.description'),
    current: false,
    duration: t('about.career.timelineItems.pernambuCoders.duration'),
    about: t('about.career.timelineItems.pernambuCoders.about')
  }
]
