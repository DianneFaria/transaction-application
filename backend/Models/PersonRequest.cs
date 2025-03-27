namespace backend.Models;

// Classe que representa a requisição para criar uma pessoa
public record PersonRequest(string name, int idade);