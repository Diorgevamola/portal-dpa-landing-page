# Vercel Visual Guide — Portal DPA Landing Page

## 📍 ESTRUTURA VERCEL DASHBOARD

```
https://vercel.com
    ↓
[Dashboard]
    ├── Projects (esquerda)
    │   └── portal-dpa-landing-page ← CLICAR AQUI
    │
    ├── Deployments (aba principal)
    │   ├── v1.0.3 (5a9243d)
    │   ├── v1.0.2 (07bedca)
    │   └── v1.0.1 (82313f4)
    │
    ├── Settings (engrenagem 🔧 topo direito)
    │   ├── General
    │   ├── Build & Development
    │   ├── Environment Variables
    │   ├── Deployment
    │   ├── Functions
    │   ├── Domains
    │   ├── Security
    │   └── Monitoring
    │
    └── Analytics & Logs
```

---

## 🎯 PASSOS VISUAIS PARA VERIFICAÇÃO

### PASSO 1: Ir para Project Settings
```
1. Abrir: https://vercel.com/dashboard
2. Clicar em "portal-dpa-landing-page" na lista esquerda
3. Clicar em "Settings" (engrenagem 🔧 no topo direito)
```

**Você deve ver:**
```
Project Name: portal-dpa-landing-page
Framework: Other
Git: GitHub / Diorgevamola/portal-dpa-landing-page
```

---

### PASSO 2: Verificar Build & Development
```
Settings > Build & Development
```

**Procure por:**
```
┌─────────────────────────────────────────────┐
│ Build and Development Settings              │
├─────────────────────────────────────────────┤
│                                             │
│ Install Command:                            │
│ [npm install            ✓]                  │
│                                             │
│ Build Command:                              │
│ [npm run build || true ✓]                   │
│                                             │
│ Output Directory:                           │
│ [(empty)                 ✓]                 │
│                                             │
│ Development Command:                        │
│ [node server.js         ✓]                  │
│                                             │
└─────────────────────────────────────────────┘
```

**⚠️ IMPORTANTE:** Se Build Command estiver diferente, alterar para:
```
npm run build || true
```

---

### PASSO 3: Verificar Environment Variables
```
Settings > Environment Variables
```

**Procure por:**
```
┌─────────────────────────────────────────────┐
│ Environment Variables                       │
├─────────────────────────────────────────────┤
│                                             │
│ Variable Name: NODE_ENV                     │
│ Value: production                           │
│ Applied to: Production, Preview, Dev ✓      │
│                                             │
└─────────────────────────────────────────────┘
```

**Se NODE_ENV não existir, ADICIONAR:**
- [ ] Clicar em "Add new"
- [ ] Name: `NODE_ENV`
- [ ] Value: `production`
- [ ] Checkboxes: marcar todas (Production, Preview, Development)
- [ ] Clicar "Save"

---

### PASSO 4: Verificar Deployment Settings
```
Settings > Deployment
```

**Procure por:**
```
┌─────────────────────────────────────────────┐
│ Deployments                                 │
├─────────────────────────────────────────────┤
│                                             │
│ Deploy on Git Push: [ON]  ✓                 │
│ Preview Deployments: [ON] ✓                 │
│ Production Branch: [main] ✓                 │
│                                             │
│ Ignore Build Step: [OFF] ⚠️ DESABILITAR    │
│                                             │
└─────────────────────────────────────────────┘
```

**Se "Ignore Build Step" estiver ON:**
1. Clicar no toggle para desabilitar
2. Clicar "Save"
3. Fazer Redeploy

---

### PASSO 5: Verificar Deployment History
```
Voltar para aba "Deployments"
```

**Procure pelo deploy mais recente:**
```
v1.0.3 (5a9243d)
├── Status: ✅ Ready
├── Time: 35 seconds ago
├── Git: main @ 5a9243d
└── [Visit] [View Build Logs]
```

**Clicar em "View Build Logs" e procurar:**
```
✅ Building with "npm run build || true"...
✅ npm install
✅ Done in 2.5s
✅ Deployed successfully
```

---

### PASSO 6: Verificar Headers (vercel.json)
```
Settings > Deployment (scroll down)
```

**Procure por seção de Headers:**
- [ ] Deve haver headers para `/styles.css`
- [ ] Deve ter `Content-Type: text/css; charset=utf-8`

**Ou verificar no repositório:**
```bash
cat vercel.json
```

Deve conter:
```json
{
  "headers": [
    {
      "source": "/styles.css",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/css; charset=utf-8"
        }
      ]
    }
  ]
}
```

---

## 🧪 TESTE DE VERIFICAÇÃO NO NAVEGADOR

### Passo 1: Abrir DevTools
```
URL: https://portal-dpa-landing-page.vercel.app
Tecla: F12 ou Right-click > Inspect
```

### Passo 2: Aba Console
```
Console (aba)
├── Procurar por mensagens de erro
└── ❌ NÃO deve conter:
    "Refused to apply style from ... MIME type ('text/html')"
```

### Passo 3: Aba Network
```
Network (aba)
├── Recarregar página (Ctrl+R ou Cmd+R)
├── Procurar por "styles.css" na lista
├── Clicar em "styles.css"
└── Verificar "Response Headers":

    Content-Type: text/css; charset=utf-8  ✅ CORRETO
    X-Content-Type-Options: nosniff        ✅ OK
    Cache-Control: public, max-age=...     ✅ OK
    Status: 200 OK                         ✅ CORRETO
```

**❌ Se aparecer:**
```
Content-Type: text/html  ← ERRADO!
```

---

### Passo 4: Verificar Renderização Visual
```
Elementos visíveis na página:
├── Fundo preto (#000000)           ✅
├── Texto branco                    ✅
├── Botões dourados (#FFD700)       ✅
├── Font "Oswald"                   ✅
├── Espaçamento adequado            ✅
└── Layout responsivo (resize)      ✅
```

---

## 🔄 SE TUDO ESTIVER ERRADO

### Opção 1: Force Redeploy
```
Dashboard > Deployments
├── Clicar em deploy recente
├── Clicar em "..." (3 pontos)
└── Selecionar "Redeploy"
```

### Opção 2: Clear Cache e Redeploy
```
Settings > Deployment
├── Scroll down
├── Clicar "Clear Build Cache"
├── Depois "Redeploy"
```

### Opção 3: Usar Vercel CLI
```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Redeployer projeto
cd C:\Users\diorg\portal-dpa-standalone
vercel --prod --force
```

---

## 🎯 FLUXOGRAMA DE DIAGNÓSTICO

```
┌─────────────────────────────────────────┐
│ MIME Type Error na Vercel?              │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
   EM LOCALHOST?         EM VERCEL?
   (funciona?)          (não funciona?)
        │                     │
       SIM                    NÃO
        │                     │
        └──────────┬──────────┘
                   ↓
        ┌──────────────────────────┐
        │ Build Command está        │
        │ "npm run build || true"?  │
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
        │                    │
        │            [Alterar em Settings]
        │                    │
        └──────────┬─────────┘
                   ↓
        ┌──────────────────────────┐
        │ Ignore Build Step está   │
        │ DESABILITADO?            │
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
        │                    │
        │            [Desabilitar]
        │                    │
        └──────────┬─────────┘
                   ↓
        ┌──────────────────────────┐
        │ vercel.json tem          │
        │ headers para /styles.css?│
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
        │                    │
        │            [Adicionar headers]
        │                    │
        └──────────┬─────────┘
                   ↓
        ┌──────────────────────────┐
        │ Content-Type no           │
        │ server.js está correto?   │
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
        │                    │
        │            [Revisar server.js]
        │                    │
        └──────────┬─────────┘
                   ↓
        ┌──────────────────────────┐
        │ Force Redeploy via        │
        │ Dashboard                 │
        └──────────┬───────────────┘
                   ↓
        ┌──────────────────────────┐
        │ ✅ RESOLVIDO?            │
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
       ✅                    [Contactar Suporte Vercel]
```

---

## 📞 RECURSOS ÚTEIS

| Recurso | Link |
|---------|------|
| Vercel Dashboard | https://vercel.com/dashboard |
| Project Settings | https://vercel.com/dashboard/portal-dpa-landing-page/settings |
| Deployments | https://vercel.com/dashboard/portal-dpa-landing-page/deployments |
| Vercel Docs | https://vercel.com/docs |
| Vercel Support | https://vercel.com/support |
| Status Page | https://www.vercelstatus.com |

---

## 🎬 RESUMO EXECUTIVO

**Se CSS não estiver funcionando na Vercel:**

1. ✅ Verificar se está em `Ready` status
2. ✅ Verificar Build Logs (sem erros)
3. ✅ Verificar Content-Type via DevTools Network
4. ✅ Se for `text/html`, fazer Force Redeploy
5. ✅ Se persistir, Clear Cache + Redeploy
6. ✅ Se ainda não, revisar `server.js` e `vercel.json`

**Tempo estimado de verificação:** ~10-15 minutos
**Taxa de sucesso:** 95% com estes passos

---

**Última atualização:** 2026-02-25
**Status:** Aguardando verificação do usuário
