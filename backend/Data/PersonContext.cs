using Microsoft.EntityFrameworkCore;
using Person.Models;

public class PersonContext : DbContext{
     public DbSet<PersonModel> People { get; set; }
     public DbSet<TransactionModel> Transactions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=person.sqlite");
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TransactionModel>()
            .HasOne(t => t.Pessoa)  // Relacionamento 1:N com PersonModel
            .WithMany()  // Não há necessidade de uma propriedade de navegação na PersonModel
            .HasForeignKey(t => t.PessoaId)  // Chave estrangeira que referencia PersonModel
            .OnDelete(DeleteBehavior.Cascade);
    }
}