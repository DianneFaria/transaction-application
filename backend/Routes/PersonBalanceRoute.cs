using System.Linq.Expressions;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes;

// Classe que define as rotas relacionadas ao saldo das pessoas
public static class PersonBalanceRoute{

    // Método responsável por mapear as rotas relacionadas ao saldo
    public static void PersonBalanceRoutes(this WebApplication app){

        // Criação de um grupo de rotas
        var route = app.MapGroup("person/balance");

        // Definição da rota GET que retorna o saldo de todas as pessoas
        route.MapGet("", async (AppDbContext context, CancellationToken ct) =>
        {
            try{
                // Listar todas as pessoas do banco de dados
                var people = await context.People.ToListAsync(ct);

                // Verificar se não há pessoas
                if (people == null || !people.Any()){
                    return Results.NotFound("No people found.");
                }

                // Lista para armazenar o saldo de cada pessoa
                var personBalance = new List<PersonBalance>();

                // Variáveis para calcular o total geral
                decimal totalReceitasGeral = 0;
                decimal totalDespesasGeral = 0;
                decimal saldoGeral = 0;

                // Iterar sobre cada pessoa e calcular o saldo individual
                foreach (var person in people)
                {
                    // Obter transações para cada pessoa
                    var transactions = await context.Transactions
                        .Where(t => t.PessoaId == person.Id) // Filtra as transações pelo id da pessoa
                        .ToListAsync(ct);

                    // Calcular as receitas e despesas para a pessoa
                    decimal totalReceitas = transactions.Where(t => t.Tipo == "RECEITA").Sum(t => t.Valor);
                    decimal totalDespesas = transactions.Where(t => t.Tipo == "DESPESA").Sum(t => t.Valor);

                    // Calcular o saldo da pessoa
                    decimal saldo = totalReceitas - totalDespesas;

                    // Criar uma instância PersonBalance para armazenar o saldo de cada pessoa
                    personBalance.Add(new PersonBalance
                    {
                        Id = person.Id, // ID da pessoa
                        Nome = person.Name, // Nome da pessoa
                        TotalReceitas = totalReceitas,  // Total de receitas da pessoa
                        TotalDespesas = totalDespesas, // Total de despesas da pessoa
                        Saldo = saldo // Saldo da pessoa
                    });

                    // Atualizar os totais gerais
                    totalReceitasGeral += totalReceitas;
                    totalDespesasGeral += totalDespesas;
                    saldoGeral += saldo;
                }

                // Cria um saldo geral com os totais de todas as pessoas
                var totalBalance = new PersonBalance
                {
                    Id = 0,
                    Nome = "Total Geral",
                    TotalReceitas = totalReceitasGeral,
                    TotalDespesas = totalDespesasGeral,
                    Saldo = saldoGeral
                };

                 // Adicionar o resumo geral ao final da lista
                personBalance.Add(totalBalance);

                // Retornar o resultado com o balanço das pessoas e o total geral
                return Results.Ok(personBalance);
            }
            catch (Exception e){
                // Em caso de erro, retornar um erro 500 (Internal Server Error)
                return Results.Problem(e.Message);
            }
        }); 
    }
}    