import './style.css';
import { Link } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BalanceIcon from '@mui/icons-material/Balance';

//Componente SideBar, fica fixo nas telas
function SideBar() {


    return (
        // Elemento <nav> que contém o menu lateral
        <nav className="sidebar">
          {/* Parte superior do menu com o título "Menu" */}
          <div className="sidebar-top">
            <div className="sidebar-brand">Menu</div>
          </div>
            {/* Lista de links do menu */}
            <div className="sidebar-menu">
              <ul className="menu-list">
                {/* Item de menu para "Novo usuário" */}
                <li>
                  <Link to="/" className="menu-link">
                    {/* Ícone do item */}
                    <span className="menu-link-icon">
                      <PersonAddIcon size={17} />
                    </span>
                    {/* Texto do item de menu */}
                    <span className="menu-link-text">Novo usuário</span>
                  </Link>
                </li>
    
                {/* Item de menu para "Lista de pessoas" */}
                <li>
                  <Link to="/list-people" className="menu-link">
                  {/* Ícone do item */}
                    <span className="menu-link-icon">
                      <RecentActorsIcon size={18} />
                    </span>
                    <span className="menu-link-text">Lista de pessoas</span>
                  </Link>
                </li>
    
                {/* Item de menu para "Lista de transações" */}
                <li>
                  <Link to="/list-transaction" className="menu-link">
                    {/* Ícone do item */}
                    <span className="menu-link-icon">
                      <ReceiptLongIcon size={18} />
                    </span>
                    <span className="menu-link-text">Lista de transações</span>
                  </Link>
                </li>
    
                {/* Item de menu para "Lista de saldos" */}
                <li>
                  <Link to="/list-balance" className="menu-link">
                    {/* Ícone do item */}
                    <span className="menu-link-icon">
                      <BalanceIcon size={18} />
                    </span>
                    <span className="menu-link-text">Lista de saldos</span>
                  </Link>
                </li>
              </ul>
            </div>
        </nav>
      );
}

export default SideBar;