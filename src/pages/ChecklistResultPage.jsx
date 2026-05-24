import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { mockChecklist } from '../data/mockChecklist';
import { CERTIFICATION_LEVELS } from '../data/mockCertification';

function calcScore(answers) {
  let total = 0;
  for (const question of mockChecklist) {
    const answer = answers?.[question.id];
    if (answer === undefined) continue;
    if (question.answer_type === 'yes_no') {
      total += answer === 'sim' ? question.points_max : 0;
    } else if (question.answer_type === 'scale_1_5') {
      total += Math.round((answer / 5) * question.points_max);
    } else if (question.answer_type === 'multiple_choice') {
      const opt = question.options.find((o) => o.value === answer);
      total += opt?.points ?? 0;
    }
  }
  return total;
}

function getLevel(score) {
  if (score >= 70) return 'prata';
  if (score >= 30) return 'bronze';
  return null;
}

export function ChecklistResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers ?? {};
  const score = calcScore(answers);
  const maxScore = mockChecklist.reduce((sum, q) => sum + q.points_max, 0);
  const level = getLevel(score);
  const cfg = level ? CERTIFICATION_LEVELS[level] : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Result card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center mb-6">
          <div className="text-5xl mb-4">{cfg ? cfg.icon : '📊'}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Diagnóstico concluído!</h1>

          <div className="my-6">
            <div className="text-5xl font-bold text-primary-600 mb-1">{score}</div>
            <div className="text-sm text-gray-500">de {maxScore} pontos possíveis</div>
          </div>

          <ProgressBar value={score} max={maxScore} color="primary" className="mb-6" />

          {cfg ? (
            <div className={`rounded-xl border-2 p-4 mb-4 ${cfg.borderColor} ${cfg.bgColor}`}>
              <p className={`font-bold text-lg ${cfg.color}`}>{cfg.icon} Nível {cfg.label} desbloqueado!</p>
              <p className="text-sm text-gray-600 mt-1">{cfg.description}</p>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4 mb-4">
              <p className="font-bold text-gray-700">Continue evoluindo!</p>
              <p className="text-sm text-gray-500 mt-1">
                Registre resíduos e evidências para alcançar o nível Bronze (≥ 30 pontos).
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 text-sm text-gray-600 mt-4">
            <p>🥉 Bronze: ≥ 30 pts · {score >= 30 ? '✅ Atingido' : `${30 - score} pts para atingir`}</p>
            <p>🥈 Prata: ≥ 70 pts · {score >= 70 ? '✅ Atingido' : `${70 - score} pts para atingir`}</p>
            <p>🥇 Ouro: ≥ 120 pts · {score >= 120 ? '✅ Atingido' : `${120 - score} pts para atingir`}</p>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-primary-50 rounded-xl border border-primary-100 p-5 mb-6">
          <h3 className="font-semibold text-primary-800 mb-3">Próximos passos</h3>
          <ul className="flex flex-col gap-2 text-sm text-primary-700">
            <li className="flex items-start gap-2">
              <span>📸</span>
              <span>Faça seu primeiro registro de resíduo com evidência fotográfica</span>
            </li>
            <li className="flex items-start gap-2">
              <span>📈</span>
              <span>Acompanhe sua pontuação no dashboard e evolua de nível</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🔄</span>
              <span>Registros frequentes aumentam sua pontuação automaticamente</span>
            </li>
          </ul>
        </div>

        <Button fullWidth size="lg" onClick={() => navigate('/dashboard')}>
          🏠 Ir para o Dashboard →
        </Button>
      </div>
    </div>
  );
}
