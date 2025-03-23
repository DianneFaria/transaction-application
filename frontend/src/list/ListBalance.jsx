import './style.css';
import api from '../services/api';
import React, { useEffect, useState } from "react";

function ListBalance() {
    // Estado para armazenar os saldos recebidos da API
    const [balance, setBalance] = useState([]);

     // Função assíncrona para buscar os saldos na API
    async function findBalance() {
        try {
            const response = await api.get("/person/balance"); // Requisição para pegar saldos
            setBalance(response.data);
        } catch (error) {
            // Exibe erro no console caso falhe
            console.error("Error when searching for balance:", error);
        }
    }

    // useEffect executa a função findBalance ao carregar o componente
    useEffect(() => {
        findBalance();
    }, []); // O array vazio significa que a função será chamada uma única vez, quando o componente for montado

    return (
        <>
            <div>
                <h1 className="title-list">Lista de Saldos</h1>
                 {/* Verificando se a lista de saldos está vazia */}
                {balance.length <= 0 ? 
                    // Exibe mensagem caso não haja dados
                    <div className='empty-list'>Não há dados para exibir</div> :
                    <div>
                        <div className='scroll-tabela'>
                            {/* Tabela para exibir os dados dos saldos */}
                            <table className="table-container">
                                <thead className="top-table">
                                    <tr>
                                        {/*Cabeçalhos*/}
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Receita</th>
                                        <th>Despesa</th>
                                        <th>Saldo</th>
                                    </tr>
                                </thead>
                                <tbody className="body-table">
                                    {/* Iteração sobre balance e exibe os dados em linhas da tabela */}
                                    {balance.map((balanc) => (
                                        <tr key={balanc.id} className="line-table">
                                            <td>{balanc.id}</td>
                                            <td>{balanc.name}</td>
                                            <td>{balanc.totalReceita}</td>
                                            <td>{balanc.totalDespesa}</td>
                                            <td>{balanc.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                }
            </div>

        </>
    );
}

export default ListBalance;