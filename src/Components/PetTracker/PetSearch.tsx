// PetSearch.tsx
type Props = {
  onSearch: () => void;
  onClear: () => void;
};

export default function PetSearch({ onSearch, onClear }: Props) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md w-full max-w-md">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:bg-gray-900 dark:text-white">
        Número de guía
      </label>
      <input
        type="text"
        placeholder="ID de appointment"
        className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
      />
      <div className="flex gap-3">
        <button
          onClick={onClear}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded">
          Limpiar
        </button>
        <button
          onClick={onSearch}
          className="flex-1 bg-blue-600 dark:bg-blue-700 hover:bg-blue-900 text-white py-2 rounded">
          Buscar
        </button>
      </div>
    </div>
  );
}