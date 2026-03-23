import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFoundView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="font-rubik text-[96px] font-bold leading-none text-rose-500">
          404
        </span>
        <h1 className="text-2xl font-semibold text-gray-800">
          Página não encontrada
        </h1>
        <p className="max-w-sm text-sm text-gray-500">
          A página que você está procurando não existe ou foi movida. Mas não se
          preocupe, tem muito mais por aqui.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-md bg-rose-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600"
        >
          Voltar para o início
        </Link>
      </motion.div>
    </div>
  )
}
