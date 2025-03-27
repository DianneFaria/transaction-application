import './style.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

 /* Componente responsável por criar uma nova pessoa.
 Este componente contém um formulário onde o usuário pode inserir
 o nome e a idade de uma pessoa, e então registrar essa pessoa
 na base de dados através de uma chamada à API.*/
function CreatePerson() {
    // State para armazenar os dados da nova pessoa
    const [newPerson, setNewPerson] = useState({
        name: "",
        age: "",
    });
    // State para armazenar mensagens de erro
    const [error, setError] = useState(""); 
    // State para armazenar mensagens de sucesso
    const [successMessage, setSuccessMessage] = useState("");
    // Instância do hook 'useNavigate' para navegação
    const navigate = useNavigate();

    //Função que navega para a página de listagem de pessoas.
    const acessList = () => {
        navigate("/list-people");
    }

    /* Função assíncrona para registrar uma nova pessoa.
    Envia os dados para a API e trata a resposta.*/
    const registerPerson = async () => {
        //Limpa as mensagens de erro e sucesso ao iniciar o cadastro
        setError("");
        setSuccessMessage("");

        try {
            //Envia os dados para o backend
            const response = await api.post("/person", {
                name: newPerson.name,
                idade: newPerson.age,
            });
            // Se a requisição for bem-sucedida, exibe a mensagem de sucesso
            setSuccessMessage("Person successfully registered!");
            // Navega para a página de listagem de pessoas após 2 segundos
            setTimeout(() => {
                navigate("/list-people");
            }, 2000);
        } catch (error) {
            // Se ocorrer um erro, exibe a mensagem de erro
            console.error("Error when registering person:", error);
            setError("Error when registering person. Please, try again.");
        }
    };

    return (
        <div className="card-container">
            <h2 className="title">Cadastro de Pessoa</h2>
            {/* Campo para o nome*/}
            <div className="label-container">
                <input 
                    value={newPerson.name} 
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} 
                    placeholder="Nome" />
            </div>
            {/* Campo para a idade */}
            <div className="label-container">
                <input 
                    value={newPerson.age} 
                    onChange={(e) => setNewPerson({ ...newPerson, age: e.target.value })} 
                    placeholder="Idade" />
            </div>
            {/* Exibição das mensagens de erro e sucesso */}
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {/* Botões para registrar a pessoa ou acessar a lista */}
            <div className='button-register'>
                <button className='button' onClick={registerPerson}>Cadastrar</button>
                <button className='button' onClick={acessList}>Acessar lista de pessoas</button>
            </div>
        </div>
    );
}

export default CreatePerson;