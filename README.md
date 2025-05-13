# Gerenciador de Produtos - Teste técnico referente para a vaga de Desenvolvedor Frontend.

Aplicação para Gerenciar Produtos desenvolvida com Next.js, TypeScript e Tailwind CSS. Permite visualizar, filtrar, ordenar e cadastrar produtos de forma simples e intuitiva.

Teste através do link: https://gerenciar-produtos.vercel.app/

## Funcionalidades

- **Listagem de produtos** com cards visuais e badges coloridos por categoria
- **Sistema de filtros** que atualiza resultados em tempo real:
  - Busca por nome e descrição
  - Filtro por faixa de preço (mínimo e máximo)
  - Ordenação por relevância, preço e nome
- **Cadastro de produtos** com modal intuitivo
- **Formatação monetária brasileira** (R$) com separação de milhares e decimais

## Experiência do Usuário

- Interface limpa e responsiva
- Filtros com aplicação automática (sem necessidade de botões adicionais)
- Debounce para melhorar performance durante digitação nos filtros
- Máscaras de entrada para valores monetários

## Como executar

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## Testes

A aplicação possui testes automatizados para garantir o funcionamento correto dos componentes e da lógica de negócio.

### Tecnologias de teste

- **Jest** - Framework de teste
- **React Testing Library** - Biblioteca para testar componentes React
- **MSW** - Para mockar requisições de API durante os testes

### Componentes testados

- **ProductList** - Testa a renderização da lista de produtos em diferentes estados (carregando, com dados, vazia, erro)
- **ProductForm** - Testa a abertura do modal, fechamento e estados de submissão do formulário
- **ProductFilters** - Testa a funcionalidade dos filtros, incluindo debounce e ordenação
- **ProductContext** - Testa a lógica de gerenciamento de estado global da aplicação

### Como executar os testes

```bash
# Executa todos os testes
npm test

# Executa testes de um arquivo específico
npm test -- src/app/components/__tests__/ProductList.test.tsx

# Executa testes com coverage report
npm test -- --coverage
```

### Melhores práticas implementadas

- Isolamento de dependências externas através de mocks
- Testes que priorizam comportamento em vez de implementação
- Uso de hooks personalizados para lógica reutilizável (useCurrencyInput, useForm)
- Testes de interação do usuário (cliques, digitação, etc.)

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/      # Componentes da UI
│   │   └── __tests__/   # Testes dos componentes
│   ├── context/         # Gerenciamento de estado
│   │   └── __tests__/   # Testes dos contextos
│   ├── hooks/           # Hooks personalizados
│   ├── services/        # Serviços de API
│   ├── types/           # Definições de tipos
│   └── utils/           # Funções utilitárias
```

## Tecnologias

- **Next.js** - Framework React para desenvolvimento web
- **TypeScript** - Tipagem estática para melhorar segurança e desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **MSW** - Biblioteca para mock de API durante desenvolvimento 