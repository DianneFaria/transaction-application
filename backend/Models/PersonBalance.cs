namespace backend.Models;
// Classe que representa o saldo de uma pessoa
public class PersonBalance
{
    // Propriedade que armazena o ID da pessoa
    public int Id { get; set; }
    // Propriedade que armazena o nome da pessoa
    public string? Nome { get; set; }
    // Propriedade que armazena o total de receitas da pessoa
    public decimal TotalReceitas { get; set; }
    // Propriedade que armazena o total de despesas da pessoa
    public decimal TotalDespesas { get; set; }
    // Propriedade que armazena o saldo final da pessoa
    public decimal Saldo { get; set; }
}