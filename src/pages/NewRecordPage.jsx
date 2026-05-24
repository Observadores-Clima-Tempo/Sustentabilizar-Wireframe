import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { WASTE_TYPES, COLLECTION_FREQUENCIES } from '../data/mockRecords';
import clsx from 'clsx';

export function NewRecordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    waste_type: '',
    weight_kg: '',
    volume_liters: '',
    collection_frequency: '',
    collection_date: new Date().toISOString().slice(0, 10),
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.waste_type) errs.waste_type = 'Selecione o tipo de resíduo';
    if (!form.weight_kg) errs.weight_kg = 'Peso é obrigatório';
    else if (isNaN(form.weight_kg) || Number(form.weight_kg) <= 0) errs.weight_kg = 'Peso deve ser maior que zero';
    if (!form.collection_frequency) errs.collection_frequency = 'Selecione a frequência';
    if (!form.collection_date) errs.collection_date = 'Data é obrigatória';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      navigate('/registros/novo/evidencia', { state: { record: form } });
    }, 800);
  }

  if (submitted) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">✅</div>
            <p className="font-semibold text-gray-900">Registro salvo!</p>
            <p className="text-sm text-gray-500 mt-1">Redirecionando para upload de evidência...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 md:px-8 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-3"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-gray-900">Novo registro de resíduo</h1>
          <p className="text-sm text-gray-500 mt-1">Registre o tipo e quantidade do resíduo gerado</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Tipo de resíduo */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Tipo de resíduo *</p>
            {errors.waste_type && (
              <p className="text-xs text-red-600 mb-2">{errors.waste_type}</p>
            )}
            <div className="grid grid-cols-4 gap-2">
              {WASTE_TYPES.map((wt) => (
                <button
                  key={wt.value}
                  type="button"
                  onClick={() => set('waste_type', wt.value)}
                  className={clsx(
                    'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-medium transition-all duration-150',
                    form.waste_type === wt.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                  )}
                >
                  <span className="text-2xl">{wt.icon}</span>
                  <span>{wt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Peso e volume */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Peso (kg) *"
              type="number"
              placeholder="0.0"
              step="0.001"
              min="0"
              value={form.weight_kg}
              onChange={(e) => set('weight_kg', e.target.value)}
              error={errors.weight_kg}
              inputMode="decimal"
            />
            <Input
              label="Volume (dm³) — opcional"
              type="number"
              placeholder="0.0"
              step="0.1"
              min="0"
              value={form.volume_liters}
              onChange={(e) => set('volume_liters', e.target.value)}
              inputMode="decimal"
            />
          </div>

          {/* Frequência e data */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Frequência de coleta *"
              value={form.collection_frequency}
              onChange={(e) => set('collection_frequency', e.target.value)}
              error={errors.collection_frequency}
            >
              <option value="">Selecione...</option>
              {COLLECTION_FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </Select>
            <Input
              label="Data *"
              type="date"
              value={form.collection_date}
              onChange={(e) => set('collection_date', e.target.value)}
              error={errors.collection_date}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>

          {/* Observações */}
          <Textarea
            label="Observações (opcional)"
            placeholder="Descreva o resíduo, condições de descarte, etc."
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar e adicionar evidência →
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
