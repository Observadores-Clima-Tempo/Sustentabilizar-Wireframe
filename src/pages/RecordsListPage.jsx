import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockRecords, WASTE_TYPES } from '../data/mockRecords';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function RecordsListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('todos');

  const filtered = filter === 'todos'
    ? mockRecords
    : mockRecords.filter((r) => r.waste_type === filter);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 md:px-8 md:pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Meus registros</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mockRecords.length} registros no total</p>
          </div>
          <Button size="sm" onClick={() => navigate('/registros/novo')}>
            ➕ Novo
          </Button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          <button
            onClick={() => setFilter('todos')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === 'todos'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            Todos ({mockRecords.length})
          </button>
          {WASTE_TYPES.map((wt) => {
            const count = mockRecords.filter((r) => r.waste_type === wt.value).length;
            if (count === 0) return null;
            return (
              <button
                key={wt.value}
                onClick={() => setFilter(wt.value)}
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filter === wt.value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {wt.icon} {wt.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Records list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">Nenhum registro encontrado</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((rec) => {
              const wt = WASTE_TYPES.find((t) => t.value === rec.waste_type) ?? { label: rec.waste_type, icon: '🗂️', color: 'bg-gray-100 text-gray-600' };
              return (
                <Card key={rec.id} padding="md" onClick={() => navigate(`/registros/${rec.id}`)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${wt.color}`}>
                      {wt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-sm text-gray-900">{wt.label}</span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-700 font-medium">{rec.weight_kg} kg</span>
                            {rec.volume_liters && (
                              <span className="text-xs text-gray-400">{rec.volume_liters} L</span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 mt-0.5">{formatDate(rec.collection_date)}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        {rec.evidences.length > 0 ? (
                          <span className="text-xs text-primary-600 flex items-center gap-1">
                            📸 {rec.evidences.length} evidência{rec.evidences.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-xs text-amber-600 flex items-center gap-1">
                            ⚠️ Sem evidência
                          </span>
                        )}
                        {rec.notes && (
                          <span className="text-xs text-gray-400 truncate">💬 {rec.notes}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-300 self-center">›</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
