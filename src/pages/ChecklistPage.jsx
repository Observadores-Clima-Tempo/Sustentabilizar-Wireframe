import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { mockChecklist } from '../data/mockChecklist';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

function QuestionCard({ question, answer, onAnswer }) {
  if (question.answer_type === 'yes_no') {
    return (
      <div className="flex flex-col gap-3">
        {[
          { value: 'sim', label: '✅ Sim' },
          { value: 'nao', label: '❌ Não' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className={clsx(
              'w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-150',
              answer === opt.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50/50',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (question.answer_type === 'multiple_choice') {
    return (
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className={clsx(
              'w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-150',
              answer === opt.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50/50',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (question.answer_type === 'scale_1_5') {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-between">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onAnswer(n)}
              className={clsx(
                'flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-150',
                answer === n
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300',
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Muito baixo</span>
          <span>Muito alto</span>
        </div>
      </div>
    );
  }

  return null;
}

export function ChecklistPage() {
  const navigate = useNavigate();
  const { completeChecklist } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = mockChecklist[currentIndex];
  const total = mockChecklist.length;
  const currentAnswer = answers[question.id];
  const progress = Math.round(((currentIndex) / total) * 100);

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      completeChecklist();
      navigate('/checklist/resultado', { state: { answers } });
    }
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-primary-700 text-lg">Sustentabilizar</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Diagnóstico inicial</h1>
          <p className="text-sm text-gray-500 mt-1">Avaliamos suas práticas de descarte responsável</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Pergunta {currentIndex + 1} de {total}</span>
            <span>{progress}% concluído</span>
          </div>
          <ProgressBar value={currentIndex + 1} max={total} color="primary" />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="mb-6">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
              {question.answer_type === 'yes_no' ? 'Sim / Não' :
               question.answer_type === 'multiple_choice' ? 'Múltipla escolha' :
               'Escala de 1 a 5'}
            </span>
            <h2 className="mt-2 text-base font-semibold text-gray-900 leading-snug">
              {question.question_text}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Vale até {question.points_max} pontos</p>
          </div>
          <QuestionCard question={question} answer={currentAnswer} onAnswer={handleAnswer} />
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentIndex > 0 && (
            <Button variant="secondary" onClick={handleBack} className="flex-1">
              ← Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className="flex-1"
          >
            {currentIndex === total - 1 ? '🏁 Finalizar diagnóstico' : 'Próxima →'}
          </Button>
        </div>

        {/* Skip hint */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Selecione uma opção para continuar
        </p>
      </div>
    </div>
  );
}
