import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'

export function PageFooter() {
  return (
    <footer className="font-rubik font-normal flex h-20 w-full justify-between shrink-0 items-center px-4 md:px-6">
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
      </ul>
      <div className="mt-4 text-xs text-gray-400">
        &copy; 2025 Stefany Sá.
        <br />
        All rights reserved.
      </div>
    </footer>
  )
}
