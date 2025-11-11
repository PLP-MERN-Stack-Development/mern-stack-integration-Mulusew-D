export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      {pages.map(i => (
        <button key={i} onClick={() => onChange(i)} className={`px-3 py-1 rounded border ${page===i ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
          {i}
        </button>
      ))}
    </div>
  );
}
