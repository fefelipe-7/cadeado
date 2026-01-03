# Guia de Uso dos Hooks Supabase

## useSession

Hook para gerenciar a sessão do usuário.

### Uso Básico

```typescript
import { useSession } from '@/hooks'

export function MyComponent() {
  const { session, loading, error, completeSession } = useSession()

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div>
      <p>ID da Sessão: {session?.id}</p>
      <p>Completada: {session?.completed ? 'Sim' : 'Não'}</p>
      <button onClick={completeSession}>Completar Sessão</button>
    </div>
  )
}
```

### Propriedades

- **session**: Objeto da sessão atual ou null
  - `id`: UUID da sessão
  - `created_at`: Data de criação
  - `updated_at`: Data da última atualização
  - `completed`: Boolean indicando se foi completada

- **loading**: Boolean indicando se está carregando

- **error**: String com mensagem de erro ou null

- **completeSession()**: Função para marcar a sessão como completada

---

## useLetters

Hook para gerenciar cartas da sessão.

### Uso Básico

```typescript
import { useLetters } from '@/hooks'

export function LettersComponent({ sessionId }: { sessionId: string }) {
  const { letters, loading, error, addLetter, deleteLetter, refetch } = useLetters(sessionId)

  const handleAddLetter = async () => {
    const newLetter = await addLetter('author', 'Conteúdo da minha carta...')
    if (newLetter) {
      console.log('Carta adicionada:', newLetter)
    }
  }

  const handleDeleteLetter = async (letterId: string) => {
    await deleteLetter(letterId)
  }

  if (loading) return <div>Carregando cartas...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div>
      <h2>Cartas ({letters.length})</h2>
      {letters.map((letter) => (
        <div key={letter.id}>
          <p>Autor: {letter.author === 'author' ? 'Minha' : 'Sua'}</p>
          <p>{letter.content}</p>
          <button onClick={() => handleDeleteLetter(letter.id)}>Deletar</button>
        </div>
      ))}
      <button onClick={handleAddLetter}>Adicionar Carta</button>
    </div>
  )
}
```

### Propriedades

- **letters**: Array de cartas
  - `id`: UUID da carta
  - `session_id`: UUID da sessão
  - `author`: 'author' ou 'recipient'
  - `content`: Conteúdo da carta
  - `created_at`: Data de criação

- **loading**: Boolean indicando se está carregando

- **error**: String com mensagem de erro ou null

- **addLetter(author, content)**: Função para adicionar uma carta
  - Retorna a carta criada ou null em caso de erro

- **deleteLetter(letterId)**: Função para deletar uma carta

- **refetch()**: Função para recarregar as cartas

---

## Exemplo Completo: Integração com App

```typescript
import { useSession, useLetters } from '@/hooks'

export function App() {
  const { session, completeSession } = useSession()
  const { letters, addLetter } = useLetters(session?.id || null)

  const handleFinishApp = async () => {
    // Adicionar uma carta final
    if (session?.id) {
      await addLetter('author', 'Carta de encerramento...')
    }
    
    // Marcar sessão como completa
    await completeSession()
  }

  return (
    <div>
      <h1>Cadeado</h1>
      {session && <p>Sessão: {session.id}</p>}
      <p>Cartas: {letters.length}</p>
      <button onClick={handleFinishApp}>Finalizar</button>
    </div>
  )
}
```

---

## Tratamento de Erros

Todos os hooks retornam um objeto `error` que contém a mensagem de erro, se houver.

```typescript
const { error, addLetter } = useLetters(sessionId)

const handleAddLetter = async () => {
  const result = await addLetter('author', 'Conteúdo...')
  
  if (!result) {
    console.error('Erro ao adicionar carta:', error)
  }
}
```

---

## Notas Importantes

1. **sessionId obrigatório**: O hook `useLetters` requer um `sessionId` válido. Se passar `null`, não fará requisições.

2. **Sem autenticação**: Como a aplicação não usa autenticação, qualquer pessoa pode ler/escrever qualquer dado. As políticas RLS são permissivas.

3. **Sem persistência local**: Os dados são salvos apenas no Supabase. Recarregar a página criará uma nova sessão.

4. **Erros de rede**: Se houver erro de conexão, o hook retornará um objeto `error`.

---

## Próximos Passos

1. Instale as dependências: `npm install`
2. Configure as tabelas no Supabase (veja SUPABASE_SETUP.md)
3. Importe e use os hooks nos seus componentes
