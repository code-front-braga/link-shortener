# Encurtador de URLs Minimalista

Este é um projeto de um encurtador de URLs simples e funcional, construído com Next.js, React, Prisma e PostgreSQL.

## Funcionalidades Atuais

- **Encurtamento de URLs:** Permite aos usuários inserir um URL longo e obter um link curto único.
- **Redirecionamento:** Ao acessar o link curto, o usuário é automaticamente redirecionado para o URL original.
- **Código Curto Personalizado (Opcional):** Os usuários podem fornecer um código curto desejado (se disponível).
- **Validação de URL:** O formulário no frontend realiza a validação básica do formato da URL.
- **Cópia para o Clipboard:** Um botão permite copiar facilmente o URL encurtado para a área de transferência.
- **Interface de Usuário:** Uma interface simples e intuitiva para encurtar URLs.

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) (Framework React para aplicações web com renderização server-side e rotas de API)
  - [React](https://react.dev/) (Biblioteca JavaScript para construção de interfaces de usuário)
  - [react-hook-form](https://react-hook-form.com/) (Para gerenciamento de formulários)
  - [zod](https://zod.dev/) (Para validação de dados)
  - [axios](https://axios-http.com/) (Para fazer requisições HTTP)
  - [Tailwind CSS](https://tailwindcss.com/) (Para estilização)
  - [Shadcn UI](https://ui.shadcn.com/) (Para componentização)
  - [react-icons](https://react-icons.github.io/react-icons/) (Para ícones)
  - [react-spinners](https://www.npmjs.com/package/react-spinners) (Para indicadores de carregamento)
- **Backend:**
  - [Next.js](https://nextjs.org/) (Rotas de API)
  - [Prisma](https://www.prisma.io/) (ORM para acesso ao banco de dados)
  - [PostgreSQL](https://www.postgresql.org/) (Banco de dados relacional)
  - [nanoid](https://github.com/ai/nanoid) (Para geração de códigos curtos únicos)
  - [bcryptjs](https://github.com/kelektiv/node.bcrypt.js/) (Para hashing de senhas - futura funcionalidade de autenticação)
- **Deploy:**
  - [Vercel](https://vercel.com/)

## Próximos Passos (Em Desenvolvimento)

- [ ] Implementação de autenticação de usuários para uma área administrativa.
- [ ] Criação de uma interface administrativa para visualizar métricas de cliques dos links.
- [ ] Refinamento da lógica e validação para códigos curtos personalizados.
- [ ] Possível implementação de proteção de links (senha ou privacidade).
- [ ] Possível coleta de informações de análise de cliques.

## Como Executar Localmente

1.  Clone o repositório:

    ```bash
    git clone https://github.com/code-front-braga/link-shortener.git
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  Configure as variáveis de ambiente:

    - Crie um arquivo `.env.local` na raiz do projeto.
    - Adicione as seguintes variáveis (ajuste conforme sua configuração local):
      ```
      DATABASE_URL="sua_url_de_conexao_postgresql"
      HOST_URL="http://localhost:3000"
      ```
      **Lembre-se de configurar corretamente a sua conexão com o PostgreSQL.**

4.  Execute as migrations do Prisma:

    ```bash
    npx prisma migrate dev
    # ou
    pnpm prisma migrate dev
    ```

5.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    pnpm dev
    ```

6.  Abra seu navegador em `http://localhost:3000` para ver a aplicação rodando localmente.

## Status do Projeto

Em desenvolvimento.
