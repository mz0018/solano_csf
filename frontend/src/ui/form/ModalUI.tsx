type ModalUIProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
}

export const ModalUI = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  footer,
}: ModalUIProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-md border border-[#e5e7eb] bg-gradient-to-l from-blue-50 to-white bg-white p-6">

          {title && (
            <h2 className="min-w-0 text-2xl font-bold text-[#003566] lg:text-3xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="px-1 max-w-2xl text-sm leading-relaxed tracking-wide text-[#000814] sm:text-base md:text-md border-b border-gray-200 pb-2">
              {description}
            </p>
          )}

          {/* Changed p to div */}
          <div className="mt-3 max-w-2xl text-sm leading-relaxed tracking-wide text-[#000814] sm:text-base">
            {children}
          </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-md bg-[#f3f4f6] px-4 py-2 text-sm font-medium border border-gray-300 text-[#6b7280] transition-colors duration-150 hover:bg-[#e5e7eb]"
          >
            Close
          </button>

          {footer}
        </div>

      </div>
    </div>
  )
}
