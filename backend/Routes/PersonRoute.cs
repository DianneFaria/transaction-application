using Microsoft.EntityFrameworkCore;
using Person.Models;

public static class PersonRoute{

    public static void PersonRoutes(this WebApplication app){
        
        var route = app.MapGroup("person");

        route.MapPost("",
            async (PersonRequest req, PersonContext context, CancellationToken ct) =>
            {
                var person = new PersonModel(req.name);
                await context.AddAsync(person, ct);
                await context.SaveChangesAsync(ct);
            });
        
        route.MapGet("", async (PersonContext context, CancellationToken ct) =>
        {
            var people = await context.People.ToListAsync(ct);
            return Results.Ok(people);
        });

        route.MapPut("{id:guid}",
            async (Guid id, PersonRequest req, PersonContext context, CancellationToken ct) =>
            {
                var person = await context.People.FirstOrDefaultAsync(x => x.Id == id, ct);
                
                if (person == null)
                    return Results.NotFound();
                
                person.ChangeName(req.name);
                await context.SaveChangesAsync(ct);

                return Results.Ok(person);
            });

        route.MapDelete("{id:guid}", 
            async (Guid id, PersonContext context, CancellationToken ct) =>
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