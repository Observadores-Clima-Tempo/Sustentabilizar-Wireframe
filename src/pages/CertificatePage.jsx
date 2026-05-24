import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { mockCertification, CERTIFICATION_LEVELS } from '../data/mockCertification';
import { mockUser } from '../data/mockUser';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function CertificatePage() {
  const navigate = useNavigate();
  const cert = mockCertification;
  const user = mockUser;
  const levelCfg = CERTIFICATION_LEVELS[cert.level];
  const nextLevelCfg = CERTIFICATION_LEVELS[cert.next_level];
  const allLevels = ['bronze', 'prata', 'ouro'];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8 md:px-8 md:pt-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Meu Certificado</h1>
          <p className="text-sm text-gray-500 mt-1">Baseado nas suas práticas de descarte responsável</p>
        </div>

        {/* Certificate card */}
        <div className={`rounded-2xl border-2 ${levelCfg.borderColor} ${levelCfg.bgColor} p-6 mb-5 relative overflow-hidden`}>
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 bg-current transform translate-x-8 -translate-y-8" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${levelCfg.color} mb-1`}>
                  Certificado Ambiental
                </p>
                <h2 className={`text-3xl font-bold ${levelCfg.color}`}>
                  {levelCfg.icon} Nível {levelCfg.label}
                </h2>
              </div>
              <div className={`text-right`}>
                <p className={`text-4xl font-bold ${levelCfg.color}`}>{cert.score}</p>
                <p className="text-xs text-gray-500">pontos</p>
              </div>
            </div>

            <div className={`rounded-xl border ${levelCfg.borderColor} bg-white/60 p-4 mb-4`}>
              <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{user.cpf}</p>
              <p className="text-xs text-gray-400 mt-2">
                Emitido em {formatDate(cert.issued_at)}
              </p>
            </div>

            <p className="text-sm text-gray-600">{levelCfg.description}</p>
          </div>
        </div>

        {/* Level progression */}
        <Card padding="lg" className="mb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Progressão de níveis</h3>
          <div className="flex items-center justify-between mb-4">
            {allLevels.map((lvl, i) => {
              const cfg = CERTIFICATION_LEVELS[lvl];
              const achieved = cert.score >= cfg.minScore;
              const isCurrent = cert.level === lvl;
              return (
                <div key={lvl} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                    achieved ? `${cfg.borderColor} ${cfg.bgColor}` : 'border-gray-200 bg-gray-50 opacity-40'
                  } ${isCurrent ? 'ring-2 ring-offset-2 ring-primary-400' : ''}`}>
                    {cfg.icon}
                  </div>
                  <span className={`text-xs font-medium ${achieved ? cfg.color : 'text-gray-400'}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-gray-400">≥{cfg.minScore}pts</span>
                  {i < allLevels.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              );
            })}
          </div>

          {nextLevelCfg && (
            <div>
              <ProgressBar
                value={cert.score - levelCfg.minScore}
                max={nextLevelCfg.minScore - levelCfg.minScore}
                color={cert.level}
                label={`Progresso para ${nextLevelCfg.label}`}
                showValue={false}
                className="mb-2"
              />
              <p className="text-xs text-gray-500 text-center">
                Faltam <strong>{cert.points_to_next} pontos</strong> para atingir o nível {nextLevelCfg.label}
              </p>
            </div>
          )}
        </Card>

        {/* Criteria */}
        <Card padding="lg" className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Critérios avaliados</h3>
          <div className="flex flex-col gap-3">
            {cert.criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`text-lg ${c.met ? 'text-primary-500' : 'text-gray-300'}`}>
                  {c.met ? '✅' : '⭕'}
                </span>
                <div className="flex-1">
                  <span className={`text-sm ${c.met ? 'text-gray-800' : 'text-gray-400'}`}>
                    {c.label}
                  </span>
                </div>
                {c.points > 0 && (
                  <span className={`text-xs font-semibold ${c.met ? 'text-primary-600' : 'text-gray-300'}`}>
                    +{c.points}pts
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Breakdown */}
        <Card padding="lg" className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Composição da pontuação</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">📝 Checklist inicial</span>
              <span className="font-semibold text-sm text-gray-900">{cert.checklist_score} pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">📦 Registros de resíduos</span>
              <span className="font-semibold text-sm text-gray-900">{cert.records_score} pts</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="font-bold text-primary-700">{cert.score} pts</span>
            </div>
          </div>
        </Card>

        <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/registros/novo')}>
          ➕ Adicionar mais registros para evoluir
        </Button>
      </div>
    </AppLayout>
  );
}
