import {
  CameraIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

export function PageFooter() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="flex h-20 w-full shrink-0 items-center justify-between px-4 font-rubik font-normal md:px-6">
      <ul className="flex space-x-6">
        <li>
          <a
            href="https://github.com/StefanyVasc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="text-2xl hover:text-rose-500" />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/stefanyvasconcelos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogoIcon className="text-2xl hover:text-rose-500" />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/stefany_vasc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="text-2xl hover:text-rose-500" />
          </a>
        </li>
        <li>
          <a
            href="https://unsplash.com/pt-br/@stevasc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CameraIcon className="text-2xl hover:text-rose-500" />
          </a>
        </li>
      </ul>
      <div className="mt-4 text-xs text-gray-400">
        {t('footer.copyright', { year })}
        <br />
        {t('footer.rights')}
      </div>
    </footer>
  )
}
