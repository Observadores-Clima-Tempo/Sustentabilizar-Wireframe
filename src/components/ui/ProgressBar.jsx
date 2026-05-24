import clsx from 'clsx';

const colorMap = {
  primary: 'bg-primary-600',
  bronze: 'bg-amber-500',
  prata: 'bg-slate-400',
  ouro: 'bg-yellow-500',
};

export function ProgressBar({ value, max = 100, color = 'primary', label, showValue, className }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-gray-700">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colorMap[color] || 'bg-primary-600')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
