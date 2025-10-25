## Decap CMS + Netlify

Passos para usar o painel `/admin` em produção.

### 1. Build e deploy

- Suba o repositório para a Netlify e configure o build com `NPM_VERSION` (opcional), comando `npm run build` e diretório de publicação `dist`.
- Confirme que o arquivo `public/_redirects` foi publicado (garante que `/admin` sirva o painel).

### 2. Variáveis de ambiente (opcionais)

- Crie os mesmos valores usados no `.env` local (`VITE_GITHUB_API_URL`, `VITE_GITHUB_GRAPHQL_URL`, `VITE_UTTERANCES_*`). **Não salve tokens pessoais (`VITE_GITHUB_TOKEN`) na Netlify** – essa API é apenas para o fetch de projetos e pode ser omitida em produção ou trocada por token de curtíssima duração.
- O Decap usa somente Git Gateway, portanto não precisa de novas env vars.

### 3. Netlify Identity

1. No dashboard da Netlify, vá em **Site configuration → Identity → Enable Identity**.
2. Ajuste:
   - **Registration**: Recommended `Invite only`.
   - **External providers** (se quiser login via GitHub/Google).
   - Opção **Git Gateway** ativada (botão “Enable Git Gateway”).
3. Ainda na aba Identity, convide os usuários que vão editar conteúdo. Eles recebem um link para criar senha.

### 4. Git Gateway

- Dentro de **Identity → Services → Git Gateway**, clique em “Enable Git Gateway”.
- Autorize o acesso do Netlify ao repositório do GitHub (seguindo o fluxo OAuth).
- Confirme que o branch padrão apontado lá é `main`.

### 5. Testes do CMS

1. Acesse `https://<seu-site>.netlify.app/admin`.
2. Faça login com o usuário configurado no Identity.
3. Crie um post de teste:
   - O workflow vai criar um draft; ao clicar em “Ready → Publish” a Netlify abre um PR/commit no repositório.
   - Certifique-se de que o arquivo Markdown e os JSONs são atualizados após o merge.
4. Rode o build novamente e valide se o novo post aparece em `/blog`.

### 6. Uso local com workflow editorial

- Mantenha `npm run dev` aberto.
- Em outro terminal execute `npx decap-server --publish-mode editorial_workflow`.
- Abra `http://localhost:5173/admin/index.html`; agora o CMS usa o proxy e permite o processo completo de revisão.

### 7. Boas práticas

- Guarde os tokens pessoais apenas em `.env` local e evite commitar esse arquivo.
- Se precisar revogar acessos, faça pelo GitHub (tokens) e pela Netlify (Identity users).
- Quando quiser personalizar previews, crie um entrypoint em `src/admin` e importe `decap-cms-app` no Vite.
