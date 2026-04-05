import {
  CameraIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
import { BookMarked, BookOpen, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/shared/components'

const links = [
  {
    label: 'Blog',
    href: '/blog',
    internal: true,
    icon: <BookOpen size={18} />
  },
  {
    label: 'GitHub',
    href: 'https://github.com/StefanyVasc',
    icon: <GitHubLogoIcon className="h-[18px] w-[18px]" />
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/stefanyvasconcelos/',
    icon: <LinkedInLogoIcon className="h-[18px] w-[18px]" />
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/stefanyvasc',
    icon: <Instagram size={18} />
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/stefany_vasc',
    icon: <TwitterLogoIcon className="h-[18px] w-[18px]" />
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@stefany.vasc.sa',
    icon: <BookMarked size={18} />
  },
  {
    label: 'Unsplash',
    href: 'https://unsplash.com/pt-br/@stevasc',
    icon: <CameraIcon className="h-[18px] w-[18px]" />
  },
  {
    label: 'YouTube',
    href: 'https://music.youtube.com/playlist?list=PLCRIo-h4VwJEQVtrBkvuYmUo09XHipn90&si=b9TlaUy2LV93p1oi',
    icon: <Youtube size={18} />
  }
]

const linkClass =
  'flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-rose-500 hover:text-rose-500'

export function LinksView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(0,0%,95%)] px-4 py-10 font-rubik">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="h-52 w-52 overflow-hidden rounded-full border border-gray-200">
            <Avatar width={208} height={208} viewBox="0 36 1196 1196" />
          </div>
          <h1 className="text-lg font-semibold">stefany sá</h1>
          <p className="text-center text-sm font-medium text-gray-700">
            staff software engineer @ iFood · prev Stone
          </p>
          <p className="text-center text-xs text-gray-400">
            i build what i can&apos;t photograph and photograph what i
            can&apos;t build
          </p>
        </div>

        <ul className="grid w-full grid-cols-2 gap-3">
          {links.map(({ label, href, internal, icon }) => (
            <li key={label}>
              {internal ? (
                <Link to={href} className={linkClass}>
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-400">stefany-sa.com.br</p>
      </div>
    </div>
  )
}
