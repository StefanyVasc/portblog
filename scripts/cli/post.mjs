import { confirm, isCancel, spinner, text } from '@clack/prompts'

import { formatAction, printMessage, runMenu } from './core.mjs'
import { deletePostBySlug, generatePostsIndex } from '../posts/index.mjs'

async function generatePosts() {
  const s = spinner()
  s.start(`${formatAction('Gerando')} índice de posts...`)
  await generatePostsIndex()
  s.stop(`${formatAction('Gerado', 'green')} índice de posts.`)
  printMessage('posts.json e sitemap.xml atualizados.')
}

async function deletePost() {
  const slug = await text({
    message: 'Slug do post para deletar:',
    placeholder: '2026-03-22-meu-post',
    validate: value => (value.trim() ? undefined : 'Slug não pode ser vazio.')
  })

  if (isCancel(slug)) {
    return
  }

  const ok = await confirm({ message: `Deletar o post "${slug}"?` })

  if (isCancel(ok) || !ok) {
    return
  }

  const s = spinner()
  s.start(`${formatAction('Deletando')} post...`)
  await deletePostBySlug(slug)
  s.stop(`${formatAction('Deletado', 'green')} post.`)
  printMessage(`Post "${slug}" removido. Faça commit e abra um PR.`)
}

export async function postMenu() {
  await runMenu({
    message: 'Post blog — o que você quer fazer?',
    includeBack: true,
    options: [
      {
        value: 'generate',
        label: 'Gerar índice de posts (posts.json + sitemap)'
      },
      { value: 'delete', label: 'Deletar post pelo slug' }
    ],
    onSelect: async action => {
      if (action === 'generate') await generatePosts()
      if (action === 'delete') await deletePost()
    }
  })
}
