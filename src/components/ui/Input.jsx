import clsx from 'clsx';

export function Input({ label, error, hint, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={clsx(
          'w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-150',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
          error
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 bg-white hover:border-gray-400',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function Select({ label, error, hint, className, children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={clsx(
          'w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 bg-white transition-colors duration-150',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
          error
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-gray-400',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        rows={3}
        className={clsx(
          'w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 resize-none transition-colors duration-150',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
          error
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 bg-white hover:border-gray-400',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
