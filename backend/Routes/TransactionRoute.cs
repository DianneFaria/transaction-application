namespace backend.Routes;
using backend.Models;
using Microsoft.EntityFrameworkCore;

// Classe que define as rotas relacionadas a transação
public static class TransactionRoute{

    // Método responsável por mapear as rotas relacionadas às transações
    public static void TransactionRoutes(this WebApplication app){
        
        // Criação de um grupo de rotas
        var route = app.MapGroup("transaction");

        // Rota POST para criar uma nova transação
        route.MapPost("",
            async (TransactionRequest req, AppDbContext context, CancellationToken ct) =>
            {
                // Verifica se a pessoa associada à transação existe no banco de dados
                var person = await context.People.FirstOrDefaultAsync(x => x.Id == req.pessoaId, ct);
                if (person == null)
                    return Results.NotFound("Person not found.");

                // Verifica se a pessoa é menor de idade e se está tentando adicionar uma receita
                if (person.Idade < 18 && req.tipo != "DESPESA"){
                    return Results.BadRequest("Only expenses are allowed for minors.");
                }
                try {
                    // Cria uma nova transação
                    var transaction = new TransactionModel(req.descricao, req.valor, req.tipo, req.pessoaId);
                    // Adiciona a transação ao banco de dados
                    await context.AddAsync(transaction, ct);
                    await context.SaveChangesAsync(ct);
                    return Results.Ok(transaction);
                }
                catch (ArgumentException e) {
                    // Retorna erro em caso de exceção
                    return Results.BadRequest(e.Message);
                }
            });
        
        // Rota GET para listar todas as transações
        route.MapGet("", 
            async (AppDbContext context, CancellationToken ct) =>
            {
                try{
                    // Consulta as transações no banco de dados
                    var transactions = await context.Transactions.ToListAsync(ct);
                    
                    // Verifica se não há transações
                    if (transactions == null || !transactions.Any()){
                        return Results.NotFound("No transactions found.");
                    }

                    // Retorna as transações com status OK
                    return Results.Ok(transactions);
                }
                catch (Exception e){
                    // Retorna um erro interno se algo der errado
                    return Results.Problem(e.Message);
                }
            });
    }
    
}