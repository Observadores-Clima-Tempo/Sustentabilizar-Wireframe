import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-primary-700 text-lg">Sustentabilizar</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Entrar
          </Button>
          <Button size="sm" onClick={() => navigate('/cadastro')}>
            Começar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
          🌱 Plataforma de Certificação Ambiental
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mb-6">
          Comprove suas práticas{' '}
          <span className="text-primary-600">sustentáveis</span>{' '}
          com evidências reais
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
          Registre seus resíduos, faça upload de evidências e conquiste seu certificado ambiental — Bronze, Prata ou Ouro.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="xl" onClick={() => navigate('/cadastro')}>
            🚀 Criar minha conta grátis
          </Button>
          <Button variant="secondary" size="xl" onClick={() => navigate('/login')}>
            Já tenho conta
          </Button>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">Como funciona</h2>
          <p className="text-gray-500 text-center mb-12">Em 4 passos simples, você prova seu compromisso com o meio ambiente</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '📝', title: 'Crie sua conta', desc: 'Cadastre-se com seus dados básicos como Pessoa Física' },
              { step: '2', icon: '✅', title: 'Responda o checklist', desc: 'Avalie suas práticas atuais de descarte e segregação' },
              { step: '3', icon: '📸', title: 'Registre evidências', desc: 'Fotografe seus resíduos segregados com timestamp automático' },
              { step: '4', icon: '🏆', title: 'Receba a certificação', desc: 'Conquiste Bronze, Prata ou Ouro baseado no seu desempenho' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-primary-600 font-semibold mb-1">Passo {item.step}</p>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Níveis */}
      <section className="py-16 px-6 md:px-10 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Níveis de certificação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🥉', level: 'Bronze', points: '≥ 30 pts', color: 'border-amber-300 bg-amber-50', textColor: 'text-amber-700', desc: 'Checklist completo + primeiro registro' },
              { icon: '🥈', level: 'Prata', points: '≥ 70 pts', color: 'border-slate-300 bg-slate-50', textColor: 'text-slate-600', desc: 'Boa pontuação + 5 registros em 30 dias' },
              { icon: '🥇', level: 'Ouro', points: '≥ 120 pts', color: 'border-yellow-300 bg-yellow-50', textColor: 'text-yellow-700', desc: 'Excelência + 10 registros + tipos variados' },
            ].map((item) => (
              <div key={item.level} className={`rounded-xl border-2 p-6 flex flex-col items-center text-center gap-2 ${item.color}`}>
                <span className="text-4xl">{item.icon}</span>
                <h3 className={`text-lg font-bold ${item.textColor}`}>{item.level}</h3>
                <span className={`text-sm font-semibold ${item.textColor}`}>{item.points}</span>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-primary-700 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Comece hoje mesmo</h2>
        <p className="text-primary-200 mb-8">Gratuito. Sem necessidade de cartão de crédito.</p>
        <Button size="xl" variant="white" onClick={() => navigate('/cadastro')}>
          🌱 Criar conta grátis
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-gray-900 text-gray-400 text-sm text-center">
        © 2026 Sustentabilizar · Plataforma de Certificação Ambiental
      </footer>
    </div>
  );
}
