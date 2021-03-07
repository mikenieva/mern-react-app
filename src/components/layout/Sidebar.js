import React from 'react'
import NuevoProyecto from "../proyectos/NuevoProyecto"
import ListadoProyectos from "../proyectos/ListadoProyectos"


export default function Sidebar() {
    return (
        <aside>
            <h1>MERN <span>Tasks</span></h1>

            <NuevoProyecto />

            <div className="proyectos">
                <h2>Tus PROYECTOS</h2>

                <ListadoProyectos />

            </div>
        </aside>
    )
}
