import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export function CadastroPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', cpf: '', city: '', state: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  function formatCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  }

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: field === 'cpf' ? formatCPF(value) : value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nome é obrigatório';
    if (!form.email) errs.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.cpf) errs.cpf = 'CPF é obrigatório';
    else if (form.cpf.replace(/\D/g, '').length !== 11) errs.cpf = 'CPF incompleto';
    if (!form.city.trim()) errs.city = 'Cidade é obrigatória';
    if (!form.state) errs.state = 'Estado é obrigatório';
    if (!form.password) errs.password = 'Senha é obrigatória';
    else if (form.password.length < 8) errs.password = 'Senha deve ter ao menos 8 caracteres';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Senhas não conferem';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    login();
    navigate('/checklist');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center">
            <span className="text-3xl">🌿</span>
            <span className="font-bold text-primary-700 text-xl">Sustentabilizar</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Crie sua conta</h1>
          <p className="text-gray-500 text-sm mt-1">Pessoa Física · Gratuito</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Ana Beatriz Silva"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={(e) => set('cpf', e.target.value)}
              error={errors.cpf}
              inputMode="numeric"
            />
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Input
                  label="Cidade"
                  type="text"
                  placeholder="São Paulo"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  error={errors.city}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Estado</label>
                <select
                  value={form.state}
                  onChange={(e) => set('state', e.target.value)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white transition-colors ${errors.state ? 'border-red-400' : 'border-gray-300'}`}
                >
                  <option value="">UF</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
              </div>
            </div>
            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />
            <Input
              label="Confirmar senha"
              type="password"
              placeholder="Repita a senha"
              value={form.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
            <Button type="submit" fullWidth size="lg" className="mt-2">
              🌱 Criar conta e começar
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
