import './style.css';
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

//Componente BaseLayout usado para construir sobreposição de páginas
function BaseLayout() {
  return (
    // O elemento principal da página, que pode conter o layout completo
    <main>
        {/* Componente TopLayout, que representa o cabeçalho da página */}
        <SideBar />
        <div>
            {/* Outlet renderiza o conteúdo da rota filha, ou seja, o conteúdo que varia conforme a URL */}
            <Outlet />
        </div>
    </main>
  );
};

export default BaseLayout;