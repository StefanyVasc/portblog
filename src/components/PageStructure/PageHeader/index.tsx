import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  LanguageSwitcher,
  Logo,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components'

export function PageHeader() {
  const { t } = useTranslation()

  const components = useMemo(
    () => [
      {
        title: t('header.menu.blog.title'),
        to: '/blog',
        description: t('header.menu.blog.description')
      },
      {
        title: t('header.menu.projects.title'),
        to: '/projects',
        description: t('header.menu.projects.description')
      },
      {
        title: t('header.menu.challenges.title'),
        to: '/challenges',
        description: t('header.menu.challenges.description')
      }
    ],
    [t]
  )

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link to="/">
        <Logo className="h-6 w-6 transition-all duration-300 hover:fill-rose-500" />
        <span className="sr-only">SVS</span>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex gap-2">
          <Link
            to="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            {t('header.nav.home')}
          </Link>
          <Link
            to="/about"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            {t('header.nav.about')}
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t('header.explore')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-[150px] gap-3 p-2">
                    {components.map(component => (
                      <NavigationMenuLink
                        asChild
                        key={component.title}
                        className="block px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Link to={component.to}>{component.title}</Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
