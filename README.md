# cadeado

Uma aplicação React intencional e linear para reflexão emocional após o término de um relacionamento.

## Propósito

Cadeado é uma experiência privada e guiada, não comercial, sem objetivo de engajamento ou retenção. É um espaço para comunicar responsabilidade, reflexão e encerramento.

## Características

- **Experiência linear**: 7 telas + tela de cartas, sem navegação livre
- **Animações calmas**: Texto aparece linha por linha, sem digitação
- **Design minimalista**: Fundo escuro, muito espaço negativo
- **Mobile-first**: Otimizado para dispositivos móveis
- **Sem rastreamento**: Nenhuma analítica, logging ou tracking
- **Sem notificações**: Experiência silenciosa e intencional

## Stack Técnico

- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **motion/react** para animações
- **shadcn/ui** para componentes base
- **Vite** como build tool

## Estrutura de Pastas

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   │   └── button.tsx
│   ├── BeamsBackground.tsx    # Canvas animado de fundo
│   ├── AnimatedLines.tsx      # Componente de animação de texto
│   └── ScreenLayout.tsx       # Layout base para telas
├── screens/             # Telas da aplicação
│   ├── Screen1Framing.tsx
│   ├── Screen2Acknowledgment.tsx
│   ├── Screen3Autonomy.tsx
│   ├── Screen4Impact.tsx
│   ├── Screen5Learnings.tsx
│   ├── Screen6Recognition.tsx
│   ├── Screen7Release.tsx
│   └── LettersScreen.tsx
├── lib/
│   └── utils.ts         # Utilitários (cn para classes)
├── App.tsx              # Componente principal
├── main.tsx             # Entrada da aplicação
└── index.css            # Estilos globais
```

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra em seu navegador (otimizado para mobile):
```
http://localhost:5173
```

## Build para Produção

```bash
npm run build
```

## Design e Filosofia

### Responsabilidades das Telas

1. **Framing**: Contexto e preparação
2. **Acknowledgment**: Reconhecimento direto do erro
3. **Autonomy**: Reconhecimento da autonomia da outra pessoa
4. **Impact**: Reconhecimento do impacto emocional
5. **Learnings**: O que foi aprendido (sem promessas)
6. **Recognition**: Reconhecimento de que o relacionamento existiu
7. **Release**: Liberação de obrigação
8. **Letters**: Espaço para cartas (epilogo)

### Princípios de Design

- **Calmo**: Sem dramaticidade ou urgência
- **Respeitoso**: Reconhecimento genuíno
- **Introspectivo**: Foco na reflexão
- **Sem manipulação**: Silêncio é um resultado válido
- **Sem pressão**: Nenhuma culpa ou coerção

### Animações

- Linhas aparecem uma após a outra
- Cada linha: fade in + movimento suave para cima
- Sem digitação letra por letra
- Botão "continuar" aparece após animação completa

## Customização

### Mudar Texto das Telas

Edite os arquivos em `src/screens/` e modifique o array `lines`:

```typescript
const lines = [
  'Sua primeira linha',
  'Sua segunda linha',
  'Sua terceira linha',
]
```

### Adicionar Cartas

Edite `src/screens/LettersScreen.tsx` e adicione cartas ao estado inicial:

```typescript
const [letters, setLetters] = useState<Letter[]>([
  {
    id: '1',
    author: 'author',
    content: 'Conteúdo da carta...',
    timestamp: Date.now(),
  },
])
```

### Cores e Tema

Modifique `src/index.css` para ajustar variáveis CSS do tema.

## Notas Importantes

- A aplicação é **linear**: não há volta, não há menu
- **Sem estado persistente**: cada sessão é independente
- **Mobile-optimized**: viewport configurado para mobile
- **Sem dependências externas**: apenas React, Tailwind e motion

## Licença

Privado. Uso pessoal apenas.
