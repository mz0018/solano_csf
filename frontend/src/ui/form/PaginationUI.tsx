interface PaginationUIProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationUI = ({ currentPage, totalPages, onPageChange }: PaginationUIProps) => (
  <div className="flex items-center justify-between mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 text-sm font-medium text-[#1f2937] bg-white border border-[#e5e7eb] rounded-md hover:bg-[#f3f4f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
    >
      Prev
    </button>
    <small className="text-xs font-semibold text-slate-500 lg:text-sm">Page {currentPage} of {totalPages}</small>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 text-sm font-medium text-[#1f2937] bg-white border border-[#e5e7eb] rounded-md hover:bg-[#f3f4f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
    >
      Next
    </button>
  </div>
);