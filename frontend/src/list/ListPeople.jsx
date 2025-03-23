import './style.css';
import api from '../services/api';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ListPeople() {
    // Estado para armazenar a lista de pessoas
    const [people, setPeople] = useState([]);
    // Navegação para redirecionar para outra página
    const navigate = useNavigate();
    // Estado para controlar a exibição do dialog de confirmação
    const [openDialog, setOpenDialog] = useState(false);
    // Estado para armazenar a pessoa selecionada no dialog
    const [selectedPerson, setSelectedPerson] = useState(null);

    // Função assíncrona para buscar a lista de pessoas na API
    async function findPeople() {
        try {
            const response = await api.get("/person"); // Requisição para pegar pessoas
            setPeople(response.data);
        } catch (error) {
            // Exibindo erro caso ocorra
            console.error("Error when searching for people:", error);
        }
    }

    // Função assíncrona para deletar uma pessoa pelo ID
    async function deletePerson(id) {
        try {
            const response = await api.delete(`/person/${id}`); //Requisição para deletar pessoa
            setPeople(response.data);
        } catch (error) {
            console.error("Error when deleting person:", error); // Exibindo erro caso ocorra
        } finally {
            findPeople(); // Recarregando a lista de pessoas após a exclusão
            setOpenDialog(false); // Fechando o dialog após a exclusão
        }
    }

    // Função para abrir o dialog e selecionar a pessoa para exclusão
    const handleOpenDialog = (person) => {
        setSelectedPerson(person); // Define a pessoa selecionada
        setOpenDialog(true); // Abre o dialog
      };

    // Função para fechar o dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Função para direcionar a pessoa selecionada ao cadastro de nova transação
    const handleAddTransaction = (id, name) => {
        navigate("/add-transaction", { state: { id, name } });
    };

    //Carregar a lista de pessoas quando o componente for montado
    useEffect(() => {
        findPeople();
    }, []); //O array vazio significa que será executado apenas uma vez, na montagem inicial

    return (
        <>
            <div>
                <h1 className="title-list">Lista de Pessoas</h1>
                {/* Verificando se a lista de pessoas está vazia */}
                {people.length <= 0 ? 
                    <div className='empty-list'>Não há dados para exibir</div> : // Exibe mensagem caso não haja dados
                    <div>
                        <div className='scroll-tabela'>
                             {/* Tabela para exibir as pessoas */}
                            <table className="table-container">
                                <thead className="top-table">
                                    <tr>
                                        {/*Cabeçalhos*/}
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Adicionar transação</th>
                                        <th>Deletar usuário</th>
                                    </tr>
                                </thead>
                                <tbody className="body-table">
                                    {/* Iteração sobre people e exibe os dados em linhas da tabela */}
                                    {people.map((person) => (
                                        <tr key={person.id} className="line-table">
                                            <td>{person.id}</td>
                                            <td>{person.name}</td>
                                            <td>{person.age}</td>
                                            {/* Botão para adicionar uma transação */}
                                            <td><button onClick={() => handleAddTransaction(person.id, 
                                                                                        person.name)}>
                                                    <PaidIcon />
                                                </button>
                                            </td>
                                            {/* Botão para abrir o dialog de exclusão */}
                                            <td><button onClick={() => handleOpenDialog(person)}>
                                                <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                }
            </div>

            {/* Dialog de confirmação de exclusão */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar ação</DialogTitle> {/* Título do diálogo */}
                <DialogContent>
                    <DialogContentText>
                        {/* Texto do conteúdo do dialog */}
                        Tem certeza que deseja DELETAR o usuário abaixo? <br /> 
                        ID: {selectedPerson?.id} <br />
                        Nome: {selectedPerson?.name} <br />
                        Idade: {selectedPerson?.age} <br />
                        Todas as transações vinculadas a ele(a) também serão deletadas.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Botões do dialog */}
                    <button className="cancel-button" onClick={handleCloseDialog}>
                        Cancelar
                    </button>
                    <button className="confirm-button" onClick={() => deletePerson(Number(selectedPerson?.id))}>
                        Confirmar
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ListPeople;