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
- **Paginação adaptativa** que ajusta a quantidade de produtos por página conforme o tamanho da tela
- **Interface totalmente responsiva** otimizada para dispositivos móveis, tablets e desktops

## Experiência do Usuário

- Interface limpa e responsiva
- Filtros com aplicação automática (sem necessidade de botões adicionais)
- Filtros recolhíveis para melhor visualização em dispositivos móveis
- Máscaras de entrada para valores monetários com suporte completo a zeros (10, 20, 30, etc.)
- Layout adaptativo que prioriza legibilidade em qualquer dispositivo
- Prevenção de zoom indesejado em campos de entrada em dispositivos móveis

## Como executar

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## Decisões Técnicas

Este projeto foi construído seguindo princípios de código limpo, modularidade e performance. Abaixo estão as principais decisões técnicas e o raciocínio por trás delas:

### Arquitetura de Componentes

1. **Componentes Especializados**: Cada componente foi criado com uma responsabilidade única e bem definida, seguindo o princípio da responsabilidade única (SRP do SOLID).

2. **Context API para Gerenciamento de Estado**: Optamos pelo Context API em vez de bibliotecas como Redux, pois o escopo da aplicação é moderado e a complexidade adicional de uma biblioteca de estado não se justificava.

3. **Hooks Personalizados**: Desenvolvemos hooks como `useCurrencyInput` e `useResponsiveItemsPerPage` para encapsular lógicas complexas e reutilizáveis, evitando duplicação de código e facilitando os testes.

### Performance e Experiência do Usuário

1. **Preloader Inteligente**: O preloader foi implementado para detectar o carregamento de todas as imagens antes de remover-se da tela, garantindo que o usuário não veja elementos visuais incompletos.

2. **Atualização Instantânea**: As operações de filtro atualizam os resultados imediatamente, sem necessidade de botões de confirmação, proporcionando uma experiência fluida.

3. **Formatação de Moeda Otimizada**: A lógica de formatação de moeda foi isolada para evitar cálculos desnecessários e garantir consistência em toda a aplicação, com tratamento especial para valores que contêm zeros (10,00, 30,50, etc).

4. **Paginação Responsiva**: Quantidade de itens por página se adapta automaticamente ao dispositivo (4 em celulares, 6 em tablets, 8 em desktops), melhorando a experiência e performance.

5. **Otimização para Dispositivos Móveis**: Utilizamos técnicas específicas para evitar comportamentos indesejados em dispositivos móveis, como zoom automático em campos de entrada e ajustes de layout para melhor visualização.

### Abordagem de Testes

1. **Priorização de Testes de Comportamento**: Focamos em testar como os componentes se comportam do ponto de vista do usuário, não seus detalhes de implementação.

2. **Mock de Serviços Externos**: Utilizamos MSW para simular a API, permitindo testes consistentes independentes do backend.

3. **Cobertura de Diferentes Estados da UI**: Testamos múltiplos estados dos componentes (carregando, erro, vazio, com dados), garantindo robustez em diferentes cenários.

## Evoluções Futuras

A aplicação tem potencial para várias melhorias e expansões:

### Funcionalidades

1. **Sistema de Autenticação**: Implementar login/cadastro para permitir gerenciamento personalizado por usuário.

2. **Histórico de Alterações**: Adicionar rastreamento de alterações nos produtos com timestamps e informações do autor.

3. **Exportação de Dados**: Permitir exportação do catálogo em formatos como CSV, PDF ou Excel.

4. **Imagens Múltiplas**: Suporte para múltiplas imagens por produto com visualização em galeria.

5. **Categorias Customizáveis**: Sistema para adicionar, editar e remover categorias de produtos.

6. **Modo Offline**: Adicionar capacidade de trabalhar offline com sincronização posterior.

### Técnicas

1. **Implementação de PWA**: Transformar a aplicação em uma Progressive Web App para permitir uso offline e instalação.

2. **Testes E2E**: Adicionar testes end-to-end com Cypress ou Playwright para validar fluxos completos de usuário.

3. **Otimização de Imagens Avançada**: Implementar carregamento lazy e otimização automática de imagens enviadas pelos usuários.

4. **Internacionalização (i18n)**: Preparar a aplicação para suportar múltiplos idiomas.

5. **Métricas de Performance**: Integrar ferramentas como Lighthouse CI para monitorar constantemente a performance da aplicação.

6. **GraphQL**: Migrar a API REST para GraphQL para consultas mais eficientes e flexíveis.

## Testes

A aplicação possui testes automatizados para garantir o funcionamento correto dos componentes e da lógica de negócio.

### Tecnologias de teste

- **Jest** - Framework de teste
- **React Testing Library** - Biblioteca para testar componentes React
- **MSW** - Para mockar requisições de API durante os testes

### Componentes testados

- **ProductList** - Testa a renderização da lista de produtos em diferentes estados (carregando, com dados, vazia, erro)
- **ProductForm** - Testa a abertura do modal, fechamento e estados de submissão do formulário
- **ProductFilters** - Testa a funcionalidade dos filtros e ordenação
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
- Uso de hooks personalizados para lógica reutilizável (useCurrencyInput, useResponsiveItemsPerPage)
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