import { useParams } from 'react-router-dom'

import {
  IntermediateTabContent,
  JuniorTabContent,
  NewbieTabContent,
  SeniorTabContent
} from '../../frontend-mentor/paths'

export function CustomTabContent() {
  const { tabValue } = useParams() // Obtém o valor da aba da URL

  switch (tabValue) {
    case 'newbie':
      return <NewbieTabContent />
    case 'junior':
      return <JuniorTabContent />
    case 'intermediate':
      return <IntermediateTabContent />
    case 'senior':
      return <SeniorTabContent />
    default:
      return <NewbieTabContent /> // Valor padrão
  }
}
