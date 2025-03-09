import { PropsWithChildren } from 'react'

export function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6 font-300">{children}</p>
  )
}
