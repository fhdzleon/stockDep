import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"


interface ModalProps {
  children: ReactNode
  show: boolean
  close: () => void
}

function Modal({ children, close, show }: ModalProps) {
  return (
    <AnimatePresence>
      {
        show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 grid place-content-center bg-black/50 backdrop-blur"
          >
            <div className="relative w-fit h-fit">
              {children}
              <button onClick={close} className="btn btn-ghost btn-circle absolute top-1 right-1 text-red-500">
                <span className="icon-[gg--close] text-2xl" role="img" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Modal
