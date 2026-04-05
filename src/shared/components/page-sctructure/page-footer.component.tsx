import {
  CameraIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'

import { copyrightText, texts } from '@/shared/content/texts'

export function PageFooter() {
  const year = new Date().getFullYear()
  const footerTexts = texts.footer

  return (
    <footer className="flex h-20 w-full shrink-0 items-center justify-between px-4 font-rubik font-normal md:px-6">
      <ul className="flex space-x-6">
        <li>
          <a
            href="https://github.com/StefanyVasc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubLogoIcon
              aria-hidden="true"
              className="text-2xl hover:text-rose-500"
            />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/stefanyvasconcelos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon
              aria-hidden="true"
              className="text-2xl hover:text-rose-500"
            />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/stefany_vasc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
          >
            <TwitterLogoIcon
              aria-hidden="true"
              className="text-2xl hover:text-rose-500"
            />
          </a>
        </li>
        <li>
          <a
            href="https://unsplash.com/pt-br/@stevasc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Unsplash"
          >
            <CameraIcon
              aria-hidden="true"
              className="text-2xl hover:text-rose-500"
            />
          </a>
        </li>
      </ul>
      <div className="mt-4 text-xs text-gray-400">
        {copyrightText(year)}
        <br />
        {footerTexts.rights}
      </div>
    </footer>
  )
}
