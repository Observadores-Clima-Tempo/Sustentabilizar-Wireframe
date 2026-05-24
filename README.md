# Sustentabilizar — Wireframe de Alta Fidelidade

Wireframe interativo do sistema **Sustentabilizar**, plataforma de certificação ambiental para incentivo ao descarte responsável de resíduos sólidos.

> **Apenas wireframe.** Nenhuma chamada de API ou banco de dados — toda a lógica é simulada com dados mockados em memória.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Framework de UI |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | v4 | Estilização (via `@tailwindcss/vite`) |
| React Router DOM | v6 | Roteamento client-side |
| clsx | — | Classes condicionais |

---

## Setup e execução

**Pré-requisitos:** Node.js 18+

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

O app estará disponível em **http://localhost:5173/**

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Como navegar pelo wireframe

### 1. Página inicial

Acesse `/` para ver a landing page pública com apresentação do produto, níveis de certificação e chamadas para ação.

### 2. Criar conta (fluxo de cadastro)

1. Clique em **"Criar conta gratuita"** na landing page
2. Preencha o formulário em `/cadastro` (nome, e-mail, CPF, cidade, estado, senha)
3. Após o cadastro, você é redirecionado automaticamente para o **Checklist inicial**

### 3. Login

- Acesse `/login` diretamente ou pelo botão **"Entrar"** na landing
- **Qualquer e-mail válido + senha com 6+ caracteres funciona** (autenticação mockada)
- Usuário demo pré-configurado: `ana@email.com` / `123456`

### 4. Checklist de diagnóstico

- Aparece logo após o primeiro cadastro
- 8 perguntas sobre práticas de descarte (sim/não, múltipla escolha, escala)
- Ao final, exibe a pontuação obtida e o nível de certificação inicial

### 5. Dashboard

Tela principal após login (`/dashboard`):
- Resumo da certificação atual com barra de progresso para o próximo nível
- Estatísticas rápidas (registros nos últimos 30 dias, total, tipos de resíduo)
- Ações rápidas: **Novo registro** e **Ver certificado**
- Lista dos 4 registros mais recentes

### 6. Registros de resíduos

| Rota | Descrição |
|---|---|
| `/registros` | Lista completa com filtro por tipo de resíduo |
| `/registros/novo` | Formulário de novo registro (tipo, peso, frequência, data, observações) |
| `/registros/novo/evidencia` | Upload de foto como evidência (drag & drop, preview com timestamp) |
| `/registros/:id` | Detalhe de um registro específico com galeria de evidências |

### 7. Certificado

Rota `/certificado`:
- Cartão do certificado com cores e ícone do nível atual (Bronze / Prata / Ouro)
- Progressão visual entre os 3 níveis
- Barra de progresso para o próximo nível
- Critérios avaliados e composição da pontuação

### 8. Perfil

Rota `/perfil`:
- Dados do usuário (nome, e-mail, CPF mascarado, cidade/estado)
- Estatísticas consolidadas (peso total, registros com evidência, tipos de resíduo)
- Botão de **logout** (retorna para a landing page)

---

## Estrutura de pontuação (mockada)

| Ação | Pontos |
|---|---|
| Responder checklist | até 62 pts |
| Registrar resíduo | +pts por registro |
| Anexar evidência fotográfica | +10 pts |
| **Bronze** | ≥ 30 pts |
| **Prata** | ≥ 70 pts |
| **Ouro** | ≥ 120 pts |

---

## Estrutura de arquivos relevantes

```
src/
├── context/
│   └── AuthContext.jsx       # Auth mock (login/logout/checklist)
├── data/
│   ├── mockUser.js           # Dados do usuário demo
│   ├── mockRecords.js        # Registros de resíduos + constantes
│   ├── mockChecklist.js      # Perguntas do diagnóstico
│   └── mockCertification.js  # Configuração dos níveis e estado atual
├── components/
│   ├── ui/                   # Button, Card, Badge, Input, ProgressBar
│   └── layout/               # AppLayout, TopBar, BottomNav, Sidebar
└── pages/
    ├── LandingPage.jsx
    ├── LoginPage.jsx
    ├── CadastroPage.jsx
    ├── ChecklistPage.jsx
    ├── ChecklistResultPage.jsx
    ├── DashboardPage.jsx
    ├── RecordsListPage.jsx
    ├── NewRecordPage.jsx
    ├── EvidenceUploadPage.jsx
    ├── RecordDetailPage.jsx
    ├── CertificatePage.jsx
    └── ProfilePage.jsx
```
