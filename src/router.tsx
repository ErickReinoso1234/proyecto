import React from "react"
import { Route, Routes } from "react-router-dom"
import AhorroApp from "./pages/ahorro/ahorros"
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal"
export const AppRouter : React.FC <{}> = ()=>{
    return (
        <Routes>
            <Route path="/" element= {<PaginaPrincipal></PaginaPrincipal>}/>
            <Route path="/ahorros" element= {<AhorroApp></AhorroApp>}/>

        </Routes>
    )

}