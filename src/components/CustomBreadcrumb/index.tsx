import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
          const isLast = index === pathnames.length - 1 // Último item

          return (
            <Fragment key={routeTo}>
              <BreadcrumbItem className="font-rubik font-300">
                {isLast ? (
                  <BreadcrumbPage className="text-rose-500">{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={routeTo}
                      className="hover:bg-rose-500 hover:text-white px-2 py-1 rounded-md transition"
                    >
                      {name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
