# transaction-application


## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

1. **Node.js** (Versão 16.x ou superior)
   - [Baixar Node.js](https://nodejs.org/)
2. **npm** (Gerenciador de Pacotes Node) ou **yarn**
   - npm já vem junto com o Node.js.
   - [Instalar Yarn](https://yarnpkg.com/) se preferir.

---

## Passos para Executar a Aplicação


### 1. Instalar Dependências

Execute o seguinte comando para instalar todas as dependências necessárias:

Usando npm:

```bash
npm install
```

Usando yarn:

```bash
yarn install
```

### 2. Iniciar o Servidor de Desenvolvimento

Execute o comando abaixo para iniciar a aplicação no modo de desenvolvimento:

Usando npm:

```bash
npm run dev
```

Usando yarn:

```bash
yarn run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```


Passo a passo de criação

dotnet new webapi --name backend -minimal //Criar projeto
dotnet new sln -n Application //Criar solution
dotnet sln Application.sln add (path completo do arquivo backend.csproj) //Adicionar projeto na solution

dotnet run --project "C:\Users\diann\OneDrive\Área de Trabalho\repositorios\transaction-application\backend\backend.csproj"
dotnet add package Microsoft.EntityFrameworkCore --version 9.0.3
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 9.0.3
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.3
dotnet ef migrations add Inicial // Comando para a migration
dotnet ef database update // atualizar migrations
dotnet add package Microsoft.AspNetCore.Cors
