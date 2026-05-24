import clsx from 'clsx';

export function Card({ children, className, onClick, padding = 'md' }) {
  const paddings = { sm: 'p-3', md: 'p-4', lg: 'p-6', none: '' };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-gray-100 shadow-sm',
        paddings[padding],
        onClick && 'cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-150',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
