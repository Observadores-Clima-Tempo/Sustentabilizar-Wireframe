import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CertificationBadge } from '../components/ui/Badge';
import { mockUser } from '../data/mockUser';
import { mockRecords, WASTE_TYPES } from '../data/mockRecords';
import { mockCertification, CERTIFICATION_LEVELS } from '../data/mockCertification';

function getWasteLabel(value) {
  return WASTE_TYPES.find((t) => t.value === value) ?? { label: value, icon: '🗂️', color: 'bg-gray-100 text-gray-600' };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function DashboardPage() {
  const navigate = useNavigate();
  const user = mockUser;
  const cert = mockCertification;
  const recentRecords = mockRecords.slice(0, 4);
  const levelCfg = CERTIFICATION_LEVELS[cert.level];
  const nextLevelCfg = CERTIFICATION_LEVELS[cert.next_level];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 md:px-8 md:pt-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            Olá, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Certification card */}
        <Card className={`mb-4 border-2 ${levelCfg.borderColor} ${levelCfg.bgColor}`} padding="lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CertificationBadge level={cert.level} size="md" />
              </div>
              <div className="flex items-baseline gap-1 mt-3">
                <span className={`text-4xl font-bold ${levelCfg.color}`}>{cert.score}</span>
                <span className="text-gray-500 text-sm">pontos</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{levelCfg.label}</span>
                  <span>{nextLevelCfg?.label ?? 'Máximo'}</span>
                </div>
                <ProgressBar
                  value={cert.score - levelCfg.minScore}
                  max={(nextLevelCfg?.minScore ?? cert.score) - levelCfg.minScore}
                  color={cert.level}
                />
                {nextLevelCfg && (
                  <p className="text-xs text-gray-400 mt-1.5">
                    Faltam {cert.points_to_next} pontos para o nível {nextLevelCfg.label}
                  </p>
                )}
              </div>
            </div>
            <span className="text-5xl">{levelCfg.icon}</span>
          </div>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Registros (30d)', value: cert.records_last_30_days, icon: '📋' },
            { label: 'Total registros', value: cert.total_records, icon: '📦' },
            { label: 'Tipos de resíduo', value: cert.waste_types_count, icon: '♻️' },
          ].map((stat) => (
            <Card key={stat.label} padding="md" className="text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 leading-tight mt-0.5">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Ações rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="primary" size="md" fullWidth onClick={() => navigate('/registros/novo')}>
              ➕ Novo registro
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/certificado')}>
              🏆 Ver certificado
            </Button>
          </div>
        </div>

        {/* Recent records */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Últimos registros</h2>
            <button
              className="text-sm text-primary-600 hover:underline font-medium"
              onClick={() => navigate('/registros')}
            >
              Ver todos →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentRecords.map((rec) => {
              const wt = getWasteLabel(rec.waste_type);
              return (
                <Card key={rec.id} padding="md" onClick={() => navigate(`/registros/${rec.id}`)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${wt.color}`}>
                      {wt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-gray-900">{wt.label}</span>
                        <span className="text-xs text-gray-400 shrink-0">{formatDate(rec.collection_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{rec.weight_kg} kg</span>
                        {rec.evidences.length > 0 && (
                          <span className="text-xs text-primary-600 flex items-center gap-1">
                            📸 {rec.evidences.length} evidência{rec.evidences.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-300 text-sm">›</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
