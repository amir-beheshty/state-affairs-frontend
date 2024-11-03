import { useId } from 'react';

export default function Filter({
  label,
  onFilter,
  value,
  options,
  ariaLabel,
}: {
  label: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: string[];
  ariaLabel?: string;
}) {
  const selectId = useId();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <label htmlFor={selectId} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        name={label}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-label={ariaLabel}
        onChange={onFilter}
        value={value}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
