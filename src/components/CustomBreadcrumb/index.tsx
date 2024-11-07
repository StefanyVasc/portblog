import { Link } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components'

type CustomBreadcrumbProps = {
  pathnames: string[]
}

export function CustomBreadcrumb({ pathnames }: CustomBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`

          const isChallenges = name === 'challenges'

          return (
            <BreadcrumbItem key={routeTo} className="font-rubik font-300">
              {!isChallenges ? (
                <BreadcrumbLink>
                  <Link to={routeTo}>{name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink aria-disabled>{name}</BreadcrumbLink>
              )}

              {index !== pathnames.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
