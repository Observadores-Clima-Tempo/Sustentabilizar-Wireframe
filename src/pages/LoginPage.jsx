import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!email) errs.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'E-mail inválido';
    if (!password) errs.password = 'Senha é obrigatória';
    else if (password.length < 6) errs.password = 'Senha deve ter ao menos 6 caracteres';
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
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center">
            <span className="text-3xl">🌿</span>
            <span className="font-bold text-primary-700 text-xl">Sustentabilizar</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
          <p className="text-gray-500 text-sm mt-1">Entre na sua conta para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary-600 hover:underline">
                Esqueci minha senha
              </button>
            </div>
            <Button type="submit" fullWidth size="lg">
              Entrar
            </Button>
          </form>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-3 bg-primary-50 rounded-xl border border-primary-100 text-center">
          <p className="text-xs text-primary-700">
            <strong>Modo wireframe:</strong> qualquer e-mail e senha (6+ caracteres) funciona.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-primary-600 font-semibold hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
