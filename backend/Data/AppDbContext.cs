using backend.Models;
using Microsoft.EntityFrameworkCore;

// Classe que representa o contexto do banco de dados
public class AppDbContext : DbContext{
    // DbSet que representa a tabela 'People' no banco de dados
     public DbSet<PersonModel> People { get; set; }
     // DbSet que representa a tabela 'Transactions' no banco de dados
     public DbSet<TransactionModel> Transactions { get; set; }

    // Método para configurar as opções do banco de dados
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Configura o banco de dados para usar SQLite com o arquivo 'person.sqlite'
        optionsBuilder.UseSqlite("Data Source=person.sqlite");
         // Método base para garantir o funcionamento do DbContext
        base.OnConfiguring(optionsBuilder);
    }

    // Método para configurar o modelo de dados
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configura o relacionamento entre a tabela 'Transactions' e a tabela 'People'
        modelBuilder.Entity<TransactionModel>()
            .HasOne(t => t.Pessoa)  // Relacionamento 1:N com PersonModel
            .WithMany()  // Não há necessidade de uma propriedade de navegação na PersonModel
            .HasForeignKey(t => t.PessoaId)  // Chave estrangeira que referencia PersonModel
            .OnDelete(DeleteBehavior.Cascade); // Configura para excluir todas as transações associadas quando uma pessoa for deletada
    }
}