# Vercel Configuration Checklist — Portal DPA Landing Page

**Objetivo:** Diagnosticar e resolver problema de MIME type no CSS em produção

---

## 🔧 FASE 1: Project Settings (Vercel Dashboard)

### 1.1 Acessa Project Settings
- [ ] Ir para: https://vercel.com/dashboard
- [ ] Selecionar projeto: `portal-dpa-landing-page`
- [ ] Clicar em **Settings** (engrenagem no topo)

### 1.2 Verificar General Settings
- [ ] **Project Name:** `portal-dpa-landing-page` ✓
- [ ] **Framework Preset:** `Other` (não é Next.js/React)
- [ ] **Git Integration:** `GitHub` ✓
- [ ] **Repository:** `Diorgevamola/portal-dpa-landing-page` ✓

---

## 🏗️ FASE 2: Build & Development Settings

### 2.1 Build Settings
**Path:** Settings > Build & Development

- [ ] **Build Command:** `npm run build || true`
  - ⚠️ Se estiver diferente, alterar para: `npm run build || true`
  - ✅ Deve ser exato (o `|| true` é importante)

- [ ] **Output Directory:** (deixar em branco ou verificar)
  - Se houver algo preenchido, tentar deixar vazio
  - Vercel deve servir raiz do repositório

- [ ] **Install Command:** `npm install`
  - ✅ Deve ser o padrão

- [ ] **Development Command:** `node server.js`
  - ⚠️ Verificar se está assim (para local testing)

### 2.2 Web Analytics
- [ ] **Web Analytics:** Desabilitar por enquanto (opcional)

---

## 🌍 FASE 3: Environment Variables

### 3.1 Verificar Variáveis Existentes
**Path:** Settings > Environment Variables

Atualmente configuradas:
- [ ] `NODE_ENV` = `production`

### 3.2 Adicionar/Verificar Variáveis Necessárias
Se não estiverem presentes, ADICIONAR:

```
NODE_ENV: production
```

- [ ] Aplicar a: **Production, Preview, Development**

---

## 🚀 FASE 4: Deployment Settings

### 4.1 Vercel Configurations
**Path:** Settings > Deployment

- [ ] **Framework Detected:** `Other` (OK)
- [ ] **Ignore Build Step:** ⚠️ Verificar se está habilitado
  - Se SIM, alterar para NÃO (desabilitar)

### 4.2 Auto-Deploys
- [ ] **Deploy on Git Push:** ✅ Habilitado
- [ ] **Preview Deployments:** ✅ Habilitado
- [ ] **Production Branch:** `main` ✅

---

## 📄 FASE 5: Serverless Functions

### 5.1 Verificar se há Functions conflitantes
**Path:** Settings > Functions

- [ ] Não deve haver `/api` functions criadas
- [ ] Se houver, deletar (podem estar interceptando requisições)

---

## 🔐 FASE 6: Security & Headers

### 6.1 Verificar Headers Personalizados
**Path:** Project Settings > Deployment

- [ ] Verificar se há **Headers Override** em nível de projeto
- [ ] Se houver que está sobrescrevendo Content-Type, remover

### 6.2 Security Headers
- [ ] **X-Content-Type-Options:** `nosniff` (OK, esperado)
- [ ] **X-Frame-Options:** `DENY` (OK, esperado)

---

## 🔍 FASE 7: Domain & DNS

### 7.1 Domínio Configurado
**Path:** Settings > Domains

- [ ] **Primary Domain:** `portal-dpa-landing-page.vercel.app` ✓
- [ ] **SSL/TLS:** ✅ Enabled (Vercel automático)
- [ ] **HTTPS:** ✅ Force (recomendado)

---

## 📊 FASE 8: Deployment History & Logs

### 8.1 Verificar Último Deploy
**Path:** Deployments (aba principal)

- [ ] Clicar no deploy mais recente (v1.0.3)
- [ ] Status deve ser: **✅ Ready**
- [ ] Tempo de build: verificar se foi rápido (~30s)

### 8.2 Logs de Build
- [ ] Clicar em **View Build Logs**
- [ ] Procurar por:
  - ✅ `npm install` completou sem erros
  - ✅ `npm run build` executou (deve ser rápido, só echo)
  - ✅ Nenhum erro de tipo "Command failed"
  - ✅ Deploy finalizou com sucesso

### 8.3 Logs de Runtime
- [ ] Clicar em **View Function Logs**
- [ ] Procurar por erros relacionados a:
  - Requests para `/styles.css`
  - Content-Type sendo configurado
  - Qualquer erro 404 ou 500

---

## 🌐 FASE 9: Testing no Navegador

### 9.1 Acessar a URL
- [ ] Ir para: `https://portal-dpa-landing-page.vercel.app`
- [ ] Aguardar página carregar completamente

### 9.2 Verificar Console do Navegador (F12)
- [ ] Abrir **DevTools** (F12)
- [ ] Aba **Console**
  - ❌ Não deve haver: "Refused to apply style from ... MIME type ('text/html')"
  - ✅ Deve estar limpo

- [ ] Aba **Network**
  - [ ] Clicar em `/styles.css`
  - [ ] Verificar **Response Headers:**
    ```
    Content-Type: text/css; charset=utf-8
    ```
    - ✅ Deve ser `text/css`, NÃO `text/html`
  - [ ] Status: **200 OK** ✅
  - [ ] Size: ~52 KB (ou similar)

### 9.3 Verificar CSS Aplicado
- [ ] Página tem:
  - ✅ Fundo preto (#000)
  - ✅ Texto branco
  - ✅ Botões dourados (#FFD700)
  - ✅ Fonts (Oswald)
  - ✅ Espaçamento correto
  - ✅ Layout responsivo

### 9.4 Teste Responsivo
- [ ] Redimensionar janela (ou DevTools device emulation)
- [ ] Testar breakpoints:
  - ✅ Mobile (320px-640px): layout vertical, botões full-width
  - ✅ Tablet (640px-1024px): layout 2-colunas onde apropriado
  - ✅ Desktop (1024px+): layout completo

---

## 🔧 FASE 10: Configurações Avançadas

### 10.1 Vercel CLI (Opcional - para debugging)
```bash
# Instalar se não tiver
npm install -g vercel

# Login
vercel login

# Ver status do projeto
vercel status

# Ver logs em tempo real
vercel logs https://portal-dpa-landing-page.vercel.app
```

### 10.2 Redeployment Force
Se nada acima resolver:
- [ ] Ir para **Deployments**
- [ ] Clicar em deploy recente (v1.0.3)
- [ ] Clicar em **... (3 pontos)**
- [ ] Selecionar **Redeploy**

---

## 🆘 FASE 11: Troubleshooting Avançado

### 11.1 Se MIME type ainda estiver errado

**Opção 1: Verificar vercel.json**
```bash
# No seu repo local, verificar:
cat vercel.json
```
- [ ] Deve ter seção `headers` com CSS
- [ ] Se não tiver, adicionar manualmente

**Opção 2: Remover build artifacts**
```bash
# No Vercel Dashboard
# Settings > Deployment
# Clicar em "Clear Build Cache"
# Depois "Redeploy"
```

**Opção 3: Adicionar Middleware Vercel**
Se problema persistir, criar `.vercel/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('.css')) {
    const response = NextResponse.next();
    response.headers.set('Content-Type', 'text/css; charset=utf-8');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*\\.css'],
};
```

### 11.2 Se página não carregar em absoluto

- [ ] Verificar **Domains** se está apontando corretamente
- [ ] Verificar **Build Logs** para erros de Node.js
- [ ] Verificar se `package.json` existe e está válido
- [ ] Verificar se `server.js` existe e está válido

---

## 📝 CHECKLIST RÁPIDO (Resume)

**Antes de fazer qualquer coisa, verificar:**

- [ ] GitHub repo está com último commit (5a9243d)
- [ ] `npm run build` funciona localmente
- [ ] `node server.js` funciona localmente
- [ ] CSS funciona em localhost:6000

**Na Vercel Dashboard:**

- [ ] Settings > General: projeto está configurado
- [ ] Settings > Build & Development: build command está correto
- [ ] Settings > Environment Variables: `NODE_ENV=production`
- [ ] Deployments: último deploy está **Ready** ✅
- [ ] Build Logs: sem erros
- [ ] DevTools > Network: CSS está com `Content-Type: text/css`

---

## 🎯 PRÓXIMOS PASSOS

1. **Executar checklist acima** na ordem
2. **Documentar findings** (qual etapa falhou)
3. **Se encontrar problema:** me mostrar screenshot ou log
4. **Se tudo OK:** testar novamente em navegador

---

## 📞 COMANDOS ÚTEIS

```bash
# Verificar versão do Node na Vercel
vercel env pull

# Ver logs em tempo real
vercel logs --follow

# Redeployar forçado
vercel --prod --force

# Clear cache e redeploy
vercel --prod --force --skip-domain
```

---

**Última atualização:** 2026-02-25
**Versão do projeto:** v1.0.3
**Status:** Aguardando verificação de configurações Vercel
