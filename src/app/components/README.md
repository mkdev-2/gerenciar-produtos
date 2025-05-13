# Documentação dos Componentes

## Visão Geral
Este diretório contém os componentes React utilizados na aplicação Catálogo de Produtos. Os componentes foram desenvolvidos seguindo princípios SOLID e de responsabilidade única, visando melhor manutenção e testabilidade.

## Componentes de Formulário

### ProductForm
Responsável por exibir o formulário de cadastro de produtos. Este componente recebe os dados, valida e envia para o context.

**Props:**
- `onClose?: () => void`: Função opcional chamada quando o usuário fecha o formulário

**Comportamento:**
- Exibe campos para todos os dados necessários do produto
- Valida os dados antes de enviar
- Formata o campo de preço automaticamente
- Chama a função `onClose` quando o usuário cancela ou após cadastrar com sucesso

### ProductFormButton
Componente que exibe um botão para abrir o modal de cadastro de produtos. Quando clicado, exibe o modal com o formulário.

**Comportamento:**
- Exibe o botão "Cadastrar Novo Produto"
- Gerencia o estado do modal (aberto/fechado)
- Renderiza o componente ProductForm dentro do modal quando aberto
- Fecha o modal quando o ProductForm é concluído ou cancelado

## Estrutura de Componentes

```
ProductFormButton
└── Modal
    └── ProductForm
```

O `ProductFormButton` é responsável por abrir o modal e gerenciar seu estado.
O `ProductForm` é responsável apenas pelo formulário em si, não precisa se preocupar com o modal.

## Uso

### Usando o botão para abrir o modal

```jsx
import ProductFormButton from './components/ProductFormButton';

function MinhaComponente() {
  return (
    <div>
      <h1>Minha Página</h1>
      <ProductFormButton />
    </div>
  );
}
```

### Usando o formulário diretamente (sem modal)

```jsx
import ProductForm from './components/ProductForm';

function MeuFormulario() {
  const handleClose = () => {
    // Lógica para quando o formulário é fechado
  };

  return (
    <div className="container">
      <ProductForm onClose={handleClose} />
    </div>
  );
}
``` 