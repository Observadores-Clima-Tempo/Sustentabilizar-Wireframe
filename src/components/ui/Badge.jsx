import clsx from 'clsx';
import { CERTIFICATION_LEVELS } from '../../data/mockCertification';

const levelColors = {
  bronze: 'bg-amber-100 text-amber-700 border border-amber-200',
  prata: 'bg-slate-100 text-slate-600 border border-slate-200',
  ouro: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  papel: 'bg-blue-100 text-blue-700',
  plastico: 'bg-yellow-100 text-yellow-700',
  vidro: 'bg-cyan-100 text-cyan-700',
  metal: 'bg-gray-100 text-gray-600',
  organico: 'bg-green-100 text-green-700',
  eletronico: 'bg-purple-100 text-purple-700',
  perigoso: 'bg-red-100 text-red-700',
  outro: 'bg-stone-100 text-stone-700',
  default: 'bg-gray-100 text-gray-600',
};

export function Badge({ children, variant = 'default', size = 'sm', className }) {
  const sizes = { xs: 'px-1.5 py-0.5 text-xs', sm: 'px-2.5 py-1 text-xs', md: 'px-3 py-1.5 text-sm' };
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        levelColors[variant] || levelColors.default,
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CertificationBadge({ level, size = 'sm' }) {
  const cfg = CERTIFICATION_LEVELS[level];
  if (!cfg) return null;
  return (
    <Badge variant={level} size={size}>
      {cfg.icon} {cfg.label}
    </Badge>
  );
}
