<div align="center">

# Atividade Extensionista 2026 - Faculdade UNINTER

## App oferecido à comunidade carente do Bairro de Torrões - Recife-PE

Projeto frontend do aplicativo **My Smart Money**, desenvolvido para apoiar famílias em situação de vulnerabilidade social no controle de sua vida financeira com mais clareza, segurança e organização.

</div>

---

## Sumário

1. [Intuito do projeto](#1-intuito-do-projeto)
2. [Backend do projeto](#2-backend-do-projeto)
3. [Espaço para fotos do app](#3-espaço-para-fotos-do-app)
4. [Principais funcionalidades](#4-principais-funcionalidades)
5. [Como instalar e rodar o app](#5-como-instalar-e-rodar-o-app)
6. [Scripts disponíveis](#6-scripts-disponíveis)
7. [Explicação técnica detalhada](#7-explicação-técnica-detalhada)
8. [Estrutura do projeto](#8-estrutura-do-projeto)
9. [Rotas principais da aplicação](#9-rotas-principais-da-aplicação)
10. [Observações importantes](#10-observações-importantes)
11. [Plano de evolução](#11-plano-de-evolução)

---

## 1. Intuito do projeto

Este projeto foi idealizado como uma ação extensionista com propósito social real: **auxiliar as famílias carentes do Bairro de Torrões, em Recife-PE, a administrarem suas finanças com segurança, organização e precisão**. A proposta do aplicativo é transformar o controle financeiro em algo acessível, visual e prático, mesmo para pessoas com pouca familiaridade com ferramentas digitais.

O foco principal é permitir que a comunidade acompanhe receitas, despesas, contas, metas e orçamentos de forma simples, reduzindo desperdícios, evitando descontrole financeiro e incentivando hábitos saudáveis de planejamento. A iniciativa parte da convicção de que, com orientação adequada e boas práticas de educação financeira, essas famílias podem **diminuir enormemente suas condições de pobreza e aumentar sua estabilidade econômica ao longo do tempo**.

Mais do que um sistema, este app representa uma ferramenta de apoio social, prevenção de endividamento e fortalecimento da autonomia financeira familiar.

---

## 2. Backend do projeto

O frontend deste repositório consome uma API própria desenvolvida em .NET.

**Repositório do backend:** https://github.com/Caio-Cabral-Programmer/atividade-extensionista-faculdade-backend

## 3. Espaço para fotos do app

Este espaço foi reservado para a inserção das imagens oficiais do sistema.

<table>
	<tr>
		<td align="center" width="50%">
			<strong>Tela inicial / Landing Page</strong>
			<br /><br />
			<sub>Inserir screenshot aqui</sub>
		</td>
		<td align="center" width="50%">
			<strong>Tela de login e autenticação</strong>
			<br /><br />
			<sub>Inserir screenshot aqui</sub>
		</td>
	</tr>
	<tr>
		<td align="center" width="50%">
			<strong>Dashboard financeiro</strong>
			<br /><br />
			<sub>Inserir screenshot aqui</sub>
		</td>
		<td align="center" width="50%">
			<strong>Transações, contas, metas e orçamentos</strong>
			<br /><br />
			<sub>Inserir screenshot aqui</sub>
		</td>
	</tr>
</table>

Se desejar, você pode substituir os espaços acima por imagens em Markdown, por exemplo:

```md
![Tela inicial](./docs/images/tela-inicial.png)
![Dashboard](./docs/images/dashboard.png)
```

---

## 4. Principais funcionalidades

- Cadastro de usuários e autenticação.
- Verificação em duas etapas (2FA).
- Dashboard com visão geral da saúde financeira.
- Controle de receitas e despesas.
- Gestão de contas bancárias e cartões.
- Organização por categorias.
- Definição de orçamentos mensais.
- Cadastro e acompanhamento de metas financeiras.
- Visualização de dados por meio de gráficos.
- Interface planejada para ser simples, visual e acessível.

---

## 5. Como instalar e rodar o app

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js
- npm
- Git
- Backend do projeto configurado e em execução

### Passo 1. Clonar o repositório do frontend

```bash
git clone https://github.com/Caio-Cabral-Programmer/atividade-extensionista-faculdade-frontend.git
cd atividade-extensionista-faculdade-frontend
```

### Passo 2. Instalar as dependências

```bash
npm install
```

### Passo 3. Configurar a variável de ambiente

Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_BASE_URL=https://localhost:5267
```

Essa variável informa ao frontend qual é o endereço base da API backend.

### Passo 4. Garantir que o backend esteja rodando

Antes de iniciar o frontend, coloque o backend em execução. Caso ainda não tenha feito isso, acesse o repositório abaixo e siga as instruções dele:

```text
https://github.com/Caio-Cabral-Programmer/atividade-extensionista-faculdade-backend
```

### Passo 5. Iniciar o frontend em modo de desenvolvimento

```bash
npm run dev
```

Depois disso, abra no navegador a URL local exibida pelo Vite no terminal.

### Passo 6. Gerar build de produção

Se quiser gerar a versão otimizada para produção:

```bash
npm run build
```

### Passo 7. Visualizar a build localmente

```bash
npm run preview
```

---

## 6. Scripts disponíveis

| Script            | Descrição                                                 |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Inicia o projeto em ambiente de desenvolvimento com Vite. |
| `npm run build`   | Compila o TypeScript e gera a build de produção.          |
| `npm run preview` | Executa uma pré-visualização local da build gerada.       |
| `npm run lint`    | Analisa o código com ESLint.                              |

---

## 7. Explicação técnica detalhada

### Visão geral da stack

Este projeto é um **frontend web moderno** construído com foco em desempenho, organização de código, escalabilidade e boa experiência de uso. A aplicação foi desenvolvida com as seguintes tecnologias principais:

- **React 19** para construção da interface.
- **TypeScript** para tipagem estática e maior segurança no desenvolvimento.
- **Vite** como ferramenta de build e servidor de desenvolvimento.
- **React Router** para navegação entre páginas.
- **TanStack Query** para gerenciamento de dados vindos da API.
- **Axios** para comunicação HTTP com o backend.
- **styled-components** para estilização da interface.
- **Bootstrap Grid** para apoio em responsividade e espaçamento.
- **React Hook Form + Zod** para formulários e validações.
- **Recharts** para exibição de gráficos financeiros.
- **React Toastify** para alertas e notificações visuais.

### Arquitetura aplicada

A aplicação segue uma organização orientada por responsabilidades, separando páginas, componentes, hooks, serviços, contexto global, tipos e utilitários. Isso facilita manutenção, evolução do código e reaproveitamento de partes do sistema.

Na prática, o fluxo técnico da aplicação funciona assim:

1. O usuário acessa a interface React.
2. As rotas públicas e protegidas são controladas pelo React Router.
3. O estado de autenticação é mantido em memória por meio do `AuthContext`.
4. As requisições HTTP são feitas por uma instância central do Axios.
5. O token JWT é injetado automaticamente nas requisições autenticadas.
6. Os dados recebidos são gerenciados e cacheados com TanStack Query.
7. A interface é renderizada com componentes reutilizáveis e estilizada com styled-components.

### Autenticação e segurança

O projeto utiliza um fluxo de autenticação com proteção de rotas e suporte a verificação em duas etapas.

- O login é realizado via API.
- A validação 2FA é feita pelo endpoint `/auth/verify-2fa`.
- O token de acesso fica armazenado **apenas em memória**, o que reduz riscos ligados ao armazenamento persistente no navegador.
- As rotas privadas redirecionam o usuário para a página inicial caso ele não esteja autenticado.
- Em respostas `401`, a aplicação executa logout automaticamente por meio do interceptor da API.

### Comunicação com a API

O arquivo de serviço da API centraliza a configuração do Axios e usa a variável `VITE_API_BASE_URL` para definir a URL base do backend. Isso permite trocar o endereço da API entre ambientes sem alterar o código-fonte da aplicação.

Além disso:

- Existe um interceptor de requisição para enviar o token JWT no cabeçalho `Authorization`.
- Existe um interceptor de resposta para tratar erros de autenticação.
- Os serviços da pasta `src/services` concentram a comunicação com cada domínio do sistema, como autenticação, contas, categorias, metas, orçamentos e transações.

### Gerenciamento de estado e dados

O projeto utiliza duas estratégias principais:

- **Context API** para autenticação global.
- **TanStack Query** para cache, refetch e sincronização de dados vindos do backend.

Essa divisão é importante porque evita duplicação de estado e mantém a aplicação mais previsível.

### Experiência de interface

O frontend foi estruturado para ser visualmente claro e simples de operar. A aplicação possui:

- Componentes reutilizáveis de UI.
- Layout com cabeçalho, barra lateral e área de conteúdo.
- Feedback visual com `ToastContainer`.
- Carregamento assíncrono de páginas com `lazy` e `Suspense`.
- Responsividade apoiada por grid do Bootstrap e componentes estilizados.

---

## 8. Estrutura do projeto

```text
src/
├── assets/                # Arquivos estáticos
├── components/            # Componentes reutilizáveis de UI, layout e gráficos
├── contexts/              # Providers globais, como React Query
├── hooks/                 # Hooks customizados para consumo de dados e lógica de negócio
├── pages/                 # Páginas principais do sistema
├── routes/                # Definição das rotas e proteção de navegação
├── services/              # Integração com a API backend
├── store/                 # Contextos globais, como autenticação
├── styles/                # Tema e estilos globais
├── types/                 # Tipos e interfaces TypeScript
└── utils/                 # Funções utilitárias e tratamento de erros
```

Essa estrutura torna o projeto mais limpo, modular e fácil de evoluir conforme novas funcionalidades forem adicionadas.

---

## 9. Rotas principais da aplicação

| Rota              | Finalidade                      |
| ----------------- | ------------------------------- |
| `/`               | Landing page pública do projeto |
| `/confirm-email`  | Confirmação de e-mail           |
| `/reset-password` | Redefinição de senha            |
| `/dashboard`      | Painel principal autenticado    |
| `/transactions`   | Gestão de transações            |
| `/accounts`       | Gestão de contas e cartões      |
| `/categories`     | Gestão de categorias            |
| `/budgets`        | Gestão de orçamentos            |
| `/goals`          | Gestão de metas financeiras     |

As rotas protegidas utilizam um componente específico de proteção para impedir o acesso de usuários não autenticados.

---

## 10. Observações importantes

- Este repositório representa apenas a camada frontend do sistema.
- O funcionamento completo depende da API backend estar disponível.
- A URL da API não deve ser fixada diretamente no código, e sim configurada por variável de ambiente.
- O projeto foi pensado para oferecer clareza visual, navegação objetiva e melhor compreensão financeira para a comunidade atendida.

---

## 11. Plano de evolução

**Plano de evolução do app para 2027: Versão Desktop e Mobile**
