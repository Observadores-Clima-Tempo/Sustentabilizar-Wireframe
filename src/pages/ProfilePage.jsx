import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CertificationBadge } from '../components/ui/Badge';
import { mockUser } from '../data/mockUser';
import { mockCertification } from '../data/mockCertification';
import { mockRecords, WASTE_TYPES } from '../data/mockRecords';
import { useAuth } from '../context/AuthContext';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = mockUser;
  const cert = mockCertification;

  const wasteTypesUsed = [...new Set(mockRecords.map((r) => r.waste_type))];
  const totalWeight = mockRecords.reduce((sum, r) => sum + r.weight_kg, 0).toFixed(1);
  const withEvidence = mockRecords.filter((r) => r.evidences.length > 0).length;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8 md:px-8 md:pt-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Meu Perfil</h1>
        </div>

        {/* User info card */}
        <Card padding="lg" className="mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-700">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-1">
                <CertificationBadge level={cert.level} size="sm" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'CPF', value: user.cpf },
              { label: 'Cidade/Estado', value: `${user.city} — ${user.state}` },
              { label: 'Perfil', value: 'Pessoa Física' },
              { label: 'Membro desde', value: formatDate(user.created_at) },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="mt-4 w-full">
            ✏️ Editar dados
          </Button>
        </Card>

        {/* Stats */}
        <Card padding="lg" className="mb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Minhas estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '📊', label: 'Pontuação total', value: `${cert.score} pts` },
              { icon: '📋', label: 'Total de registros', value: cert.total_records },
              { icon: '⚖️', label: 'Peso total registrado', value: `${totalWeight} kg` },
              { icon: '📸', label: 'Com evidência', value: `${withEvidence} registros` },
              { icon: '♻️', label: 'Tipos de resíduo', value: `${wasteTypesUsed.length} tipos` },
              { icon: '📅', label: 'Registros (30d)', value: cert.records_last_30_days },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Waste types breakdown */}
        <Card padding="lg" className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Tipos de resíduo registrados</h3>
          <div className="flex flex-wrap gap-2">
            {wasteTypesUsed.map((wt) => {
              const wtInfo = WASTE_TYPES.find((t) => t.value === wt);
              return (
                <span key={wt} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${wtInfo?.color}`}>
                  {wtInfo?.icon} {wtInfo?.label}
                </span>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button variant="secondary" fullWidth onClick={() => navigate('/certificado')}>
            🏆 Ver meu certificado completo
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/checklist')}>
            📝 Refazer diagnóstico
          </Button>
          <Button
            variant="danger"
            fullWidth
            onClick={handleLogout}
          >
            🚪 Sair da conta
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
