export const ErrorMessage = ({
  message,
  onRetry
}: {
  message: string
  onRetry?: () => void
}) => (
  <div className="mt-10 flex flex-col items-center gap-3 text-center">
    <p className="text-red-500">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-sm font-medium text-rose-600 underline hover:text-rose-700"
      >
        Tentar novamente
      </button>
    )}
  </div>
)
