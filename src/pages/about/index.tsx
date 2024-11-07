import { useMemo } from 'react'

import { CustomTimeline, Header } from '@/components'

export function About() {
  const items = useMemo(() => {
    return [
      {
        date: '2020',
        title: 'Started my journey',
        description:
          'I started my journey to become a developer. I learned a lot of things and it is just the beginning.'
      },
      {
        date: '2021',
        title: 'Worked as a freelance developer',
        description:
          'I worked with some companies as a freelance developer. It was a great experience.'
      },
      {
        date: '2022',
        title: 'Founded my own company',
        description:
          'I founded my own company as a developer. It was a great experience.'
      },
      {
        date: '2021',
        title: 'Worked as a freelance developer',
        description:
          'I worked with some companies as a freelance developer. It was a great experience.'
      },
      {
        date: '2022',
        title: 'Founded my own company',
        description:
          'I founded my own company as a developer. It was a great experience.'
      },
      {
        date: '2021',
        title: 'Worked as a freelance developer',
        description:
          'I worked with some companies as a freelance developer. It was a great experience.'
      },
      {
        date: '2022',
        title: 'Founded my own company',
        description:
          'I founded my own company as a developer. It was a great experience.'
      }
    ]
  }, [])

  return (
    <div>
      <Header headerName="About" />
      <CustomTimeline items={items} />
    </div>
  )
}
