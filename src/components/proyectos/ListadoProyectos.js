import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import ProyectoContext from '../../context/proyectos/ProyectoContext'
import AlertaContext from '../../context/alertas/AlertaContext'

export default function ListadoProyectos() {

    
    // Extraer proyectos de state inicial
    const context = useContext(ProyectoContext)
    const { proyectos, obtenerProyectos } = context

    const alertaContext = useContext(AlertaContext)
    const { mensaje, alerta, mostrarAlerta } = alertaContext

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje])

    // Revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    return (
            <ul className="listado-proyectos">
                <TransitionGroup>
                    {proyectos.map(proyecto => {
                        return(
                            <CSSTransition
                                key={proyecto._id}
                                timeout={200}
                                classNames="proyecto"
                            >
                                <Proyecto
                                    proyecto={proyecto}
                                />
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </ul>
    )
}
