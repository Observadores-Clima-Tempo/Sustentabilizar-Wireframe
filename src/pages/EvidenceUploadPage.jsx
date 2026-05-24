import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';

export function EvidenceUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file) {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Apenas imagens JPG ou PNG são aceitas.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 10 MB.');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  function handleUpload() {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDone(true);
      setTimeout(() => navigate('/registros'), 1200);
    }, 1500);
  }

  if (done) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Evidência enviada!</h2>
            <p className="text-sm text-gray-500 mb-1">Sua pontuação foi atualizada automaticamente.</p>
            <p className="text-sm text-primary-600 font-medium">+10 pontos adicionados 🌱</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const timestamp = new Date().toLocaleString('pt-BR');

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
          <h1 className="text-xl font-bold text-gray-900">Upload de evidência</h1>
          <p className="text-sm text-gray-500 mt-1">Fotografe o resíduo segregado para validar seu registro</p>
        </div>

        {/* Timestamp info */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-sm font-semibold text-primary-800">Timestamp automático</p>
            <p className="text-xs text-primary-700 mt-0.5">
              A data e hora serão registradas automaticamente: <strong>{timestamp}</strong>
            </p>
          </div>
        </div>

        {/* Upload area */}
        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-150
              ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50/40'}
            `}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-3">
              <span className="text-5xl">📸</span>
              <div>
                <p className="font-semibold text-gray-700">Clique ou arraste uma imagem aqui</p>
                <p className="text-xs text-gray-400 mt-1">JPG ou PNG · Máximo 10 MB</p>
              </div>
              <Button type="button" variant="secondary" size="sm">
                Escolher arquivo
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="relative">
              <img
                src={preview}
                alt="Prévia da evidência"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => { setPreview(null); setFileName(''); }}
                  className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-500 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span>📎</span> {fileName}
              </p>
              <p className="text-xs text-gray-400 mt-1">⏱️ {timestamp}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          {preview && (
            <Button
              fullWidth
              size="lg"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? '⏳ Enviando...' : '✅ Confirmar e enviar evidência'}
            </Button>
          )}
          <Button
            variant="ghost"
            fullWidth
            onClick={() => navigate('/registros')}
          >
            Pular por agora (não recomendado)
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
