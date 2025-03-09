# 🎨 Adicionando Code Highlight ao Blog em Markdown

Ao criar um blog técnico, é essencial exibir código com **destaque de sintaxe** para facilitar a leitura e a compreensão. Neste post, vou mostrar como adicionei **Code Highlight** ao meu blog Markdown.

## 🚀 **Passo 1: Instalando as Dependências**

Para renderizar o Markdown e adicionar o Code Highlight, utilizei o `react-markdown` e o `rehype-highlight`.

### 📦 Instale as dependências:

```sh
npm install react-markdown rehype-highlight rehype-raw
```

- **`react-markdown`** → Renderiza Markdown no React
- **`rehype-highlight`** → Adiciona **destaque de sintaxe** ao código
- **`rehype-raw`** → Permite renderizar **HTML dentro do Markdown**

---

## 📝 **Passo 2: Criando o Componente de Markdown**

Agora, criei um componente **MarkdownRenderer.tsx** para exibir os posts com **Code Highlight**.

```tsx
import '@/styles/markdown.css'
import 'highlight.js/styles/github-dark.css' // Tema do Highlight.js

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="markdown-content prose dark:prose-invert mx-auto">
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
```

- **`rehypePlugins={[rehypeRaw, rehypeHighlight]}`** → Adiciona suporte para código no Markdown com destaque de sintaxe.
- **`highlight.js/styles/github-dark.css`** → Aplica um tema escuro ao código.

Aqui está a **Lista de Temas do Highlight.js** 🎨:

| 🎨 Tema             | Importação no código                               | Preview |
| ------------------- | -------------------------------------------------- | ------- |
| **GitHub Dark**     | `import 'highlight.js/styles/github-dark.css'`     | 🖤 🌙   |
| **GitHub Light**    | `import 'highlight.js/styles/github.css'`          | 🤍 ☀️   |
| **Dracula**         | `import 'highlight.js/styles/dracula.css'`         | 🦇      |
| **Monokai**         | `import 'highlight.js/styles/monokai.css'`         | 🟢      |
| **Atom One Dark**   | `import 'highlight.js/styles/atom-one-dark.css'`   | 💙      |
| **Nord**            | `import 'highlight.js/styles/nord.css'`            | ❄️      |
| **Solarized Light** | `import 'highlight.js/styles/solarized-light.css'` | 🌞      |
| **Solarized Dark**  | `import 'highlight.js/styles/solarized-dark.css'`  | 🌚      |

Para trocar o tema, basta **importar um deles no seu arquivo** `MarkdownRenderer.tsx`:

```tsx
import 'highlight.js/styles/dracula.css' // Muda para o tema Dracula 🎭
```

Agora você pode testar e escolher o tema que mais combina com o seu blog! 🚀🔥

---

## 🎨 **Passo 3: Estilizando o Markdown**

Para garantir que o código fique bem formatado, adicionei algumas regras CSS no arquivo **markdown.css**.

```css
/* Estilizando o código no Markdown */
.markdown-content pre {
  background: #1e1e1e; /* Fundo escuro */
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

/* Código dentro do bloco */
.markdown-content code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #f8f8f2;
}
```

Agora, os blocos de código têm um **fundo escuro, bordas arredondadas e uma fonte monoespaçada**.

---

## 🛠 **Passo 4: Testando no Markdown**

Agora posso escrever **código no Markdown** e ele será destacado corretamente! 🚀

````md
# Exemplo de Código

```tsx
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert mx-auto">
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
```
````

```

✅ Agora, ao renderizar este Markdown, **o código terá destaque de sintaxe automaticamente**!

---

## 🎯 **Conclusão**

Agora, meu blog **suporta Code Highlight nativamente**! Com apenas algumas dependências e um pequeno ajuste no CSS, é possível destacar código automaticamente nos posts escritos em Markdown. ✨

Se você também está criando um blog técnico, espero que este post tenha ajudado! 🚀🔥

---

📌 **Próximo post:** Como criar um sistema de categorias para os posts do blog!

```

---

## **🚀 Agora está pronto!**

- **✅ Markdown formatado corretamente**
- **✅ Code Highlight funcional**
- **✅ CSS aplicado ao código**
- **✅ Pronto para ser publicado no blog!**
