namespace backend.Routes;
using backend.Models;
using Microsoft.EntityFrameworkCore;

// Classe que define as rotas relacionadas a pessoa
public static class PersonRoute{

    // Método responsável por mapear as rotas relacionadas às pessoas
    public static void PersonRoutes(this WebApplication app){

        // Criação de um grupo de rotas
        var route = app.MapGroup("person");

        // Definição da rota POST para criar uma nova pessoa
        route.MapPost("",
            async (PersonRequest req, AppDbContext context, CancellationToken ct) =>
            {
                // Verificar se o nome e a idade são válidos
                if (string.IsNullOrEmpty(req.name) || req.idade <= 0) {
                    // Retorna erro 400 caso o nome seja vazio ou a idade seja inválida
                    return Results.BadRequest("Name and age are required and age must be greater than zero.");
                }
                try{
                    // Criar uma nova instância de PersonModel
                    var person = new PersonModel(req.name, req.idade);
                    // Adicionar a nova pessoa ao banco de dados
                    await context.AddAsync(person, ct);
                    await context.SaveChangesAsync(ct);
                     // Retornar person após ser salvo com sucesso
                    return Results.Ok(person);
                }catch(Exception e){
                    // Em caso de erro, retorna um erro 400 com a mensagem do erro
                    return Results.BadRequest(e.Message); 
                }
            });

        // Definição da rota GET para listar todas as pessoas
        route.MapGet("", async (AppDbContext context, CancellationToken ct) =>
        {
            // Buscar todas as pessoas no banco de dados
            var people = await context.People.ToListAsync(ct);

            // Verificar se a lista de pessoas está vazia
            if (people == null || people.Count == 0){
                // Retorna um erro 404 caso não haja pessoas registradas
                return Results.NotFound("No people found.");
            }
            // Retornar a lista de pessoas
            return Results.Ok(people);
        });

        // Definição da rota DELETE para remover uma pessoa pelo id
        route.MapDelete("{id:int}", 
            async (int id, AppDbContext context, CancellationToken ct) =>
        {
            // Buscar a pessoa pelo id
            var person = await context.People.FirstOrDefaultAsync(x => x.Id == id, ct);
            
            // Verificar se a pessoa foi encontrada
            if (person == null) {
                // Retorna erro 404 caso a pessoa não exista
                return Results.NotFound();
            }
            try{
                // Remover a pessoa do banco de dados
                context.People.Remove(person);
                await context.SaveChangesAsync(ct);
                // Retornar person que foi removida
                return Results.Ok(person);
            }catch(Exception e){
                // Em caso de erro, retorna um erro 400 com a mensagem do erro
                return Results.BadRequest(e.Message); 
            }
            
        });
    }
}