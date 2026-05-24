import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard', icon: '🏠', label: 'Início' },
  { to: '/registros', icon: '📋', label: 'Registros' },
  { to: '/registros/novo', icon: '➕', label: 'Novo' },
  { to: '/certificado', icon: '🏆', label: 'Certificado' },
  { to: '/perfil', icon: '👤', label: 'Perfil' },
];

export function TopBar({ title }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-bold text-primary-700 text-lg">Sustentabilizar</span>
        </div>
        {title && <span className="text-sm font-semibold text-gray-700">{title}</span>}
        <div className="w-8" />
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-area-pb md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors duration-150 min-w-[52px]',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={clsx('text-xl', item.to === '/registros/novo' && 'text-2xl')}>{item.icon}</span>
                <span className={clsx('text-[10px] font-medium', isActive && 'font-semibold')}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100">
        <span className="text-2xl">🌿</span>
        <span className="font-bold text-primary-700 text-lg leading-tight">Sustentabilizar</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800',
              )
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
        >
          <span className="text-lg">🚪</span>
          Sair
        </button>
      </div>
    </aside>
  );
}

export function AppLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden">
          <TopBar title={title} />
        </div>
        <main className="flex-1 pb-20 md:pb-8">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
