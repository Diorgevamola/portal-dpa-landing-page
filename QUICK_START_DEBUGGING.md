# Quick Start Debugging Guide — Portal DPA MIME Type Error

**Problema:** CSS não carrega na Vercel (MIME type: text/html ao invés de text/css)

**Status:** Funciona em localhost, não funciona em produção

---

## 🚀 SOLUÇÃO RÁPIDA (5 MINUTOS)

### Passo 1: Fazer Force Redeploy
```
1. Ir para: https://vercel.com/dashboard
2. Clicar em: portal-dpa-landing-page
3. Aba: Deployments
4. Clicar no deploy mais recente
5. Clicar em "..." (3 pontos)
6. Selecionar: "Redeploy"
7. Aguardar ~2-3 minutos
```

**Resultado esperado:** CSS deve carregar corretamente

---

## 🔧 SE REDEPLOY NÃO RESOLVER

### Passo 2: Clear Build Cache + Redeploy
```
1. Ir para: Settings (engrenagem 🔧)
2. Aba: Deployment
3. Scroll down até encontrar "Clear Build Cache"
4. Clicar no botão
5. Aguardar confirmação
6. Clicar em "Redeploy"
```

---

## 🧪 SE AINDA NÃO FUNCIONAR

### Passo 3: Executar Teste Local
```bash
cd C:\Users\diorg\portal-dpa-standalone

# Teste MIME types
node test-mime-types.js
```

**Resultado esperado:**
```
✅ Passed: 5
❌ Failed: 0
✅ All MIME types are correct!
```

**Se falhar localmente:**
- [ ] Revisar `server.js` (setHeaders middleware)
- [ ] Revisar `vercel.json` (headers configuration)
- [ ] Reiniciar servidor local

---

## 📋 CHECKLIST DETALHADO

### A. Verificações Vercel Dashboard

**Settings > General:**
- [ ] Project Name: `portal-dpa-landing-page`
- [ ] Framework: `Other`
- [ ] Git: `GitHub` / `Diorgevamola/portal-dpa-landing-page`

**Settings > Build & Development:**
- [ ] Build Command: `npm run build || true`
- [ ] Output Directory: (vazio)
- [ ] Install Command: `npm install`

**Settings > Deployment:**
- [ ] Deploy on Git Push: **ON**
- [ ] Ignore Build Step: **OFF** (desabilitado)
- [ ] Production Branch: `main`

**Settings > Environment Variables:**
- [ ] NODE_ENV: `production` (Production, Preview, Dev)

**Settings > Functions:**
- [ ] Nenhuma função conflitante

---

### B. Verificações de Deploy

**Deployments > Último Deploy:**
- [ ] Status: ✅ **Ready**
- [ ] Build Logs: sem erros (✅ "npm install", ✅ "npm run build")
- [ ] Tempo: ~30-60 segundos

---

### C. Verificações no Navegador

**DevTools (F12):**
- [ ] Console: Sem erro "Refused to apply style"
- [ ] Network > styles.css:
  - [ ] Status: **200 OK**
  - [ ] Content-Type: **text/css; charset=utf-8**
  - [ ] Size: ~50 KB

**Renderização Visual:**
- [ ] Fundo preto
- [ ] Texto branco
- [ ] Botões dourados
- [ ] Fonts carregadas (Oswald)

---

## 📊 COMPARAÇÃO: Localhost vs Vercel

| Aspecto | Localhost | Vercel |
|---------|-----------|--------|
| URL | `http://localhost:6000` | `https://portal-dpa-landing-page.vercel.app` |
| Servidor | Node.js Express | Vercel Functions + CDN |
| CSS Mimetype | `text/css` ✅ | `text/html` ❌ (antes do fix) |
| Arquivo server.js | ✅ Ativo | ✅ Usado por Vercel |
| vercel.json | Ignorado | ✅ Processado por Vercel |

---

## 🎯 CAUSA RAIZ

**Por que funciona em localhost mas não em Vercel?**

1. **Localhost:** Express server configurado com `setHeaders` middleware
   ```javascript
   res.setHeader('Content-Type', 'text/css; charset=utf-8')
   ```

2. **Vercel:** Precisa de:
   - ✅ `server.js` com setHeaders (para função Vercel)
   - ✅ `vercel.json` com headers (para CDN/Edge)
   - ✅ Redeploy completo (cache invalidation)

**Solução aplicada:**
- ✅ Atualizado `server.js` com middleware MIME type
- ✅ Atualizado `vercel.json` com headers explícitos
- ✅ Commit v1.0.3 enviado para GitHub
- ⏳ Aguardando redeploy na Vercel

---

## 🔍 DIAGNOSTICAR VIA VERCEL CLI

Se preferir usar terminal:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Ir para o projeto
cd C:\Users\diorg\portal-dpa-standalone

# Ver status
vercel status

# Ver logs
vercel logs --follow

# Redeployar
vercel --prod --force
```

---

## 🆘 ESCALAÇÃO: Se nada funcionar

### Contactar Suporte Vercel

1. Ir para: https://vercel.com/support
2. Fornecer:
   - [ ] URL do projeto: `portal-dpa-landing-page`
   - [ ] Erro específico: "Refused to apply style... MIME type ('text/html')"
   - [ ] Screenshot do DevTools Network
   - [ ] Link para commit: `5a9243d`
   - [ ] Verificar se Vercel está com problemas: https://www.vercelstatus.com

### Opção Alternativa: Redeploy Manual

```bash
# Limpar cache local
rm -rf .vercel

# Redeployar
vercel deploy --prod
```

---

## 📚 DOCUMENTAÇÃO CRIADA

Para referência futura, foram criados:

| Arquivo | Descrição |
|---------|-----------|
| `VERCEL_CHECKLIST.md` | Lista completa de 11 fases de verificação |
| `VERCEL_VISUAL_GUIDE.md` | Guia visual com screenshots e fluxogramas |
| `test-mime-types.js` | Script para testar MIME types |
| `QUICK_START_DEBUGGING.md` | Este documento |

---

## ✅ CHECKLIST FINAL

Antes de considerar resolvido:

- [ ] Deploy v1.0.3 está em status **Ready** na Vercel
- [ ] Abri o site em navegador novo (incógnito)
- [ ] Abri DevTools (F12) > Console (sem erros de MIME)
- [ ] Aba Network > styles.css tem Content-Type: **text/css**
- [ ] Página renderiza com cores, fontes e layout corretos
- [ ] Teste responsivo (mobile, tablet, desktop) funciona

---

## 📞 PRÓXIMOS PASSOS

### ✅ Se Funcionar:
```
Celebrar! 🎉
Versão v1.0.3 está pronta para produção
```

### ❌ Se Não Funcionar:
```
1. Executar: node test-mime-types.js
2. Documentar resultado
3. Revisar VERCEL_CHECKLIST.md
4. Contactar suporte se necessário
```

---

## 🔗 LINKS ÚTEIS

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Project Repository](https://github.com/Diorgevamola/portal-dpa-landing-page)
- [Live Site](https://portal-dpa-landing-page.vercel.app)

---

## 📝 NOTAS TÉCNICAS

**O que foi alterado em v1.0.3:**

```javascript
// server.js - Middleware para MIME types
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    // ... mais tipos
  }
}));
```

```json
// vercel.json - Headers para Vercel
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

**Última atualização:** 2026-02-25
**Versão:** v1.0.3
**Status:** Aguardando verificação do usuário
**Tempo estimado:** 5-15 minutos para resolver
