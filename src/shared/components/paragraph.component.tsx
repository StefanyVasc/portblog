import { PropsWithChildren } from 'react'

export function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="font-300 leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  )
}
