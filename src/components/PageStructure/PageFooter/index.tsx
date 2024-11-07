type PageFooterProps = {
  children?: React.ReactNode
}

export function PageFooter({ children }: PageFooterProps) {
  return (
    <footer className="font-rubik font-normal flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <p>&copy; 2024 Minha Aplicação</p>
      {children}
    </footer>
  )
}
