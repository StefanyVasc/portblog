# SVS — Portfólio

Site pessoal da Stefany Sá: [stefany-sa.com.br](https://stefany-sa.com.br)

---

## Ambiente

- Node.js `20+`
- npm `10+`

Para alinhar o ambiente local com o projeto:

```bash
nvm use
```

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

---

## Blog — Fluxo de publicação de posts

Posts são escritos via **Decap CMS** e as imagens ficam no **Cloudinary**.

### Diagrama

```
  Acessa /admin (Netlify Identity)
           │
           ▼
    Decap CMS Editor
           │
    escreve o post em markdown
    insere imagens → upload direto pro Cloudinary
           │
           ▼
  Cloudinary armazena a imagem
  URL gerada: https://res.cloudinary.com/stevasc/...
           │
           ▼
  Decap salva o .md em public/posts/
  (commit automático via git-gateway no GitHub)
           │
           ▼
  Netlify detecta o commit → roda build
  scripts/posts/index.mjs generate → gera posts.json
           │
           ▼
  Site em produção atualizado
```

### Passo a passo

#### 1. Acessar o painel

```
https://stefany-sa.com.br/admin
```

Autenticação via Netlify Identity.

#### 2. Criar um novo post

- Clique em **New Blog Posts**
- Preencha os campos:
  - **Slug**: `yyyy-mm-dd-titulo-do-post` (ex: `2026-03-22-meu-post`)
  - **Title**: título do post
  - **Description**: resumo exibido na listagem
  - **Publish Date**: data de publicação
  - **Tags**: categorias do post
  - **Body**: conteúdo em markdown

#### 3. Inserir imagens

Clique no ícone de imagem no editor — o media picker do **Cloudinary** abre automaticamente. Faça o upload e a URL `https://res.cloudinary.com/stevasc/...` é inserida no markdown.

Nenhuma imagem é salva no repositório.

#### 4. Publicar

- **Save** salva como rascunho (editorial workflow)
- **Publish** cria o commit no GitHub e dispara o deploy no Netlify

### Convenção do slug

O slug é usado como nome do arquivo `.md` e como rota do post:

| Slug no formulário    | Arquivo gerado                        | URL do post                 |
| --------------------- | ------------------------------------- | --------------------------- |
| `2026-03-22-meu-post` | `public/posts/2026-03-22-meu-post.md` | `/blog/2026-03-22-meu-post` |

> Use sempre o formato `yyyy-mm-dd-titulo-em-minusculas` com hífens.

---

## CLI

CLI interativo para operações de git, blog, qualidade de código e execução da aplicação. Todas as telas têm as opções `Voltar` e `Sair`.

```bash
npm run cli
```

**Menu principal:**

```
O que você quer fazer?
  Git tools
  Post blog
  Qualidade de código
  App (dev, build, preview)
```

| Seção               | O que faz                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Git tools           | Criar branch a partir da `main`, remover branches selecionadas ou limpar todas as branches locais |
| Post blog           | Gerar `posts.json` + `sitemap.xml` e deletar post por slug                                        |
| Qualidade de código | Rodar `lint`, `lint:fix`, `format`, `format:check`, `typecheck` ou uma checagem completa          |
| App                 | Rodar `dev`, `build` e `preview` pelo mesmo fluxo do CLI                                          |

**Git tools:**

| Opção                              | O que faz                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Criar nova branch a partir da main | Atualiza a `main` local, faz stash automático se houver mudanças pendentes, cria a branch pelo nome informado e restaura o stash |
| Remover branches selecionadas      | Lista branches locais (exceto `main`) via multiselect e remove após confirmação                                                  |
| Remover todas as branches locais   | Remove todas as branches locais (exceto `main`) após confirmação                                                                 |

**Post blog:**

| Opção                  | O que faz                                                                     |
| ---------------------- | ----------------------------------------------------------------------------- |
| Gerar índice de posts  | Roda `scripts/posts/index.mjs generate` — recria `posts.json` e `sitemap.xml` |
| Deletar post pelo slug | Pede o slug, confirma e remove o `.md` + entrada do `posts.json`              |

**Qualidade de código:**

| Opção                        | O que faz                                                 |
| ---------------------------- | --------------------------------------------------------- |
| Rodar checagem completa      | Executa `lint`, `format:check` e `typecheck` em sequência |
| Lint                         | Executa `eslint . --max-warnings=0`                       |
| Lint com correção automática | Executa `eslint . --fix`                                  |
| Formatar arquivos            | Executa `prettier --write .`                              |
| Verificar formatação         | Executa `prettier --check .`                              |
| Typecheck                    | Executa `tsc --noEmit`                                    |

**App:**

| Opção   | O que faz                 |
| ------- | ------------------------- |
| Dev     | Executa `npm run dev`     |
| Build   | Executa `npm run build`   |
| Preview | Executa `npm run preview` |

## Scripts npm principais

As rotinas de posts ficam centralizadas em `scripts/posts/index.mjs`, com subcomandos `generate` e `delete`. O CLI usa essas funções internamente, e `dev`/`build` também passam por esse entrypoint.

| Script                 | O que faz                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Gera o índice de posts e sobe o Vite em modo de desenvolvimento  |
| `npm run build`        | Gera o índice de posts, roda `tsc -b` e cria o build de produção |
| `npm run preview`      | Abre o preview do build                                          |
| `npm run lint`         | Roda o ESLint                                                    |
| `npm run lint:fix`     | Roda o ESLint com correção automática                            |
| `npm run format`       | Formata os arquivos com Prettier                                 |
| `npm run format:check` | Verifica a formatação com Prettier                               |
| `npm run typecheck`    | Executa a checagem de tipos do TypeScript                        |
