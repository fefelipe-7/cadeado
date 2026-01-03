# 🔧 Instruções Completas para Configurar Supabase

## 1. Acessar o Supabase

1. Vá para: https://app.supabase.com
2. Faça login com sua conta
3. Selecione o projeto **cadeado**

## 2. Criar as Tabelas

### Via SQL Editor (Recomendado)

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Cole o script SQL abaixo:

```sql
-- ============================================
-- CRIAR TABELAS PARA CADEADO
-- ============================================

-- Tabela de Sessões
-- Armazena metadados sobre cada sessão do usuário
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE
);

-- Tabela de Cartas
-- Armazena cartas escritas pelo autor e destinatário
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK (author IN ('author', 'recipient')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_letters_session_id ON letters(session_id);
CREATE INDEX IF NOT EXISTS idx_letters_author ON letters(author);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);

-- ============================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CRIAR POLÍTICAS RLS (Acesso Público)
-- ============================================

-- Sessões: qualquer pessoa pode criar
CREATE POLICY "Allow public to create sessions" ON sessions
  FOR INSERT WITH CHECK (true);

-- Sessões: qualquer pessoa pode ler
CREATE POLICY "Allow public to read sessions" ON sessions
  FOR SELECT USING (true);

-- Sessões: qualquer pessoa pode atualizar
CREATE POLICY "Allow public to update sessions" ON sessions
  FOR UPDATE USING (true);

-- Cartas: qualquer pessoa pode criar
CREATE POLICY "Allow public to create letters" ON letters
  FOR INSERT WITH CHECK (true);

-- Cartas: qualquer pessoa pode ler
CREATE POLICY "Allow public to read letters" ON letters
  FOR SELECT USING (true);

-- ============================================
-- CRIAR FUNÇÃO E TRIGGER PARA UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Clique em **Run** (botão azul no canto superior direito)
5. Você verá a mensagem: "Query executed successfully"

### Verificar se as Tabelas Foram Criadas

1. No menu lateral, clique em **Table Editor**
2. Você deve ver as tabelas:
   - `sessions`
   - `letters`

## 3. Entender a Estrutura

### Tabela `sessions`

```
id (UUID)           - Identificador único da sessão
created_at (TIMESTAMP) - Quando a sessão foi criada
updated_at (TIMESTAMP) - Última atualização
completed (BOOLEAN) - Se a sessão foi completada
```

**Exemplo de dados:**
```
id: 550e8400-e29b-41d4-a716-446655440000
created_at: 2026-01-03 12:08:00
updated_at: 2026-01-03 12:15:00
completed: false
```

### Tabela `letters`

```
id (UUID)           - Identificador único da carta
session_id (UUID)   - Referência à sessão
author (TEXT)       - 'author' ou 'recipient'
content (TEXT)      - Conteúdo da carta
created_at (TIMESTAMP) - Quando foi criada
```

**Exemplo de dados:**
```
id: 660e8400-e29b-41d4-a716-446655440001
session_id: 550e8400-e29b-41d4-a716-446655440000
author: author
content: "Esta é uma carta que escrevi para você..."
created_at: 2026-01-03 12:10:00
```

## 4. Testar a Configuração

### Via SQL Editor

Execute esta query para inserir dados de teste:

```sql
-- Inserir uma sessão de teste
INSERT INTO sessions (completed) VALUES (false)
RETURNING *;

-- Copie o ID retornado e use no comando abaixo
-- Substitua 'SEU_SESSION_ID' pelo ID da sessão criada acima

INSERT INTO letters (session_id, author, content) VALUES
  ('SEU_SESSION_ID', 'author', 'Teste de carta do autor'),
  ('SEU_SESSION_ID', 'recipient', 'Teste de carta do destinatário')
RETURNING *;

-- Ver todas as sessões
SELECT * FROM sessions;

-- Ver todas as cartas
SELECT * FROM letters;
```

## 5. Configuração no Projeto React

As credenciais já estão configuradas em `src/lib/supabase.ts`:

```typescript
const supabaseUrl = 'https://jjrpjqvgdodzctqbenpz.supabase.co'
const supabaseKey = 'sb_publishable_6aQAhpqHXc5oMbF9rrGqqQ_0L0wzeql'
```

## 6. Usar os Hooks no Código

### Exemplo 1: Criar uma Sessão

```typescript
import { useSession } from '@/hooks'

export function MyComponent() {
  const { session, loading } = useSession()

  if (loading) return <div>Carregando...</div>

  return <div>ID da Sessão: {session?.id}</div>
}
```

### Exemplo 2: Adicionar uma Carta

```typescript
import { useLetters } from '@/hooks'

export function AddLetterComponent({ sessionId }: { sessionId: string }) {
  const { addLetter } = useLetters(sessionId)

  const handleAddLetter = async () => {
    await addLetter('author', 'Conteúdo da minha carta...')
  }

  return <button onClick={handleAddLetter}>Adicionar Carta</button>
}
```

### Exemplo 3: Listar Cartas

```typescript
import { useLetters } from '@/hooks'

export function LettersList({ sessionId }: { sessionId: string }) {
  const { letters, loading } = useLetters(sessionId)

  if (loading) return <div>Carregando cartas...</div>

  return (
    <div>
      {letters.map((letter) => (
        <div key={letter.id}>
          <p><strong>{letter.author === 'author' ? 'Minha' : 'Sua'} Carta</strong></p>
          <p>{letter.content}</p>
        </div>
      ))}
    </div>
  )
}
```

## 7. Troubleshooting

### ❌ Erro: "relation 'sessions' does not exist"

**Solução**: Execute o script SQL novamente. As tabelas não foram criadas.

### ❌ Erro: "permission denied for schema public"

**Solução**: Verifique se as políticas RLS foram criadas corretamente. Execute:

```sql
SELECT * FROM pg_policies WHERE tablename = 'sessions';
SELECT * FROM pg_policies WHERE tablename = 'letters';
```

### ❌ Erro: "invalid UUID"

**Solução**: Certifique-se de que está usando um UUID válido como `session_id`.

### ❌ Dados não aparecem no Table Editor

**Solução**: Clique em **Refresh** (ícone de seta circular) no canto superior direito.

## 8. Próximos Passos

1. ✅ Execute o script SQL acima
2. ✅ Verifique as tabelas no Table Editor
3. ✅ Instale as dependências: `npm install`
4. ✅ Inicie o servidor: `npm run dev`
5. ✅ Teste os hooks nos seus componentes

## 📚 Documentação Adicional

- **SUPABASE_SETUP.md** - Guia detalhado de configuração
- **HOOKS_USAGE.md** - Exemplos de uso dos hooks
- **supabase/migrations/001_create_tables.sql** - Script SQL completo

---

**Pronto!** Seu Supabase está configurado e pronto para usar. 🚀
