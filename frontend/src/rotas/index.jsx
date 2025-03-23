import {Routes, Route} from "react-router-dom";
import CreatePerson from "../create/CreatePerson";
import CreateTransaction from "../create/CreateTransaction";
import ListPeople from "../list/ListPeople";
import ListBalance from "../list/ListBalance";
import ListTransaction from "../list/ListTransaction";
import BaseLayout from "../layout/BaseLayout";

// Componente AppRotas que define todas as rotas da aplicação
const AppRotas = () => {
    return (
        <Routes> {/* Componente Routes que gerencia todas as rotas */}
            <Route element={<BaseLayout />}> {/* Definindo layout base */}
                {/* Definindo as rotas específicas para cada componente */}
                <Route path="/" exact element={<CreatePerson />} />
                <Route path="/add-transaction" element={<CreateTransaction />} />
                <Route path="/list-people" exact element={<ListPeople />} />
                <Route path="/list-balance" exact element={<ListBalance />} />
                <Route path="/list-transaction" exact element={<ListTransaction />} />
            </Route>
        </Routes>
    )
}

export default AppRotas;