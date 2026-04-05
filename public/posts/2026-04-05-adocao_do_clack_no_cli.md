---
slug: 2026-04-05-adocao_do_clack_no_cli
title: 'Adotando Clack para construir um CLI mais organizado'
description: 'Como estruturar um CLI com @clack/prompts, separar responsabilidades, melhorar a navegação e estilizar melhor a saída no terminal.'
date: '2026-04-05'
tags:
  - cli
  - nodejs
  - developer-experience
  - tooling
---

# Adotando Clack para construir um CLI mais organizado

Quando um projeto começa a acumular scripts utilitários, chega uma hora em que rodar tudo direto no terminal deixa de ser confortável. Foi exatamente aí que fez sentido adotar o **Clack** para construir um CLI interativo, com menus claros, navegação simples e uma experiência mais consistente para tarefas do dia a dia.

Neste post vou mostrar como estruturar esse tipo de fluxo, quais decisões ajudam a manter o CLI escalável e o que vale observar para que ele continue simples de usar mesmo quando cresce.

---

## Motivação para ter um CLI no projeto

Nem todo projeto precisa de um CLI. Mas quando começam a aparecer tarefas recorrentes, operacionais e fáceis de errar, ele deixa de ser luxo e vira uma camada útil de organização.

Alguns sinais de que isso já está fazendo sentido:

- existem comandos que ninguém lembra de cabeça
- o time depende de anotações no README para tarefas frequentes
- certas operações exigem confirmação e cuidado extra
- o projeto começa a misturar automação de git, build, qualidade e conteúdo
- tarefas simples passam a ter vários passos manuais

Um CLI ajuda justamente a transformar esse conjunto de comandos espalhados em um fluxo mais guiado.

Em vez de depender de memória, a pessoa entra no menu, escolhe o contexto certo e executa a ação com menos atrito. Em vez de confiar que todo mundo vai lembrar a ordem exata dos passos, o próprio projeto passa a oferecer esse caminho.

Na prática, isso melhora algumas coisas importantes:

- reduz erro operacional
- facilita onboarding
- deixa tarefas internas mais descobertas
- padroniza execução de fluxos repetitivos
- melhora a experiência de desenvolvimento

No nosso caso, isso fez sentido porque já existiam tarefas de:

- criar e limpar branches
- gerar índice de posts
- deletar posts
- rodar lint, format e typecheck
- executar dev, build e preview

Tudo isso separado ainda funcionava. Mas concentrado em um CLI ficou mais fácil de usar, mais claro de manter e mais consistente para quem está trabalhando no projeto.

---

## Por que usar Clack

O `@clack/prompts` resolve bem um problema muito específico: criar interações de terminal com uma API pequena, legível e sem muito atrito.

No lugar de decorar comandos espalhados, dá para oferecer um fluxo como este:

- **Git tools**
- **Post blog**
- **Qualidade de código**
- **App**

Isso reduz erro operacional, melhora descoberta de funcionalidades e torna o projeto mais amigável para quem não quer depender de memória para lembrar cada comando.

Além disso, o Clack já entrega componentes úteis para esse tipo de interface:

- `select` para menus
- `text` para entrada de valores
- `confirm` para ações destrutivas
- `multiselect` para seleção múltipla
- `spinner` para feedback de execução

<img
  src="https://res.cloudinary.com/stevasc/image/upload/v1775414075/wthtxdmqhx1f0wmbkckp.png"
  alt="Visão geral de uma tela do CLI construída com Clack"
  width="900"
/>

_Exemplo de uma das telas do CLI com organização por contexto e navegação em menu._

---

## Instalação

Se você ainda não usa Clack no projeto:

```bash
npm install -D @clack/prompts
```

Depois disso, já dá para criar um ponto de entrada simples:

```js
import { intro, outro, select } from '@clack/prompts'

async function main() {
  intro('meu cli')

  const action = await select({
    message: 'O que você quer fazer?',
    options: [
      { value: 'lint', label: 'Rodar lint' },
      { value: 'build', label: 'Rodar build' }
    ]
  })

  outro(`Ação escolhida: ${action}`)
}

main()
```

Esse é o ponto de partida. O ganho real começa quando a estrutura do CLI deixa de ficar toda concentrada em um único arquivo.

---

## Separe o CLI por responsabilidade

Um erro comum é deixar tudo em `cli.mjs`: menus, execução de comandos, regras de navegação, mensagens e lógica de domínio.

Funciona no começo, mas degrada rápido.

Uma estrutura melhor é dividir assim:

```txt
scripts/
  cli.mjs
  cli/
    core.mjs
    process.mjs
    git.mjs
    post.mjs
    quality.mjs
    app.mjs
  posts/
    index.mjs
```

Com essa separação:

- `cli.mjs` vira só o ponto de entrada
- `core.mjs` concentra navegação, ações globais e utilitários visuais
- `process.mjs` cuida da execução de comandos
- cada arquivo de seção cuida apenas do próprio menu
- regras de domínio ficam fora do CLI quando fizer sentido

Isso é importante porque o CLI não deve carregar toda a lógica de negócio sozinho. Ele deve **orquestrar**, não **concentrar tudo**.

---

## Agrupe ações por contexto

Em vez de listar dez opções no menu principal, vale agrupar por intenção.

Exemplo:

- **Git**: criar branch, limpar branches
- **Posts**: gerar índice, deletar post
- **Qualidade**: lint, format, typecheck
- **App**: dev, build, preview

Essa organização melhora a leitura e reduz a chance de menus longos demais. Quando a pessoa entra em `Qualidade de código`, ela já está no contexto certo e encontra só o que espera ver.

Também ajuda a manter a implementação mais limpa:

```js
if (section === 'git') await gitMenu()
if (section === 'post') await postMenu()
if (section === 'quality') await qualityMenu()
if (section === 'app') await appMenu()
```

---

## Sempre tenha Voltar e Sair

Esse ponto faz muita diferença na usabilidade.

Quando o CLI tem múltiplas camadas de menu, a navegação precisa ser previsível. Se a pessoa cancela uma ação e o processo inteiro fecha, a experiência fica ruim muito rápido.

O ideal é padronizar duas ações globais:

- **Voltar**
- **Sair**

Isso pode ser centralizado em um helper para todos os menus:

```js
const ACTION_BACK = '__back'
const ACTION_EXIT = '__exit'

function withNavOptions(options, includeBack = false) {
  const items = [...options]

  if (includeBack) {
    items.push({ value: ACTION_BACK, label: 'Voltar' })
  }

  items.push({ value: ACTION_EXIT, label: 'Sair' })
  return items
}
```

Esse tipo de detalhe evita repetição e deixa todos os menus do CLI com o mesmo comportamento.

<img
  src="https://res.cloudinary.com/stevasc/image/upload/v1775414076/vtpgbnf3ahm9g2av0yty.png"
  alt="Exemplo de menu com opções agrupadas e ações de voltar e sair"
  width="900"
/>

_Uma tela de submenu mostrando o agrupamento das ações e a presença de `Voltar` e `Sair`._

---

## Tenha cuidado com ações destrutivas

Sempre que existir alguma operação destrutiva, use `confirm`.

Exemplos:

- deletar um post
- remover branches
- limpar múltiplos itens

Isso vale especialmente quando o CLI passa a concentrar tarefas operacionais do projeto.

```js
const ok = await confirm({
  message: `Deletar o post "${slug}"?`
})

if (!ok) {
  return
}
```

O objetivo aqui não é deixar o fluxo mais lento. É reduzir erro humano.

---

## Dê feedback visual durante a execução

Rodar um comando e não mostrar nada é ruim. Rodar e mostrar uma mensagem genérica demais também.

O ideal é combinar:

- **spinner** durante a ação
- **mensagem de sucesso** ao final
- **mensagem de erro** com contexto quando falhar

Exemplo:

```js
const s = spinner()
s.start('Gerando índice de posts...')
await generatePostsIndex()
s.stop('Índice gerado.')
```

Esse retorno é simples, mas ajuda muito a pessoa a entender o estado atual do CLI.

---

## Estilize a saída para destacar verbos importantes

Uma coisa que melhora bastante a experiência é destacar os verbos principais:

- **Executando**
- **Concluído**
- **Falhou**
- **Gerando**
- **Deletando**
- **Atualizando**

No nosso caso, isso pode ser feito com códigos ANSI sem depender de outra biblioteca:

```js
const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m'
}

function paint(text, ...styles) {
  return `${styles.join('')}${text}${ANSI.reset}`
}

function formatAction(verb, tone) {
  return paint(verb, ANSI.bold, ANSI[tone])
}
```

A partir daí, a saída pode ficar mais clara:

```txt
🚀 Executando lint com correção...
✅ Concluído lint com correção com sucesso.
```

Esse tipo de refinamento parece pequeno, mas melhora muito a leitura no terminal, principalmente quando há vários passos em sequência.

Se quiser respeitar ambientes sem cor, vale considerar a variável `NO_COLOR`.

<img
  src="https://res.cloudinary.com/stevasc/image/upload/v1775414076/lgn1kqpw8tpwvwx20zek.png"
  alt="Saída do terminal com mensagens de execução e sucesso destacadas"
  width="900"
/>

_A saída do terminal fica mais clara quando verbos como `Executando` e `Concluído` recebem destaque visual._

---

## Padronize execução de scripts

Outro ponto importante é não espalhar a execução de comandos pelo projeto inteiro.

Criar um helper para rodar scripts npm ou comandos do sistema ajuda a centralizar:

- tratamento de erro
- mensagens de início e sucesso
- hints de correção
- formatação da saída

Exemplo:

```js
await runNpmScript({
  script: 'format:check',
  label: 'verificação de formatação',
  failureMessage:
    '❌ A verificação de formatação encontrou arquivos fora do padrão.',
  hint: 'Use a opção "Formatar arquivos" para aplicar o Prettier e tente novamente.'
})
```

Isso é melhor do que soltar `spawnSync` em vários lugares com tratamento diferente em cada arquivo.

---

## O CLI não precisa substituir tudo

Ter um CLI não significa remover todos os scripts do `package.json`.

Os scripts principais continuam úteis para:

- `dev`
- `build`
- `preview`
- `lint`
- `format`
- `typecheck`

O CLI entra como uma camada de experiência por cima desses fluxos, não necessariamente como substituto absoluto.

O que faz sentido remover são scripts redundantes ou muito específicos, quando eles passam a existir melhor organizados dentro do próprio CLI ou de um entrypoint único de domínio.

---

## O que eu considero mais importante nesse tipo de implementação

- Não deixar tudo em um único arquivo.
- Separar interface, execução de processo e lógica de domínio.
- Manter `Voltar` e `Sair` em todos os menus.
- Confirmar ações destrutivas.
- Dar feedback visual durante execução.
- Padronizar mensagens de sucesso e erro.
- Melhorar a legibilidade da saída com verbos destacados.
- Agrupar funcionalidades por contexto, e não por ordem aleatória.

Se esses pontos forem respeitados, o CLI continua simples mesmo depois de crescer.

---

## Conclusão

Adotar o Clack foi uma forma prática de transformar scripts soltos em uma interface mais organizada para o terminal. O maior ganho não está só nos prompts bonitos, mas principalmente em como isso força uma estrutura melhor: menus por contexto, helpers reutilizáveis, feedback consistente e menos atrito para executar tarefas do projeto.

Se você já tem scripts utilitários espalhados, vale muito considerar esse passo. Um CLI pequeno, bem organizado e com navegação previsível pode melhorar bastante a experiência de desenvolvimento sem adicionar complexidade desnecessária.
