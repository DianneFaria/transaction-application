namespace backend.Models;
// Classe que representa a requisição para criar uma transação
public record TransactionRequest(string descricao, decimal valor, string tipo, int pessoaId);
