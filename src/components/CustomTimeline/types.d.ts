export type CompetenciesType = {
  frontend?: {
    libs?: Array<
      | 'react'
      | 'redux'
      | 'react-query'
      | 'react-router-dom'
      | 'axios'
      | 'swr'
      | 'formik'
      | 'yup'
      | 'react-hook-form'
      | 'zod'
      | 'zustand'
      | 'context-api'
    >
    frameworks?: Array<'angular' | 'nextjs' | 'single-spa' | 'emberjs'>
  }

  styling?: {
    libraries?: Array<
      | 'tailwindcss'
      | 'sass'
      | 'styled-components'
      | 'chakra-ui'
      | 'bootstrap'
      | 'shadcnui'
      | 'radix'
    >
  }

  tools?: {
    visualization?: Array<'D3.js' | 'openStreetMap' | 'figma' | 'leaflet'>
  }

  backend?: {
    technologies?: Array<'nodejs' | 'graphql' | 'rest'>
  }

  testing?: {
    tools?: Array<'jest' | 'testing-library' | 'cypress'>
  }

  architecture?: {
    patterns?: Array<'microfrontends' | 'monorepo'>
  }

  designPatterns?: {
    patterns?: Array<'clean architecture' | 'MVVM' | 'DRY' | 'KISS' | 'SOLID'>
  }

  designSystem?: {
    libraries?: Array<'storybook'>
  }

  cloud?: {
    providers?: Array<'vercel' | 'netlify' | 'aws' | 'azure' | 'gcp'>
  }

  databases?: {
    technologies?: Array<'mongodb' | 'mysql' | 'postgresql' | 'sqlite'>
  }

  deploy?: {
    ci?: {
      tools?: Array<
        'github-actions' | 'circle-ci' | 'travis-ci' | 'jenkins' | 'gitlab-ci'
      >
    }

    cd?: {
      tools?: Array<'spinnaker' | 'argo-cd' | 'flux' | 'gitops'>
    }
  }

  monitoring?: {
    tools?: Array<'sentry' | 'datadog' | 'newrelic' | 'prometheus' | 'grafana'>
  }

  observability?: {
    tools?: Array<
      'opentelemetry' | 'jaeger' | 'zipkin' | 'prometheus' | 'grafana'
    >
  }

  containers?: {
    tools?: Array<'docker'>
  }

  orchestration?: {
    tools?: Array<'rancher' | 'kubernetes'>
  }
}

export type CustomTimelineProps = {
  items: Array<{
    yearStart: string
    current: boolean
    title: string
    company: string
    description: string
    yearEnd?: string
    duration?: string
    competencies?: CompetenciesType
    about?: string
  }>
}
