using Person.Models;

public class TransactionModel{

    public TransactionModel(string descricao, decimal valor, string tipo, int pessoaId){
        if (valor <= 0)
                throw new ArgumentException("Value cannot be negative.", nameof(valor));
            
            if (tipo != "DESPESA" && tipo != "RECEITA")
                throw new ArgumentException("Type must be 'DESPESA' or 'RECEITA'.", nameof(tipo));

            Descricao = descricao;
            Valor = valor;
            Tipo = tipo;
            PessoaId = pessoaId;
    }

     public int Id { get; set; }
     public string Descricao { get; set; }
     public decimal Valor { get; set; }
     public string Tipo { get; set; }
     public int PessoaId { get; set; }

     public PersonModel? Pessoa { get; set; }

}