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
  generate-posts-index.mjs → gera posts.json
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

## Scripts utilitários

### `generate:posts`

Lê todos os arquivos `.md` de `public/posts/`, extrai o frontmatter e gera `public/posts/posts.json` com a lista ordenada por data (mais recente primeiro). Também gera o `public/sitemap.xml`.

Roda automaticamente no `build` e no `dev`. Para rodar manualmente:

```bash
npm run generate:posts
```

---

### `delete:post`

Remove um post pelo slug: apaga o arquivo `.md` de `public/posts/` e remove a entrada correspondente do `posts.json`.

```bash
npm run delete:post -- <slug>
```

**Entrada esperada:** o slug exato do post, no formato `yyyy-mm-dd-titulo-do-post` — o mesmo valor preenchido no campo Slug do Decap CMS e usado na URL do post.

**Exemplos:**

```bash
# Remove o post com slug 2026-03-22-meu-post
npm run delete:post -- 2026-03-22-meu-post
```

> Após deletar, faça commit das alterações e abra um PR para `main` para que o post saia do ar em produção.
