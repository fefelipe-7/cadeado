# Configuração Supabase - Cadeado

## Credenciais do Projeto

- **URL**: https://jjrpjqvgdodzctqbenpz.supabase.co
- **Chave Pública**: sb_publishable_6aQAhpqHXc5oMbF9rrGqqQ_0L0wzeql

## Como Criar as Tabelas

### Passo 1: Acessar o SQL Editor

1. Vá para https://app.supabase.com
2. Faça login com sua conta
3. Selecione o projeto "cadeado"
4. No menu lateral esquerdo, clique em **SQL Editor**

### Passo 2: Executar o Script SQL

Copie e cole o script abaixo no SQL Editor e clique em "Run":

```sql
-- Create sessions table
-- Stores metadata about each user session through the app
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE
);

-- Create letters table
-- Stores letters written by author and recipient
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK (author IN ('author', 'recipient')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_letters_session_id ON letters(session_id);
CREATE INDEX IF NOT EXISTS idx_letters_author ON letters(author);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
-- Sessions: anyone can create and read their own session
CREATE POLICY "Allow public to create sessions" ON sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read sessions" ON sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public to update sessions" ON sessions
  FOR UPDATE USING (true);

-- Letters: anyone can create and read letters
CREATE POLICY "Allow public to create letters" ON letters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read letters" ON letters
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Passo 3: Verificar as Tabelas

Após executar o script, você verá as tabelas criadas em **Table Editor** no menu lateral.

## Estrutura das Tabelas

### Tabela: `sessions`

Armazena metadados sobre cada sessão do usuário.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Identificador único (gerado automaticamente) |
| `created_at` | TIMESTAMP | Data/hora de criação |
| `updated_at` | TIMESTAMP | Data/hora da última atualização |
| `completed` | BOOLEAN | Se a sessão foi completada |

**Exemplo de uso:**
```typescript
const { data, error } = await supabase
  .from('sessions')
  .insert({ completed: false })
  .select()
```

### Tabela: `letters`

Armazena cartas escritas pelo autor e pelo destinatário.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Identificador único (gerado automaticamente) |
| `session_id` | UUID | Referência à sessão (chave estrangeira) |
| `author` | TEXT | Quem escreveu: 'author' ou 'recipient' |
| `content` | TEXT | Conteúdo da carta |
| `created_at` | TIMESTAMP | Data/hora de criação |

**Exemplo de uso:**
```typescript
const { data, error } = await supabase
  .from('letters')
  .insert({
    session_id: sessionId,
    author: 'author',
    content: 'Conteúdo da carta...'
  })
  .select()
```

## Segurança (RLS - Row Level Security)

As políticas criadas permitem:

- **Qualquer pessoa** pode criar uma sessão
- **Qualquer pessoa** pode ler todas as sessões
- **Qualquer pessoa** pode atualizar sessões
- **Qualquer pessoa** pode criar cartas
- **Qualquer pessoa** pode ler todas as cartas

⚠️ **Nota**: Como a aplicação não requer autenticação, as políticas RLS são permissivas. Se você quiser adicionar autenticação no futuro, ajuste as políticas.

## Próximos Passos

1. Execute o script SQL acima no SQL Editor
2. Instale as dependências: `npm install`
3. A aplicação está pronta para usar o Supabase

## Variáveis de Ambiente (Opcional)

Se preferir usar variáveis de ambiente, crie um arquivo `.env.local`:

```
VITE_SUPABASE_URL=https://jjrpjqvgdodzctqbenpz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6aQAhpqHXc5oMbF9rrGqqQ_0L0wzeql
```

E atualize `src/lib/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

## Troubleshooting

### Erro: "relation 'sessions' does not exist"

Significa que as tabelas não foram criadas. Execute o script SQL novamente.

### Erro: "permission denied for schema public"

Verifique se você está usando a chave pública correta e se as políticas RLS estão habilitadas.

### Erro: "invalid UUID"

Certifique-se de que está passando um UUID válido como `session_id`.
