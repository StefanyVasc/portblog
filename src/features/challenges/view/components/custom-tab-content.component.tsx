import { useParams } from 'react-router-dom'

import { IntermediateTabView } from '../paths/frontend-mentor/intermediate-tab.view'
import { JuniorTabView } from '../paths/frontend-mentor/junior-tab.view'
import { NewbieTabView } from '../paths/frontend-mentor/newbie-tab.view'
import { SeniorTabView } from '../paths/frontend-mentor/senior-tab.view'

export function CustomTabContent() {
  const { tabValue } = useParams() // Obtém o valor da aba da URL

  switch (tabValue) {
    case 'newbie':
      return <NewbieTabView />
    case 'junior':
      return <JuniorTabView />
    case 'intermediate':
      return <IntermediateTabView />
    case 'senior':
      return <SeniorTabView />
    default:
      return <NewbieTabView /> // Valor padrão
  }
}
