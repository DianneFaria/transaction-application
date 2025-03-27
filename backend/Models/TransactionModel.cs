namespace backend.Models;

// Modelo que representa uma transação financeira
public class TransactionModel{

    // Construtor para criar uma nova transação
    public TransactionModel(string descricao, decimal valor, string tipo, int pessoaId){
        // Verifica se o valor da transação é maior que zero
        if (valor <= 0)
                throw new ArgumentException("Value cannot be negative.", nameof(valor));
            
        // Verifica se o tipo da transação é válido (DESPESA ou RECEITA)
        if (tipo != "DESPESA" && tipo != "RECEITA")
            throw new ArgumentException("Type must be 'DESPESA' or 'RECEITA'.", nameof(tipo));

        Descricao = descricao; // Atribui a descrição da transação
        Valor = valor; // Atribui o valor da transação
        Tipo = tipo; // Atribui o tipo da transação (DESPESA ou RECEITA)
        PessoaId = pessoaId; // Atribui o ID da pessoa associada à transação
    }

    // Propriedade que armazena o id da transação
     public int Id { get; set; }
     // Propriedade que armazena a descrição da transação
     public string Descricao { get; set; }
     // Propriedade que armazena o valor da transação
     public decimal Valor { get; set; }
     // Propriedade que armazena o tipo da transação
     public string Tipo { get; set; }
     // Propriedade que armazena o ID da pessoa associada à transação
     public int PessoaId { get; set; }

    // Propriedade de navegação que permite acessar os detalhes da pessoa associada à transação
     public PersonModel? Pessoa { get; set; }

}