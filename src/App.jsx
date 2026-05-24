import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CadastroPage } from './pages/CadastroPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ChecklistResultPage } from './pages/ChecklistResultPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecordsListPage } from './pages/RecordsListPage';
import { NewRecordPage } from './pages/NewRecordPage';
import { EvidenceUploadPage } from './pages/EvidenceUploadPage';
import { RecordDetailPage } from './pages/RecordDetailPage';
import { CertificatePage } from './pages/CertificatePage';
import { ProfilePage } from './pages/ProfilePage';

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireGuest({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<RequireGuest><LoginPage /></RequireGuest>} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/checklist" element={<RequireAuth><ChecklistPage /></RequireAuth>} />
      <Route path="/checklist/resultado" element={<RequireAuth><ChecklistResultPage /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/registros" element={<RequireAuth><RecordsListPage /></RequireAuth>} />
      <Route path="/registros/novo" element={<RequireAuth><NewRecordPage /></RequireAuth>} />
      <Route path="/registros/novo/evidencia" element={<RequireAuth><EvidenceUploadPage /></RequireAuth>} />
      <Route path="/registros/:id" element={<RequireAuth><RecordDetailPage /></RequireAuth>} />
      <Route path="/certificado" element={<RequireAuth><CertificatePage /></RequireAuth>} />
      <Route path="/perfil" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
