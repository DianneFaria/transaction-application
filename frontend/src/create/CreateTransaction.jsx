import './style.css';
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';


 /* Componente responsável por cadastrar uma transação financeira. 
 Este componente permite ao usuário cadastrar uma transação (com descrição, valor e tipo) 
 associada a uma pessoa já existente no sistema.*/
function CreateTransaction() {
    // Estado para armazenar os dados da nova transação
    const [newTransaction, setNewTransaction] = useState({
        description: "",
        value: "",
        type: "",
    });
    // Estado para armazenar mensagens de erro
    const [error, setError] = useState(""); 
    // Estado para armazenar mensagens de sucesso
    const [successMessage, setSuccessMessage] = useState("");
    // Instância do hook 'useNavigate' para navegação
    const navigate = useNavigate();
    // Instância do hook 'useLocation' para acessar o estado da rota atual
    const location = useLocation();
    // Recuperação do ID e nome da pessoa da rota (passados pela página anterior)
    const { id, name } = location.state || {};

    //Função que navega para a página de listagem de pessoas.
    const acessList = () => {
        navigate("/list-people");
    }

    /*Função assíncrona para registrar uma nova transação.
     Envia os dados para o backend e trata a resposta.*/
    const registerTransaction = async () => {
        // Limpa as mensagens de erro e sucesso ao iniciar o cadastro
        setError("");
        setSuccessMessage("");

        // Converte o valor para número (removendo qualquer caracter não numérico)
        const numericValue = parseFloat(newTransaction.value.replace(/\D/g, "")) / 100;

        try {
            // Envia os dados para o backend
            const response = await api.post("/transaction", {
                description: newTransaction.description,
                value: numericValue,
                type: newTransaction.type,
                personId: id,
            });
            // Se a requisição for bem-sucedida, exibe a mensagem de sucesso
            setSuccessMessage("Transaction successfully registered!");
            // Navega para a página de listagem de transações após 2 segundos
            setTimeout(() => {
                navigate("/list-transaction");
            }, 2000);
        } catch (error) {
            // Se ocorrer um erro, exibe a mensagem de erro
            console.error("Error when registering transaction:", error);
            setError("Error when registering transaction. Please, try again.");
        }
    };

    //Aplicação de formatação de valor digitado para formato moeda
    const valueMask = (e) => {
        // Remove caracteres não numéricos
        const valueWithoutForm = e.target.value.replace(/\D/g, "");
        // Formata o valor como moeda (BRL)
        const valueFormated = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valueWithoutForm / 100);
        // Atualiza o estado com o valor formatado
        setNewTransaction({ ...newTransaction, value: valueFormated});
    };

    return (
        <div className="card-container">
            <h2 className="title">Cadastro de Transação</h2>
            {/* Exibe mensagem informando que o usuário precisa selecionar uma pessoa se não houver ID na rota */}
            {location.state === null ? 
                <h3 className="sub-title">Volte para a lista de pessoas e selecione um usuário para fazer 
                uma transação.</h3> : 
                <h3 className="sub-title">Você irá cadastrar uma transação para: <br />
                ID: {id} <br />
                Nome: {name} <br /></h3>}
             {/* Campo de descrição da transação */}
            <div className="label-container">
                <input 
                    value={newTransaction.description} 
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })} 
                    placeholder="Descrição" />
            </div>
            {/* Campo de valor da transação com máscara de moeda */}
            <div className="label-container">
                <input
                    value={newTransaction.value}
                    onChange={valueMask}
                    placeholder="Valor"
                />
            </div>
            {/* Campo de tipo da transação (Receita ou Despesa) */}
            <div className="label-container">
                <select
                    className="dropdown"
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                >
                    <option value={""}>Tipo</option>
                    <option value={"RECEITA"}>Receita</option>
                    <option value={"DESPESA"}>Despesa</option>
                </select>
            </div>
            {/* Exibição das mensagens de erro e sucesso */}
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
             {/* Botões para cadastrar a transação ou acessar a lista de pessoas */}
            <div className='button-register'>
            <button className='button' onClick={registerTransaction}>
                Cadastrar
            </button>
                <button className='button' onClick={acessList}>Acessar lista de pessoas</button>
            </div>
           
        </div>
    );
}

export default CreateTransaction;