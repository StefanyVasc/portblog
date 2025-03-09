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
          const isLast = index === pathnames.length - 1 // Último item

          return (
            <BreadcrumbItem key={routeTo} className="font-rubik font-300">
              <BreadcrumbLink>
                <Link
                  to={routeTo}
                  className={`${
                    isLast
                      ? 'text-rose-500 '
                      : 'hover:bg-rose-500 hover:text-white px-2 py-1 rounded-md transition'
                  }`}
                >
                  {name}
                </Link>
              </BreadcrumbLink>

              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
