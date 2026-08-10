type ModalUIProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  footer?: React.ReactNode
}

export const ModalUI = ({ isOpen, onClose, children, title, footer }: ModalUIProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] border border-[#e5e7eb]">

        {title && (
          <h2 className="text-xl font-semibold text-[#1f2937]">
            {title}
          </h2>
        )}

        <div className="mt-4">
          {children}
        </div>

        <div className="mt-6 flex justify-end gap-3">
            <button
                onClick={onClose}
                className="rounded-md bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#e5e7eb] transition-colors duration-150"
            >
                Close
            </button>
            {footer}
        </div>

      </div>
    </div>
  )
}