type PaginationProps = {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export function Pagination({
  totalPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {Array.from({ length: totalPage }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
