import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockRecords, WASTE_TYPES, COLLECTION_FREQUENCIES } from '../data/mockRecords';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function RecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = mockRecords.find((r) => r.id === id);

  if (!record) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-gray-700">Registro não encontrado</p>
            <Button className="mt-4" variant="secondary" onClick={() => navigate('/registros')}>
              ← Voltar para registros
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const wt = WASTE_TYPES.find((t) => t.value === record.waste_type) ?? { label: record.waste_type, icon: '🗂️', color: 'bg-gray-100 text-gray-600' };
  const freq = COLLECTION_FREQUENCIES.find((f) => f.value === record.collection_frequency);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8 md:px-8 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/registros')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-3"
          >
            ← Voltar para registros
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${wt.color}`}>
              {wt.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{wt.label}</h1>
              <p className="text-sm text-gray-500">{formatDate(record.collection_date)}</p>
            </div>
          </div>
        </div>

        {/* Details card */}
        <Card padding="lg" className="mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Detalhes do registro</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tipo de resíduo', value: wt.label },
              { label: 'Peso registrado', value: `${record.weight_kg} kg` },
              { label: 'Volume estimado', value: record.volume_liters ? `${record.volume_liters} L` : '—' },
              { label: 'Frequência de coleta', value: freq?.label ?? '—' },
              { label: 'Data de coleta', value: formatDate(record.collection_date) },
              { label: 'Registrado em', value: formatDateTime(record.created_at) },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
          {record.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Observações</p>
              <p className="text-sm text-gray-700">{record.notes}</p>
            </div>
          )}
        </Card>

        {/* Evidences */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">
              Evidências ({record.evidences.length})
            </h2>
            <Button size="sm" variant="secondary" onClick={() => navigate('/registros/novo/evidencia')}>
              ➕ Adicionar
            </Button>
          </div>

          {record.evidences.length === 0 ? (
            <div className="border-2 border-dashed border-amber-200 bg-amber-50 rounded-xl p-6 text-center">
              <p className="text-3xl mb-2">📸</p>
              <p className="text-sm font-medium text-amber-700">Sem evidências ainda</p>
              <p className="text-xs text-amber-600 mt-1">
                Adicione uma foto para validar este registro e ganhar pontos extras
              </p>
              <Button
                size="sm"
                className="mt-4"
                onClick={() => navigate('/registros/novo/evidencia')}
              >
                Fazer upload de foto
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {record.evidences.map((ev) => (
                <div key={ev.id} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                  <img
                    src={ev.file_url}
                    alt={ev.file_name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-gray-700 truncate">{ev.file_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">⏱️ {formatDateTime(ev.captured_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
