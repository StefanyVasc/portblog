# SVS — Portfólio

Site pessoal da Stefany Sá: [stefany-sa.com.br](https://stefany-sa.com.br)

---

## Fluxo de CI/CD

### Diagrama

```
          ┌──────────────────────────────┐
          │            main              │  ← produção (Netlify deploy)
          └──────────────┬───────────────┘
                         │
               cria branch a partir de main
                         │
                         ▼
                 ┌───────────────┐
                 │      dev      │  ← branch de trabalho
                 └───────┬───────┘
                         │
                  abre PR para main
                         │
                         ▼
          ┌──────────────────────────────┐
          │  CI roda automaticamente     │
          │  lint · typecheck · tests    │
          │  build                       │
          └──────────────┬───────────────┘
                         │
              merge após checks passarem
                         │
                         ▼
          ┌──────────────────────────────┐
          │       Netlify deploy         │  ← deploy automático em produção
          └──────────────────────────────┘
```

---

### Passo a passo

#### 1. Atualizar `main` local

```bash
git checkout main
git pull origin main
```

#### 2. Criar branch `dev`

```bash
git checkout -b dev
```

#### 3. Desenvolver e abrir PR para `main`

Ao abrir o PR, o CI roda automaticamente:

- **Lint** — verifica padrões de código
- **Typecheck** — valida tipos TypeScript
- **Tests** — executa a suíte de testes
- **Build** — garante que o projeto compila

Mergear apenas após todos os checks passarem.

#### 4. Merge na `main` → deploy

O Netlify detecta o merge e faz o deploy automaticamente em produção.

---

### Branches

| Branch | Finalidade                                                                     |
| ------ | ------------------------------------------------------------------------------ |
| `main` | Produção. Netlify faz deploy a partir dela.                                    |
| `dev`  | Branch de trabalho. Criada a partir de `main`, PR aberto de volta para `main`. |

---

### Regra principal

> Nunca commite direto na `main`. Sempre crie uma branch `dev`, abra PR e aguarde o CI passar.
