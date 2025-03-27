import './style.css';
import api from '../services/api';
import React, { useEffect, useState } from "react";

function ListTransaction() {
    // Estado para armazenar as transações recebidas da API
    const [transaction, setTransaction] = useState([]);

    // Função assíncrona para buscar as transações na API
    async function findTransaction() {
        try {
            const response = await api.get("/transaction"); // Requisição para pegar transações
            setTransaction(response.data);
        } catch (error) {
            // Exibe erro no console caso falhe
            console.error("Error when searching for transactions:", error);
        }
    }

     // useEffect executa a função findTransaction ao carregar o componente
    useEffect(() => {
        findTransaction();
    }, []); // O array vazio significa que a função será chamada uma única vez, quando o componente for montado

    return (
        <>
            <div>
                <h1 className="title-list">Lista de Transações</h1>
                {/* Verificando se a lista de transações está vazia */}
                {transaction.length <= 0 ? 
                    // Exibe mensagem caso não haja dados
                    <div className='empty-list'>Não há dados para exibir</div> :
                    <div>
                        <div className='scroll-tabela'>
                            {/* Tabela para exibir os dados das transações */}
                            <table className="table-container">
                                <thead className="top-table">
                                    <tr>
                                        {/*Cabeçalhos*/}
                                        <th>ID</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Tipo</th>
                                        <th>Pessoa_ID</th>
                                    </tr>
                                </thead>
                                <tbody className="body-table">
                                    {/* Iteração sobre transaction e exibe os dados em linhas da tabela */}
                                    {transaction.map((transac) => (
                                        <tr key={transac.id} className="line-table">
                                            <td>{transac.id}</td>
                                            <td>{transac.descricao}</td>
                                            <td>{transac.valor}</td>
                                            <td>{transac.tipo}</td>
                                            <td>{transac.pessoaId}</td>
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

export default ListTransaction;