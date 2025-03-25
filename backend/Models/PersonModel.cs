namespace Person.Models;

public class PersonModel
{
    public PersonModel(string name, int idade)
    {
        Name = name;
        Idade = idade;
    }
    
    public int Id { get; set; }
    public string Name { get; private set; }
    public int Idade { get; private set; }

    public ICollection<TransactionModel>? Transactions { get; set; }
    public void ChangeName(string name){
        if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be null or empty.", nameof(name));
            }
            Name = name;
    }
    public void ChangeAge(int idade) {
        if (idade < 0)
        {
            throw new ArgumentException("Age cannot be negative.", nameof(idade));
        }
        Idade = idade;
    }
}