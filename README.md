<h1 align="center"> Projeto Transações </h1>

## 🎯 Objetivo
Implementar um sistema de controle de gastos residenciais.

## 📍 Requisitos funcionais
• Cadastro de transações (Criação e listagem);

• Cadastro de pessoas (criação, deleção e listagem);

• Consulta de totais (receitas, despesas, saldo e totais gerais);

• Documentação clara da lógica e função de cada parte do código.

## 📍 Requisitos não-funcionais
•	Documentação via GitHub;

•	Modelagem de Banco de Dados.

## Regras de negócio
•	Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas;

•	Caso o usuário informe um menor de idade (menor de 18), apenas despesas deverão ser aceitas;

•  Deverá haver uma lista com todas as pessoas cadastradas, exibindo o total de receitas, despesas e o saldo (receita – despesa) de cada uma. Ao final deverá exibir o total geral de todas as pessoas incluindo o total de receitas, total de despesas e o saldo líquido.


## 🔧 Tecnologias utilizadas
 ![REACT](https://img.shields.io/badge/React-0D1117?style=for-the-badge&logo=react)
 ![GITHUB](https://img.shields.io/badge/GitHub-0B1320?style=for-the-badge&logo=github&logoColor=white)

 ## ⬇Guia de Instalação

### Pré-requisitos
- **VSCode**: Editor de código para visualização e edição do projeto. [Baixe o VSCode](https://code.visualstudio.com/download)
- **Node.js**: Plataforma para desenvolvimento JavaScript. [Baixe o node](https://nodejs.org/pt)
- **npm**: Gerenciador de pacotes do Node.js (já vem com a instalação do Node.js). Ou, se preferir, você pode usar yarn como gerenciador de pacotes. [Instalar Yarn](https://yarnpkg.com/)
- **.NET SDK**: O SDK do .NET é necessário para compilar e rodar aplicações C# no seu ambiente. Você pode baixar a versão mais recente do .NET SDK [aqui](https://dotnet.microsoft.com/pt-br/download)

### Instalação

#### 1. Baixando o Projeto
- Baixe o projeto .zip ou clone o repositório

#### 2. Abrindo o Projeto no VSCode
- Inicie o VSCode ou outro editor de código.
- Abra o projeto

### Executar Frontend
> Navegue até a pasta do frontend:

#### 1. Instalar Dependências
Execute o seguinte comando para instalar todas as dependências necessárias:

Usando npm:

```bash
npm install
```

Usando yarn:

```bash
yarn install
```

#### 2. Iniciar o Servidor de Desenvolvimento

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

### Executar Backend
> Navegue até a pasta do backend:

#### 1. Instalar Dependências
Execute o comando abaixo para baixar as dependências listadas no arquivo do projeto

```
dotnet restore
```
#### 2. Compilar o projeto
Esse comando irá compilar o código fonte e garantir que o projeto não tenha erros

```
dotnet build
```
#### 3. Executar o projeto
Esse comando irá iniciar o aplicativo e executar o projeto

```
dotnet run
```

A aplicação estará disponível em:

```
http://localhost:5268
```


### Passo a passo de criação do projeto
Criar projeto
```
dotnet new webapi --name backend -minimal
```

Criar solution
```
dotnet new sln -n Application
```

Adicionar projeto na solution
```
dotnet sln Application.sln add (path completo do arquivo backend.csproj)
```

Instalações referentes ao banco
```
dotnet add package Microsoft.EntityFrameworkCore --version 9.0.3
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 9.0.3
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.3
```

Comando para criar a migration
```
dotnet ef migrations add Inicial
```

Comando para atualizar migration
```
dotnet ef database update
```

Instalação dos Cors
```
dotnet add package Microsoft.AspNetCore.Cors
```
