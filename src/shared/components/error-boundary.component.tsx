import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <span className="text-5xl">⚠️</span>
          <h1 className="text-xl font-semibold text-gray-800">
            Algo deu errado
          </h1>
          <p className="max-w-sm text-sm text-gray-500">
            Um erro inesperado aconteceu. Tente recarregar a página ou volte
            para o início.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Recarregar
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="rounded-md bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
