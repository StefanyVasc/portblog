import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/components'

export function BoraCodar() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)

  return (
    <div>
      <Header headerName="Bora Codar Page">
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main />
    </div>
  )
}
