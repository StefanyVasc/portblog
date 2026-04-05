import { Link } from 'react-router-dom'

import {
  Logo,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/shared/components'
import { texts } from '@/shared/content/texts'

export function PageHeader() {
  const headerTexts = texts.header
  const menuItems = [
    {
      title: headerTexts.menu.blog.title,
      to: '/blog'
    },
    {
      title: headerTexts.menu.projects.title,
      to: '/projects'
    },
    {
      title: headerTexts.menu.challenges.title,
      to: '/challenges'
    }
  ]

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center bg-background px-4 md:px-6">
      <Link to="/">
        <Logo className="h-6 w-6 transition-all duration-300 hover:fill-rose-500" />
        <span className="sr-only">SVS</span>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex gap-2">
          <Link
            to="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-dashed hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {headerTexts.nav.home}
          </Link>
          <Link
            to="/about"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-dashed hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {headerTexts.nav.about}
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:border-b-2 hover:border-dashed hover:border-rose-500 hover:bg-transparent">
                  {headerTexts.explore}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-[150px] flex-col gap-3 p-2">
                    {menuItems.map(component => (
                      <NavigationMenuLink
                        asChild
                        key={component.title}
                        className="block px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-100"
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
      </div>
    </header>
  )
}
