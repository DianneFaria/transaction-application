using Microsoft.EntityFrameworkCore;
using Person.Models;

public static class PersonRoute{

    public static void PersonRoutes(this WebApplication app){
        
        var route = app.MapGroup("person");

        route.MapPost("",
            async (PersonRequest req, PersonContext context, CancellationToken ct) =>
            {
                var person = new PersonModel(req.name, req.idade);
                await context.AddAsync(person, ct);
                await context.SaveChangesAsync(ct);
            });
        
        route.MapGet("", async (PersonContext context, CancellationToken ct) =>
        {
            var people = await context.People.ToListAsync(ct);
            return Results.Ok(people);
        });

        route.MapPut("{id:int}",
            async (int id, PersonRequest req, PersonContext context, CancellationToken ct) =>
            {
                var person = await context.People.FirstOrDefaultAsync(x => x.Id == id, ct);
                
                if (person == null)
                    return Results.NotFound();
                
                person.ChangeName(req.name);
                person.ChangeAge(req.idade);
                await context.SaveChangesAsync(ct);

                return Results.Ok(person);
            });

        route.MapDelete("{id:int}", 
            async (int id, PersonContext context, CancellationToken ct) =>
        {
            var person = await context.People.FirstOrDefaultAsync(x => x.Id == id, ct);
            
            if (person == null)
                return Results.NotFound();
            
            context.People.Remove(person);
           
            await context.SaveChangesAsync(ct);
            return Results.Ok(person);
        });
    }
}