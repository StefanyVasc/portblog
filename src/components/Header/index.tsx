type HeaderProps = {
  headerName?: string
  children?: React.ReactNode
}

export function Header({ headerName, children }: HeaderProps) {
  return (
    <header>
      <h4 className="scroll-m-20 font-itim text-2xl font-semibold tracking-tight">
        {headerName}
      </h4>

      {children}
    </header>
  )
}
