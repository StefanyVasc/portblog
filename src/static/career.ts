import { CustomTimelineProps } from '@/components/CustomTimeline/types'

export const careerItems: CustomTimelineProps = {
  items: [
    {
      yearStart: '2024',
      yearEnd: 'Present',
      title: 'System Analyst',
      company: 'FCx Labs',
      description:
        'Contributed to the development of e-commerce site and partners platform.',
      current: true,
      about:
        'As ~ Senior Front-End Developer ~ Working in a multiple projects, but in both I was focused in Led front-end team, ensuring best development practices and integration. To accomplished that, I guide the team in a bunch of technologies and design patterns. Also, I was responsible for the architecture of the projects, ensuring that the projects are scalable and maintainable.',
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
      title: 'Frontend Engineer',
      company: 'STRADA',
      description:
        'Contributed to the development of technologies focused on monitoring and geolocation.',
      current: false,
      duration: '7 months',
      about: `Contribute to building technologies focused on monitoring and geolocation, enhancing the company's logistics and financial services. Additionally, they have made significant contributions to the creation of STRADA's design system.`,
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
      title: 'UI Developer',
      company: 'CESAR',
      description:
        'Worked on international projects as a UI Developer outsourced to a BigTech company.',
      current: false,
      duration: '2y 10m',
      about:
        'Worked on international projects as a UI Developer outsourced to a BigTech company. Contributed to the development of a platform for the company and its partners, building applications for the company and its employees. Focusing on the construction of the interactive dashboards using D3.js for data visualization.',
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
      title: 'Qualification Consultant',
      company: 'CESAR School',
      description:
        'Worked on internal projects, building applications for the company and its employees.',
      current: false,
      duration: '1y 2m',
      about:
        'Participated in internal projects where they contributed to the construction of web applications and assisted in the maintenance of legacy web systems. Built and designed a complete application following best practices with React.js as the main technology.',
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
      title: 'Trainee',
      company: 'CESAR School',
      description:
        'Worked on internal projects, building applications for the company and its employees.',
      current: false,
      duration: '2 years',
      about:
        ' Extended involvement to active participation in research initiatives, contributing to research projects using technologies like Inventor, Scratch, Kodular, JavaScript, HTML5, and CSS3. I Took on multifaceted responsibilities, including planning and conducting instructional sessions. Also I Designed and delivered classes, ensuring a dynamic and engaging learning environment for students.',
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
        'Taught Introduction to Programming classes for high school students.',
      current: false,
      duration: '1 year',
      about:
        'Teaching Introduction to Programming classes for high school students in the PernambuCoders project of the Pernambuco and Porto Digital Department of Education, in partnership with UFRPE, C.E.S.A.R. and Softex. Making use of innovative approaches and learning tools such as: Scratch, AppInventor, unplugged activities and project-based education.'
    }
  ]
}
