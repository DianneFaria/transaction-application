namespace backend.Models;
using backend.Models;

// Classe que representa uma pessoa
public class PersonModel
{
    // Construtor para inicializar uma nova pessoa
    public PersonModel(string name, int idade)
    {
        Name = name;
        Idade = idade;
    }
    
    // Propriedade que armazena o ID da pessoa
    public int Id { get; set; }
    // Propriedade que armazena o nome da pessoa (somente leitura, pois terá um método para alterar)
    public string Name { get; private set; }
    // Propriedade que armazena a idade da pessoa (somente leitura, pois terá um método para alterar)
    public int Idade { get; private set; }

    // Coleção de transações associadas à pessoa (1:N)
    public ICollection<TransactionModel>? Transactions { get; set; }
    // Método que altera o nome da pessoa
    public void ChangeName(string name){
        // Lança uma exceção se o nome for nulo ou vazio
        if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be null or empty.", nameof(name));
            }
            Name = name;
    }
    // Método que altera a idade da pessoa
    public void ChangeAge(int idade) {
        // Lança uma exceção se a idade for negativa
        if (idade < 0)
        {
            throw new ArgumentException("Age cannot be negative.", nameof(idade));
        }
        Idade = idade;
    }
}